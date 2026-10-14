# D.A.R.C. Lab website

Informational site for the **Darknet Analysis and Research on Cybercrime Lab (D.A.R.C. Lab)** at The University of Alabama, formerly the Dark Web Investigation Lab (DWIL).

It's a plain static site: no build step and no dependencies. Every page shares `assets/site.css` and the same header menu. Fonts load from Google Fonts.

```
index.html                     home: intro, links into the site, how to apply
about.html                     mission, the two teams, where we're headed
implementations.html           Implementations team: what we do, security stack, proof-of-concept reports
research.html                  Project Researchers: research areas, process, this semester's target
security.html                  old address; forwards to implementations.html
vulnerability-management.html, logging-and-monitoring.html, anti-virus.html,
patch-management.html, password-and-account-management.html,
digital-forensics-and-data-recovery.html
                               one explainer page per capability card (linked from Implementations)
people.html                    faculty sponsor and student leadership
experience.html                how we work and opportunities beyond the lab
join.html                      application link, QR code and what we look for
404.html                       shown for broken links
assets/site.css                shared styles for every page
assets/site.js                 "decrypt" effect on page text; timing settings at the top
favicon.ico                    browser tab icon
assets/darc-logo-animated.webp hero logo (plays its reveal animation once)
assets/darc-logo.png           static logo (shown when reduced motion is on)
assets/emblem.png              ring emblem used in the header
assets/favicon-32.png, icon-180.png, icon-512.png  tab, home-screen and share icons
assets/partin.png              faculty sponsor photo
assets/apply-qr.png            QR code for the application form
```

The logo and icons are placeholders until the lab's official logo is final.
Replace the files in `assets/` (same names) to swap them out.

## Preview locally

Open `index.html` in a browser and click through.

## Publish with GitHub Pages

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
4. The site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Editing

- **Application link:** it appears on `index.html` and `join.html` (search for `forms.gle`). If the form changes, regenerate `assets/apply-qr.png` too.
- **Student leads:** intentionally not named on the site, since leads rotate.
