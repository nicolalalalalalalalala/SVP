# ShoreVest Website Red-Team Legal and Compliance Hardening Plan

Prepared for: ShoreVest (China-focused private credit manager)
Date: 2026-04-08

## Scope and posture
This plan assumes ShoreVest operates a live public website and seeks to reduce legal, regulatory, privacy, securities-law, confidentiality, reputational, and disclosure risk while preserving institutional positioning. It is a risk-hardening plan, not a full legal opinion. Counsel confirmation is required before implementation of jurisdiction-specific language and gating thresholds.

## 1) Top-line risk diagnosis
Highest-risk residual issues typically present on private fund websites:

1. General solicitation drift caused by performance and fundraising-adjacent copy on public pages.
2. Public-offer appearance from investor-access CTAs and broad invitation-style wording.
3. Performance presentation risk from absolute claims, selected metrics, and target return references without sufficient context.
4. Overstatement risk from certainty language (e.g., “predictable,” “best,” “zero losses”).
5. Confidentiality leakage from unrestricted PDFs, indexable archive files, and public links to investor-grade content.
6. Privacy and consent risk from collection forms lacking explicit purpose, legal basis, retention, and consent logs.
7. Investor portal control risk where self-attestation is one-click and not logged robustly.
8. Jurisdiction risk where language and routing do not enforce country-based restrictions or denial flows.
9. Translation drift risk when Chinese and English legal notices differ in substance or strength.
10. Team and track-record substantiation risk where claims are broad, comparative, or unsupported by auditable records.

## 2) Page-by-page legal audit template
For each page, apply this control stack: **risk** / **remove** / **rewrite** / **notice** / **public-gated-remove decision**.

### Homepage
- Risk: Offer-like tone, absolute outcomes, and headline track-record metrics can imply broad solicitation.
- Remove: Absolute statements unless tightly substantiated and dated.
- Rewrite: Keep institutional identity and strategy description; move performance-heavy references behind gating.
- Notice: Persistent short-form “informational only / no offer / past performance” legend above fold and in footer.
- Classification: Public allowed, but quantitative claims should be narrowed and date-stamped.

### Firm
- Risk: Platform scale/track-record claims may read as promotional if not contextualized.
- Remove: Unqualified superiority statements and any unsupported market-position claims.
- Rewrite: Emphasize process, governance, risk controls, and team continuity over outcomes.
- Notice: “No reliance” + “selected data” + “no duty to update.”
- Classification: Public, with metric discipline.

### Strategy
- Risk: Return targets and performance framing elevate securities-law scrutiny.
- Remove: Public target return ranges unless counsel approves exact presentation format.
- Rewrite: Public page should describe mandate, instrument types, risk controls; move returns, case-level economics, and realized/unrealized detail behind gating.
- Notice: Dedicated performance legend adjacent to any quantitative statement.
- Classification: Split: qualitative public; quantitative gated.

### Team
- Risk: “Most authoritative,” awards, or media praise can become unsupported comparative advertising.
- Remove: Hyperbolic superlatives unless independently verifiable and current.
- Rewrite: Fact-only biographies (roles, years, credentials, prior employers).
- Notice: “Biographical information for background only; not an endorsement.”
- Classification: Public, with substantiation file maintained internally.

### Insights
- Risk: Commentary can be interpreted as investment recommendation, especially where returns or tactical calls appear.
- Remove: Transaction-level economics, implied recommendations, or predictive certainty.
- Rewrite: Use neutral research tone; include publication date, market-volatility warning, and stale-information warning.
- Notice: Article-level commentary disclaimer + download disclaimer.
- Classification: Public for high-level research; sensitive editions gated.

### Press
- Risk: Republishing third-party statements can imply endorsement; stale press can mislead.
- Remove: Undated or unattributed snippets; performance claims without source context.
- Rewrite: Distinguish “ShoreVest statements” from third-party coverage.
- Notice: “Third-party content not independently verified and not adopted as ShoreVest views.”
- Classification: Public.

