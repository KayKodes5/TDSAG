# TDSAG Website

Static website for The Down Syndrome Association Gauteng.
Plain HTML, CSS and JavaScript. No build step.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: short introduction, key stats, programme teasers, links into the rest of the site, current campaign, newsletter |
| `impact.html` | Our Impact: who we are, social mandate, what we do, our journey, stories, accountability |
| `programmes.html` | Programmes: early intervention, self-advocacy and outreach support groups in detail, plus the request-for-assistance form |
| `find-support.html` | Find Support: where to start, resource library by audience, common questions |
| `get-involved.html` | Get Involved: ways to donate (online, monthly, EFT), corporate partnerships, volunteer sign-up, events |
| `contact.html` | Contact: details, map and enquiry form |
| `donate.html` | Donation form: once or monthly, amount, fund, details, Section 18A, payment method |
| `campaign-early-intervention.html` | "A Strong Start for Every Child" campaign page |

Links can pre-fill forms with query parameters:

- `donate.html?amount=500&fund=early-intervention&freq=monthly`
- `programmes.html?programme=self-advocacy#request-assistance`
- `contact.html?subject=partnership` (also `programmes`, `donations`, `volunteering`, `events`, `media`)

The header and footer are repeated in every page. If you change them, change them in all eight files.

## Run locally

Open `index.html` in a browser, or serve the folder:

```powershell
cd C:\Users\Khanyisa\TDSAG
python -m http.server 8000
# then open http://localhost:8000
```

## Before going live

- **Logo:** `assets/img/logo.svg` is a placeholder recreation. Replace it with the official logo file.
- **Photos:** live in `assets/img/photos/` (resized JPEGs). Make sure TDSAG has consent or a licence for each one. To add more, use `<img class="photo" src="assets/img/photos/..." alt="...">`.
- **Placeholders:** search for `[` to find every value still to be filled in (`[###]`, `R[raised]`, campaign figures, dated milestones, office hours and so on).
- **Resource PDFs:** the guides on `find-support.html` link to the PDFs on the current site (`https://www.tdsag.co.za/images/...`). If that site is switched off, copy the PDFs into `assets/docs/` and update the links first.
- **Content from the current site:** programmes, mission, rights framework, bank details, contacts and George Lesotho's story were taken from tdsag.co.za. Parts of that site date from around 2015, so confirm they are still current.
- **Impact copy:** fill in the verified costs in `impactCopy` in `js/main.js`.
- **BackaBuddy:** the "Keep the Learning Centre Alive" button on the home page points to the BackaBuddy homepage. Swap in the campaign's own page URL (`TODO` in `index.html`).
- **Payments:** the donate form only shows a thank-you dialog for now. Connect a provider such as PayFast, Ozow or SnapScan where the `TODO` sits in `js/main.js`.
- **Forms:** the assistance, volunteer and contact forms only show a thank-you message. Connect them to an inbox (for example Formspree) at the `TODO` in `js/main.js`.
- **Newsletter:** connect the subscribe form to your mailing list provider (`TODO` in `js/main.js`).
- **POPIA:** link the privacy notice in the footer and forms.
