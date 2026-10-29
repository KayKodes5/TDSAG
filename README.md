# TDSAG Website

Static website for The Down Syndrome Association Gauteng, built from the *TDSAG Website Mockup*.
Plain HTML, CSS and JavaScript. No build step.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: hero, quick give, about, stats, programmes, campaign, get involved, gallery, resources, events, newsletter |
| `donate.html` | Donation form: once or monthly, amount, fund, details, Section 18A, payment method. Works on mobile too |
| `campaign-early-intervention.html` | "A Strong Start for Every Child" campaign page |

The donate page reads query parameters, for example `donate.html?amount=500&fund=early-intervention&freq=monthly`.

## Run locally

Open `index.html` in a browser, or serve the folder:

```powershell
cd C:\Users\Khanyisa\TDSAG
python -m http.server 8000
# then open http://localhost:8000
```

## Before going live

- **Logo:** `assets/img/logo.svg` is a placeholder recreation. Replace it with the official logo file.
- **Photos:** swap the `.photo` placeholder `<div>`s for `<img>` tags, using approved images shared with consent.
- **Placeholders:** search for `[` to find every value still to be filled in (`[###]`, `R[raised]`, `[date]`, bank details and so on).
- **Impact copy:** fill in the verified costs in `impactCopy` in `js/main.js`.
- **Payments:** the donate form only shows a thank-you dialog for now. Connect a provider such as PayFast, Ozow or SnapScan where the `TODO` sits in `js/main.js`.
- **Newsletter:** connect the subscribe form to your mailing list provider (`TODO` in `js/main.js`).
- **POPIA:** link the privacy notice in the footer.