### Investor Access
- Risk: One-click attestation is weak for qualification, jurisdiction, and confidentiality controls.
- Remove: Any language resembling invitation to invest.
- Rewrite: Multi-step eligibility and jurisdiction attestations, pending-review status, denial pathways.
- Notice: Investor Access Terms + Restricted Materials Notice + Privacy acknowledgment.
- Classification: Gated; sensitive content never public.

### Contact
- Risk: Excess data capture, no clear legal basis, weak consent records.
- Remove: Open text prompts requesting non-public investment details.
- Rewrite: Minimal fields, explicit purpose labels, expected response timeline.
- Notice: Inline contact-form privacy notice and explicit consent checkbox.
- Classification: Public with strict controls.

### Footer
- Risk: Overlong legal block reused inconsistently, translation mismatch.
- Remove: Duplicative legal text walls on every page.
- Rewrite: Concise short-form legal line + links to full legal pages.
- Notice: Last-reviewed date and legal-language precedence statement.
- Classification: Public global component.

### Download pages / PDF links
- Risk: Direct file URLs are shareable and indexable; no user acknowledgment.
- Remove: Public links to investor-grade PDF materials.
- Rewrite: Route sensitive files through gated download controller.
- Notice: Download disclaimer banner + watermarking for restricted files.
- Classification: Public thought leadership only; investor docs gated/private.

### Hidden / utility / modal pages
- Risk: Legacy pages bypass controls and expose stale disclosures.
- Remove: Orphaned pages and deprecated legal versions.
- Rewrite: Centralized legal components.
- Notice: N/A
- Classification: Remove or redirect.

## 3) Exact legal pages required
Required minimum pages:
1. Privacy Policy
2. Terms of Use
3. Important Disclosures / Legal Notice
4. Cookie Notice
5. Investor Access Terms
6. Contact Form Privacy Notice
7. Restricted Materials Disclaimer
8. Jurisdiction Notice
9. Copyright / Intellectual Property Notice

Optional (only if supportable):
- Accessibility Statement
- Data Processing Addendum summary page
- Modern Slavery Statement
- ESG Statement (only with documented methodology)

## 4) Exact footer structure
Recommended footer links (institutional, restrained):
- Privacy Policy
- Terms of Use
- Important Disclosures
- Cookie Notice
- Jurisdiction Notice
- Investor Access Terms
- Contact

Secondary line:
- Copyright © ShoreVest Partners, Ltd.
- “Last reviewed: [Month DD, YYYY]”
- “English legal text prevails in case of inconsistency” (if counsel confirms)

## 5) Public vs gated content framework
### Public website (open)
Allowed:
- Firm overview, strategy taxonomy, process description, governance structure, team bios (factual), selected public insights.
Prohibited:
- Detailed performance tables, fund terms, portfolio concentration, investor letters, DDQ, audited financials.

### Gated investor access (credentialed and logged)
Allowed:
- Qualified-investor materials: detailed track record, fund terms, high-level portfolio commentary, investor updates.
Required controls:
- Eligibility workflow, jurisdiction screening, confidentiality assent, no-offer assent, consent logging.

### True private data room (strictly private)
Allowed:
- PPM/LPA/subscription docs, audited financials, position-level details, legal docs, side-letter materials.
Controls:
- Named-user credentials, MFA, download controls, watermarking, full audit logs, revocable access.

## 6) Performance / track record / deal example policy
1. Public pages:
   - Avoid gross/net return percentages, IRR, MOIC, DPI/TVPI, hit-rates, and pipeline economics unless counsel-cleared and fully contextualized.
   - If any metric is shown, include clear date stamp, scope, and “selected/illustrative” qualifier.
2. Gated materials only:
   - Full performance tables, methodology, realized vs unrealized splits, fee assumptions.
