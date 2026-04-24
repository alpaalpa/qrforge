# QRForge

A lightweight, browser-only QR Code generator web app – no server-side code required.

## Features

- Generate scannable QR codes from any URL, `mailto:` address, or plain text
- Choose output size (128 px / 256 px / 512 px)
- Choose error-correction level (L / M / Q / H)
- Download the generated QR code as a PNG image
- Runs entirely in the browser – no data is sent to any server

## Usage

### Option 1 – Local file (no server needed)

Open `index.html` directly in any modern web browser.

### Option 2 – Static web server (Apache, nginx, etc.)

Copy the three files to any directory served by your web server:

```
index.html
style.css
app.js
```

No build step or back-end is required.

## Files

| File | Description |
|------|-------------|
| `index.html` | Application markup |
| `style.css` | Styles |
| `app.js` | QR code generation logic |

## Dependencies

[qrcodejs](https://github.com/davidshimjs/qrcodejs) is loaded at runtime from the
[cdnjs CDN](https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js).
An active internet connection is required the first time the page is loaded unless the
library is cached by the browser.

## Licence

MIT – see [LICENSE](LICENSE).
