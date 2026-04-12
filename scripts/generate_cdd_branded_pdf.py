#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import pathlib
import textwrap
from dataclasses import dataclass


def esc(s: str) -> str:
    return s.replace('\\', r'\\').replace('(', r'\(').replace(')', r'\)')


@dataclass
class TextLine:
    text: str
    font: str = "F1"
    size: int = 11
    leading: int = 15
    color: tuple[float, float, float] = (0.16, 0.20, 0.18)
    top_margin: int = 0
    indent: int = 0


class PdfDoc:
    def __init__(self, title: str):
        self.title = title
        self.objects: list[bytes] = []

    def add_obj(self, data: bytes) -> int:
        self.objects.append(data)
        return len(self.objects)

    def render(self, page_streams: list[bytes]) -> bytes:
        font_regular = self.add_obj(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
        font_bold = self.add_obj(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")

        page_ids: list[int] = []
        for stream in page_streams:
            content = self.add_obj(
                b"<< /Length " + str(len(stream)).encode("ascii") + b" >>\nstream\n" + stream + b"\nendstream"
            )
            page = self.add_obj(
                b"<< /Type /Page /Parent PAGES_OBJ 0 R /MediaBox [0 0 595 842] "
                b"/Resources << /Font << /F1 " + str(font_regular).encode("ascii") + b" 0 R /F2 "
                + str(font_bold).encode("ascii")
                + b" 0 R >> >> /Contents "
                + str(content).encode("ascii")
                + b" 0 R >>"
            )
            page_ids.append(page)

        kids = "[" + " ".join(f"{p} 0 R" for p in page_ids) + "]"
        pages = self.add_obj(f"<< /Type /Pages /Kids {kids} /Count {len(page_ids)} >>".encode("ascii"))
        for pid in page_ids:
            self.objects[pid - 1] = self.objects[pid - 1].replace(b"PAGES_OBJ", str(pages).encode("ascii"))

        catalog = self.add_obj(f"<< /Type /Catalog /Pages {pages} 0 R >>".encode("ascii"))
        info = self.add_obj(
            f"<< /Title ({esc(self.title)}) /Producer (shorevest-cdd-generator) >>".encode("utf-8")
        )

        out = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
        offsets = [0]
        for i, obj in enumerate(self.objects, 1):
            offsets.append(len(out))
            out.extend(f"{i} 0 obj\n".encode("ascii"))
            out.extend(obj)
            out.extend(b"\nendobj\n")
        xref = len(out)
        out.extend(f"xref\n0 {len(self.objects)+1}\n".encode("ascii"))
        out.extend(b"0000000000 65535 f \n")
        for off in offsets[1:]:
            out.extend(f"{off:010d} 00000 n \n".encode("ascii"))
        out.extend(
            (
                "trailer\n"
                f"<< /Size {len(self.objects)+1} /Root {catalog} 0 R /Info {info} 0 R >>\n"
                "startxref\n"
                f"{xref}\n"
                "%%EOF\n"
            ).encode("ascii")
        )
        return bytes(out)


def wrap_paragraph(text: str, width: int) -> list[str]:
    return textwrap.wrap(text, width=width, break_long_words=False, break_on_hyphens=False) or [""]


def build_lines(data: dict) -> list[TextLine]:
    lines: list[TextLine] = []

    lines.append(TextLine("SHOREVEST INSIGHTS PUBLICATION", font="F2", size=9, leading=12, color=(0.39, 0.45, 0.41)))
    lines.append(TextLine("China Debt Dynamics", font="F2", size=14, leading=18, color=(0.11, 0.16, 0.14), top_margin=2))

    meta = f"{data['series']}  |  {data['volumeIssue']}  |  Published {data['published']}  |  {data['edition']}"
    for ln in wrap_paragraph(meta, 88):
        lines.append(TextLine(ln, size=9, leading=12, color=(0.39, 0.45, 0.41), top_margin=2))

    for ln in wrap_paragraph(data["title"], 56):
        lines.append(TextLine(ln, font="F2", size=23, leading=27, color=(0.08, 0.13, 0.11), top_margin=6))

    for ln in wrap_paragraph(data["dek"], 82):
        lines.append(TextLine(ln, size=12, leading=16, color=(0.24, 0.29, 0.26), top_margin=2))

    lines.append(TextLine("KEY FINDINGS", font="F2", size=10, leading=14, color=(0.39, 0.45, 0.41), top_margin=7))
    for finding in data.get("keyFindings", []):
        for idx, ln in enumerate(wrap_paragraph(f"• {finding}" if finding else "", 88)):
            lines.append(TextLine(ln, size=10, leading=14, color=(0.16, 0.20, 0.18), top_margin=1 if idx == 0 else 0))

    for section in data.get("sections", []):
        heading = section.get("heading")
        if heading:
            lines.append(TextLine(heading.upper(), font="F2", size=11, leading=15, color=(0.52, 0.12, 0.07), top_margin=8))

        for paragraph in section.get("paragraphs", []):
            for idx, ln in enumerate(wrap_paragraph(paragraph, 92)):
                lines.append(TextLine(ln, size=10, leading=15, top_margin=2 if idx == 0 else 0))

        for bullet in section.get("bullets", []):
            for idx, ln in enumerate(wrap_paragraph(f"• {bullet}", 90)):
                lines.append(TextLine(ln, size=10, leading=15, indent=8 if idx > 0 else 0))

    lines.append(TextLine("LEGAL INFORMATION AND DISCLOSURES", font="F2", size=10, leading=14, color=(0.39, 0.45, 0.41), top_margin=10))
    for ln in wrap_paragraph(data.get("disclaimer", ""), 98):
        lines.append(TextLine(ln, size=8, leading=11, color=(0.35, 0.39, 0.37), top_margin=1))
    for ln in wrap_paragraph(f"Our contact details: {data.get('contact', '')}", 98):
        lines.append(TextLine(ln, size=8, leading=11, color=(0.35, 0.39, 0.37), top_margin=1))
    for ln in wrap_paragraph(data.get("copyright", ""), 98):
        lines.append(TextLine(ln, size=8, leading=11, color=(0.35, 0.39, 0.37), top_margin=1))

    return lines


def lines_to_pages(lines: list[TextLine]) -> list[bytes]:
    pages: list[bytes] = []
    y_start = 792
    y_min = 56
    x_start = 44

    cmds: list[str] = [
        "q",
        "0.96 0.95 0.92 rg",
        "0 804 595 38 re",
        "f",
        "Q",
    ]
    y = y_start

    def flush_page() -> None:
        nonlocal cmds, y
        cmds.append("q")
        cmds.append("0.80 0.83 0.80 RG")
        cmds.append("44 44 m 551 44 l S")
        cmds.append("Q")
        pages.append("\n".join(cmds).encode("utf-8"))
        cmds = [
            "q",
            "0.96 0.95 0.92 rg",
            "0 804 595 38 re",
            "f",
            "Q",
        ]
        y = y_start

    for line in lines:
        y -= line.top_margin
        if y - line.leading < y_min:
            flush_page()
        r, g, b = line.color
        cmds.extend([
            "BT",
            f"/{line.font} {line.size} Tf",
            f"{r:.3f} {g:.3f} {b:.3f} rg",
            f"1 0 0 1 {x_start + line.indent} {y} Tm",
            f"({esc(line.text)}) Tj",
            "ET",
        ])
        y -= line.leading

    flush_page()
    return pages


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate a ShoreVest-branded CDD PDF from article JSON.")
    parser.add_argument("input_json", type=pathlib.Path)
    parser.add_argument("output_pdf", type=pathlib.Path)
    args = parser.parse_args()

    data = json.loads(args.input_json.read_text(encoding="utf-8"))
    lines = build_lines(data)
    pages = lines_to_pages(lines)
    pdf = PdfDoc(title=data.get("title", "China Debt Dynamics")).render(pages)

    args.output_pdf.parent.mkdir(parents=True, exist_ok=True)
    args.output_pdf.write_bytes(pdf)
    print(f"Generated {args.output_pdf}")


if __name__ == "__main__":
    main()
