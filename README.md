# D.A.R.C. Lab website

Informational site for the **Darknet Analysis and Research on Cybercrime Lab (D.A.R.C. Lab)** at The University of Alabama, formerly the Dark Web Investigation Lab (DWIL).

It's a single static page: no build step and no dependencies. Fonts load from Google Fonts.

```
index.html                     the whole site (HTML + CSS)
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

Open `index.html` in a browser.

## Publish with GitHub Pages

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
4. The site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Editing

- **Application link:** search `index.html` for `forms.gle` (it appears three times, once as plain text). If the form changes, regenerate `assets/apply-qr.png` too.
- **Student leads:** intentionally not named on the site, since leads rotate.
