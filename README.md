# English-German Vocabulary Book - QR User Version

This version supports QR-code-based user separation with URL parameters.

## Basic URL pattern

```text
https://bokuhabobu.github.io/present/?uid=u_001
https://bokuhabobu.github.io/present/?uid=u_002
https://bokuhabobu.github.io/present/?uid=u_003
```

The app reads `uid` from the URL and saves data to a different localStorage key.

```text
?uid=u_001 -> vocabularyWords_u_001
?uid=u_002 -> vocabularyWords_u_002
```

## Important note

This is not a login system. Data is saved in the browser's localStorage, so it is separated by:

- device
- browser
- domain
- uid in the URL

The same uid on a different device will not automatically sync.

## Files

```text
index.html
style.css
script.js
qr_generator_colab.ipynb
qr_generator_colab.py
```

## GitHub Pages usage

1. Upload `index.html`, `style.css`, and `script.js` to the GitHub Pages repository.
2. Open the site with `?uid=...`.
3. Use `qr_generator_colab.ipynb` in Google Colab to generate QR images.

## Update GitHub

```bash
git add .
git commit -m "Add QR user mode"
git push
```