3. Remove entirely:
   - “No loss,” “consistent returns,” “predictable exits,” “market-leading returns,” unless extremely constrained and evidentiary support is archived.
4. Required legends whenever performance appears:
   - Past performance; no assurance; hypothetical/target nature; realized/unrealized distinctions; investor-level variation.
5. Unrealized values:
   - Label as estimates; describe valuation policy; caution that realizations may differ materially.
6. Pipeline references:
   - Present only as non-binding indications; no expectation language.
7. Case studies:
   - Use anonymization where necessary, include selection criteria, and avoid cherry-picked outcome presentation without balance.

## 7) Website phrases that create avoidable legal or reputational risk
### “Guaranteed / predictable returns”
- Risk: Implies assurance and invites mis-selling claims.
- Safer: “Targeted outcomes are subject to material uncertainty; losses can occur.”

### “No losses” (absolute)
- Risk: Could be misleading without strict scope and auditability.
- Safer: “Historically, selected realized transactions have not resulted in principal loss (scope/date defined).”

### “Market leader / best-in-class / most authoritative”
- Risk: Comparative claim may be unsubstantiated.
- Safer: “Specialist manager focused on [defined segment].”

### “Legal certainty / enforceability assured”
- Risk: Overstates litigation and enforcement outcomes.
- Safer: “Outcomes depend on legal process, counterparties, and court execution.”

### “Partner with us” / open-investment callouts
- Risk: Solicitation tone for a private fund.
- Safer: “Eligible institutional investors may request information through investor relations.”

### “Regulator approved” / implied endorsement
- Risk: False implication of government endorsement.
- Safer: “No regulatory authority has approved or endorsed this website content.”

## 8) Exact disclaimer drafting (website-ready)
### Important Disclosures (short form)
“This website is for general informational purposes only. It does not constitute an offer to sell, a solicitation of an offer to buy, or a recommendation regarding any security, fund, or investment strategy. Any offer may be made only through definitive offering documents and only to eligible investors in jurisdictions where permitted by law.”

### Terms of Use (core clause)
“By using this website, you agree not to rely on its content as investment, legal, tax, accounting, or regulatory advice. Content may be incomplete, summary, and subject to change without notice.”

### Privacy Policy (core clause)
“We collect only information reasonably necessary to operate the website, respond to inquiries, and administer investor-access workflows, and we process personal data in accordance with applicable law and this policy.”

### Cookie Notice (core clause)
“We use strictly necessary cookies for site operation and, where enabled, analytics cookies subject to your preferences and applicable consent requirements.”

### Investor Access Terms (core clause)
“Access is restricted to persons who self-certify and, where required, verify that they are eligible institutional/professional investors under applicable law. ShoreVest may deny, suspend, or revoke access at any time.”

### Restricted Materials Notice
“Materials in this section are confidential, provided solely for the recipient’s internal evaluation, and may not be copied, forwarded, quoted, or distributed without ShoreVest’s prior written consent.”

### Contact Form Consent Language
“By submitting this form, you consent to ShoreVest processing your information to respond to your request and to maintain related records. Do not submit confidential investment information through this form.”

### Download Disclaimer
“This document is provided for informational purposes only, is subject to change, and does not constitute investment advice or an offer/solicitation. Redistribution is prohibited without permission.”

### Insights / Commentary Disclaimer
“Commentary reflects views as of the publication date only, may change without notice, and is not investment advice or a recommendation to transact.”

## 9) Investor access hardening flow
1. **Landing page**: “Restricted Investor Materials — eligibility required.”
2. **Acknowledgements (mandatory checkboxes)**:
   - Jurisdiction confirmation
   - Professional/institutional investor self-certification
   - Confidentiality acknowledgment
   - No-offer acknowledgment
   - Privacy acknowledgment
3. **Request review**:
   - Submission enters pending review; no immediate material release.
