(() => {
  const DEFAULT_CONFIG = {
    forms: {
      en: {
        portalId: 'YOUR_HUBSPOT_PORTAL_ID',
        formId: 'YOUR_ENGLISH_FORM_ID'
      },
      zh: {
        portalId: 'YOUR_HUBSPOT_PORTAL_ID',
        formId: 'YOUR_CHINESE_FORM_ID'
      }
    },
    fieldNames: {
      email: 'email',
      firstName: 'firstname',
      lastName: 'lastname',
      company: 'company',
      jobTitle: 'jobtitle',
      country: 'country',
      language: 'newsletter_language',
      source: 'newsletter_source'
    },
    sourceValue: 'shorevest_website',
    hutkCookieName: 'hubspotutk',
    legalConsentSubscriptionTypeId: '',
    redirectUrl: ''
  };

  const config = window.SVPHubSpotSignupConfig || DEFAULT_CONFIG;

  function getCookie(name) {
    const safe = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = document.cookie.match(new RegExp(`(?:^|; )${safe}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : '';
  }

  function getFormConfig(language) {
    return config.forms?.[language] || config.forms?.en || null;
  }

  function setStatus(form, message, type) {
    const status = form.querySelector('[data-signup-status]');
    if (!status) return;
    status.hidden = false;
    status.textContent = message;
    status.dataset.state = type;
  }

  function clearStatus(form) {
    const status = form.querySelector('[data-signup-status]');
    if (!status) return;
    status.hidden = true;
    status.textContent = '';
    status.dataset.state = '';
  }

  function setSubmitting(form, submitting) {
    const submit = form.querySelector('[data-signup-submit]');
    if (!submit) return;
    submit.disabled = submitting;
    submit.setAttribute('aria-busy', String(submitting));
    form.classList.toggle('is-submitting', submitting);
  }

  function buildPayload(form, language) {
    const fieldNames = config.fieldNames || DEFAULT_CONFIG.fieldNames;
    const email = form.querySelector('[name="email"]')?.value.trim() || '';
    const firstName = form.querySelector('[name="firstName"]')?.value.trim() || '';
    const lastName = form.querySelector('[name="lastName"]')?.value.trim() || '';
    const company = form.querySelector('[name="company"]')?.value.trim() || '';
    const jobTitle = form.querySelector('[name="jobTitle"]')?.value.trim() || '';
    const country = form.querySelector('[name="country"]')?.value.trim() || '';
    const pageTitle = document.title;
    const pageUri = window.location.href;

    const fields = [
      { name: fieldNames.email, value: email },
      { name: fieldNames.firstName, value: firstName },
      { name: fieldNames.lastName, value: lastName },
      { name: fieldNames.company, value: company },
      { name: fieldNames.jobTitle, value: jobTitle },
      { name: fieldNames.country, value: country },
      { name: fieldNames.language, value: language },
      { name: fieldNames.source, value: config.sourceValue || DEFAULT_CONFIG.sourceValue }
    ].filter((field) => field.name && field.value);

    const payload = {
      submittedAt: Date.now(),
      fields,
      context: {
        hutk: getCookie(config.hutkCookieName || DEFAULT_CONFIG.hutkCookieName),
        pageUri,
        pageName: pageTitle
      }
    };

    if (config.legalConsentSubscriptionTypeId) {
      payload.legalConsentOptions = {
        consent: {
          consentToProcess: true,
          text: form.dataset.consentText || '',
          communications: [
            {
              value: true,
              subscriptionTypeId: Number(config.legalConsentSubscriptionTypeId),
              text: form.dataset.consentText || ''
            }
          ]
        }
      };
    }

    return payload;
  }

  async function submitToHubSpot(form) {
    const language = form.dataset.signupLanguage || 'en';
    const messages = JSON.parse(form.dataset.messages || '{}');
    const formConfig = getFormConfig(language);

    if (!formConfig?.portalId || !formConfig?.formId || String(formConfig.portalId).includes('YOUR_') || String(formConfig.formId).includes('YOUR_')) {
      throw new Error(messages.notConfigured || 'HubSpot signup is not configured yet.');
    }

    const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${formConfig.portalId}/${formConfig.formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(buildPayload(form, language))
    });

    if (!response.ok) {
      let detail = '';
      try {
        const data = await response.json();
        detail = data?.message || data?.errors?.[0]?.message || '';
      } catch (error) {
        detail = '';
      }
      throw new Error(detail || messages.error || 'Unable to submit the form right now.');
    }

    return response.json().catch(() => ({}));
  }

  document.querySelectorAll('[data-newsletter-signup]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      clearStatus(form);

      if (!form.reportValidity()) return;

      const messages = JSON.parse(form.dataset.messages || '{}');
      setSubmitting(form, true);

      try {
        await submitToHubSpot(form);
        form.reset();
        setStatus(form, messages.success || 'Thanks for subscribing.', 'success');

        if (config.redirectUrl) {
          window.location.assign(config.redirectUrl);
        }
      } catch (error) {
        setStatus(form, error.message || messages.error || 'Unable to submit the form right now.', 'error');
      } finally {
        setSubmitting(form, false);
      }
    });
  });
})();
