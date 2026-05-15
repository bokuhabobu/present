# English-German Vocabulary Book - QR Random UID Version

This version separates vocabulary data by URL parameter.

Example:

```text
https://bokuhabobu.github.io/present/?uid=u_a3f91c7d20aa
```

The web app reads `uid` and stores words in a separate localStorage key:

```text
vocabularyWords_u_a3f91c7d20aa
```

## Files

- `index.html` - Web app page
- `style.css` - Web app design
- `script.js` - App logic with QR URL parameter support
- `qr_generator_colab_random_no_noise.ipynb` - Google Colab QR generator
- `qr_generator_colab_random_no_noise.py` - Python version of QR generator
- `FULL_CODE_QR_RANDOM.md` - Full QR generator code

## How to publish the app

Upload these web files to GitHub Pages:

```text
index.html
style.css
script.js
README.md
```

Then access:

```text
https://YOUR_NAME.github.io/YOUR_REPOSITORY/?uid=ANY_ID
```

## How to generate QR codes

1. Open `qr_generator_colab_random_no_noise.ipynb` in Google Colab.
2. Change `BASE_URL` to your GitHub Pages URL.
3. Change `USER_COUNT` to the number of QR codes you want.
4. Run all cells.
5. Download `qr_codes_random.zip`.
6. Keep `qr_mapping_random.csv` safely.

## Important operation rule

Random IDs are for **new QR codes**.

For reissuing the same user's QR code, reuse the same `uid` from `qr_mapping_random.csv`.
If you generate a new random ID, the app treats it as a different user.