4. **Decision states**:
   - Approved: time-limited secure link / credential issuance.
   - Pending: neutral holding message.
   - Denied: no-detail decline notice + general-contact route.
5. **Logging**:
   - Timestamp, IP, country, attestations, version of legal text accepted.

## 10) Privacy / cookies / forms / data collection requirements
- Contact forms: minimal fields (name, work email, institution, jurisdiction, purpose).
- Newsletter: separate optional consent from mandatory processing notice.
- Investor inquiry forms: include eligibility + confidentiality warnings.
- Cookies: category-based banner with reject/accept/manage options.
- Download requests: require purpose selection and logging for restricted files.
- Bilingual data handling: same processing purpose and rights notices in both languages.
- Retention: documented retention schedule by form type.
- Consent logging: store policy version, checkbox states, timestamp, source URL.

## 11) Bilingual consistency control (EN/ZH)
1. English legal master text owned by legal/compliance.
2. Chinese legal translation produced by qualified legal linguist.
3. Clause-level mapping table (EN clause ID ↔ ZH clause ID).
4. Dual legal sign-off before publication.
5. CMS blocks legal publishing unless both languages updated.
6. Quarterly parity review with diff report.

## 12) Developer implementation notes
- Global footer: single include/component, not per-page hardcoded copies.
- Disclaimer components: reusable short-form + page-specific expandable modules.
- Modals/banners: cookie banner and investor-gate attestations versioned and logged.
- Checkbox logging: record value + legal text hash + timestamp + IP/user agent.
- Date-stamping: every legal page shows effective date and last reviewed date.
- PDF watermarking: user email, timestamp, “confidential” for restricted docs.
- noindex rules: gated and utility paths disallowed from indexing.
- CMS governance: role-based publish approvals for legal text and performance claims.
- Restricted file routing: signed URLs, expiry, referrer checks, download throttling.
- Access logs: immutable audit logs for gated and private materials.
- Rapid legal updates: legal text stored in centralized config/content model.

## 13) Final red-team launch checklist
- [ ] Every quantitative claim has source evidence and owner sign-off.
- [ ] No page reads as a public securities offer.
- [ ] Performance language is appropriately gated and fully qualified.
- [ ] Jurisdiction and eligibility controls operate before restricted access.
- [ ] Privacy notice, cookie controls, and form consent logging are live.
- [ ] English and Chinese legal notices are materially aligned.
- [ ] Download links enforce public/gated/private boundaries.
- [ ] Team biographies and accolades are fact-checked and supportable.
- [ ] CMS permissions prevent unauthorized legal/performance edits.
- [ ] Counsel-confirmation items documented and resolved.

## Required closing matrix

| Issue | Risk level | Recommended fix | Public / Gated / Remove |
|---|---|---|---|
| Absolute performance claims on homepage | High | Narrow wording, define scope/date, move detailed figures behind gate | Public (narrowed) + Gated detail |
| Public target returns on strategy page | High | Remove from public page; present only in qualified materials with full methodology | Gated |
| One-click investor self-attestation | High | Multi-step certification + review workflow + logging | Gated |
| Public links to sensitive PDFs | High | Route via signed gated downloads; watermark restricted files | Gated / Remove direct links |
| Inconsistent legal text across EN/ZH | High | Clause-mapped bilingual governance and dual legal approval | Public (controlled) |
| Superlative/team marketing language | Medium | Replace with factual, supportable credentials only | Public (rewritten) |
| Newsletter/contact consent ambiguity | Medium | Add explicit purpose notice + separate marketing consent + retention terms | Public (rewritten) |
| Repetitive hardcoded legal blocks | Medium | Centralize legal components and version-control updates | Public (componentized) |
| Stale insights that may imply current views | Medium | Add publication-date and no-duty-to-update notices | Public |
| Orphan/legacy utility pages | Medium | Remove, redirect, or mark noindex and deprecate | Remove / noindex |
