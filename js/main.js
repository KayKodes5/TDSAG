// TDSAG site behaviour: nav, scroll effects, accordion, tabs, quick-give, forms.
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const formatRand = (n) => "R" + Number(n).toLocaleString("en-ZA");
  const params = new URLSearchParams(window.location.search);

  // Mobile navigation ------------------------------------------------------
  const navToggle = $(".nav-toggle");
  const nav = $("#site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  // Header shadow once the page scrolls -----------------------------------
  const header = $(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Reveal sections as they scroll into view ------------------------------
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // Accordion --------------------------------------------------------------
  $$(".accordion-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
    });
  });

  // Resource tabs ----------------------------------------------------------
  const tabs = $$(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
      });
    });
    tab.addEventListener("keydown", (e) => {
      const i = tabs.indexOf(tab);
      let next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (next) { next.focus(); next.click(); }
    });
  });

  // Quick give (Get Involved page) ----------------------------------------
  const quickGive = $("#quick-give-form");
  if (quickGive) {
    const chips = $$(".chip", quickGive);
    const other = $(".other-input", quickGive);
    const submit = $("button[type=submit]", quickGive);
    let amount = 250;

    const update = () => { submit.textContent = "Donate " + formatRand(amount || 0); };

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
        const isOther = chip.dataset.amount === "other";
        other.hidden = !isOther;
        if (isOther) { other.focus(); amount = Number(other.value) || 0; }
        else amount = Number(chip.dataset.amount);
        update();
      });
    });
    other.addEventListener("input", () => { amount = Number(other.value) || 0; update(); });

    quickGive.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!amount || amount < 10) { other.hidden = false; other.focus(); return; }
      window.location.href = "donate.html?amount=" + amount;
    });
  }

  // Campaign page amount picker --------------------------------------------
  const campaignGive = $("#campaign-give");
  if (campaignGive) {
    const btn = $("#campaign-give-btn");
    const sync = () => {
      const amt = $("input[name=campaign-amount]:checked", campaignGive).value;
      btn.textContent = "Give " + formatRand(amt) + " to this campaign";
      btn.href = "donate.html?amount=" + amt + "&fund=early-intervention";
    };
    campaignGive.addEventListener("change", sync);
    sync();
  }

  // Donate form ------------------------------------------------------------
  const donate = $("#donate-form");
  if (donate) {
    const otherInput = $("#other-amount");
    const otherWrap = $(".other-amount");
    const summary = $("#gift-summary-amount");
    const submit = $("#donate-submit");
    const impact = $("#impact-text");
    const taxToggle = $("#tax-cert");
    const taxFields = $("#tax-fields");
    const honourToggle = $("#in-honour");
    const honourFields = $("#honour-fields");

    // Replace these with verified programme costs before going live.
    const impactCopy = {
      100: "[verified item, e.g. a set of home-language guides for a new family]",
      250: "[verified item, e.g. one early intervention home visit]",
      500: "[verified item, e.g. a month of support group sessions]",
    };

    // Pre-fill from query string (?amount=500&fund=early-intervention&freq=monthly)
    const qAmount = Number(params.get("amount"));
    if (qAmount) {
      const preset = $(`input[name=amount][value="${qAmount}"]`, donate);
      if (preset) preset.checked = true;
      else { $("input[name=amount][value=other]", donate).checked = true; otherInput.value = qAmount; }
    }
    const qFund = params.get("fund");
    if (qFund && $(`#fund option[value="${qFund}"]`)) $("#fund").value = qFund;
    const qFreq = params.get("freq");
    if (qFreq && $(`input[name=frequency][value="${qFreq}"]`, donate)) {
      $(`input[name=frequency][value="${qFreq}"]`, donate).checked = true;
    }

    const getAmount = () => {
      const choice = $("input[name=amount]:checked", donate).value;
      return choice === "other" ? Number(otherInput.value) || 0 : Number(choice);
    };
    const isMonthly = () => $("input[name=frequency]:checked", donate).value === "monthly";

    const render = () => {
      const amt = getAmount();
      const monthly = isMonthly();
      const isOther = $("input[name=amount]:checked", donate).value === "other";
      otherWrap.hidden = !isOther;
      otherInput.required = isOther;

      summary.textContent = formatRand(amt) + (monthly ? " / month" : "");
      submit.textContent = monthly
        ? `Give ${formatRand(amt)} every month`
        : `Give ${formatRand(amt)} now`;
      impact.textContent = impactCopy[amt]
        ? `${formatRand(amt)} could help cover ${impactCopy[amt]}.`
        : "Every rand goes towards early intervention, self-advocacy and family support.";

      taxFields.hidden = !taxToggle.checked;
      $$("input", taxFields).forEach((i) => { i.required = taxToggle.checked; });
      honourFields.hidden = !honourToggle.checked;
    };

    donate.addEventListener("change", render);
    donate.addEventListener("input", render);
    render();

    donate.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!donate.reportValidity()) return;
      if (getAmount() < 10) {
        otherInput.setCustomValidity("Please enter at least R10.");
        otherInput.reportValidity();
        otherInput.setCustomValidity("");
        return;
      }
      // TODO: hand off to the payment provider (e.g. PayFast / Ozow / SnapScan) here.
      const dialog = $("#thanks");
      $("#thanks-amount").textContent = summary.textContent;
      if (dialog && dialog.showModal) dialog.showModal();
    });
  }

  // Pre-select form options from the URL (?programme=self-advocacy, ?subject=partnership)
  $$("select[data-param]").forEach((select) => {
    const value = params.get(select.dataset.param);
    if (value && $(`option[value="${value}"]`, select)) select.value = value;
  });

  // Enquiry forms (programmes, volunteer, contact) -------------------------
  $$(".js-enquiry-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = $(".form-message", form);
      if (!form.reportValidity()) return;
      // TODO: send the form to the TDSAG inbox (e.g. Formspree, Netlify Forms or a small API).
      msg.textContent = form.dataset.success || "Thank you! We'll be in touch soon.";
      form.reset();
    });
  });

  // Newsletter -------------------------------------------------------------
  const newsletter = $("#newsletter-form");
  if (newsletter) {
    newsletter.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = $(".form-message", newsletter);
      if (!newsletter.reportValidity()) return;
      // TODO: connect to the mailing list provider (e.g. Mailchimp) here.
      msg.textContent = "Thank you! Please check your inbox to confirm your subscription.";
      newsletter.reset();
    });
  }

  // Footer year ------------------------------------------------------------
  $$(".js-year").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
