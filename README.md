# English-German Vocabulary Book with QR User Sync

This is a web-based vocabulary book for learning English and German.  
It is built with **HTML, CSS, and JavaScript**, and it can be hosted on **GitHub Pages**.

This version supports **QR-code-based user identification**. Each QR code contains a unique `uid`, and users who open the same QR code can share the same vocabulary data across different devices.

Cloud synchronization is handled with **Google Sheets + Google Apps Script**.

---

## Demo URL

Replace this with your actual GitHub Pages URL:

```text
https://your-username.github.io/your-repository/
```

Example QR URL:

```text
https://your-username.github.io/your-repository/?uid=u_a8f3c21d20aa
```

---

## Main Features

- English and German vocabulary management
- Add, edit, and delete words
- QR-code-based user identification
- Same QR code can share the same word list across devices
- Google Sheets cloud synchronization
- localStorage cache for local backup
- Automatic Part of Speech classification while typing
- CEFR level support: A1, A2, B1, B2, C1, C2
- Hide English / Hide German modes
- Individual Hide / Show controls for each word
- Compact word card layout
- Flashcard practice
- 4-choice quiz
- Correct and wrong count tracking
- Reset all correct / wrong counts
- Responsive layout for PC, iPad, smartphones, and iPhone SE

---

## Technology Stack

| Area | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Hosting | GitHub Pages |
| Cloud Sync | Google Apps Script |
| Database | Google Sheets |
| QR Generation | Google Colab / Python |
| Local Cache | localStorage |

---

## Recommended File Structure

```text
project/
├── index.html
├── style.css
├── script.js
├── README.md
├── google_apps_script/
│   └── Code.gs
└── tools/
    └── qr_generator_colab_random_no_noise.ipynb
```

Recommended private files:

```text
qr_mapping_random.csv
qr_codes_random.zip
qr_codes_random/
```

These private files should **not** be uploaded to a public GitHub repository.

---

## Main Files

- `index.html` - Web app page
- `style.css` - Web app design
- `script.js` - App logic with QR URL parameter support and cloud sync
- `google_apps_script/Code.gs` - Google Apps Script backend
- `qr_generator_colab_random_no_noise.ipynb` - Google Colab QR generator

---

## How User Identification Works

Each QR code contains a URL with a unique `uid`.

Example:

```text
https://your-username.github.io/your-repository/?uid=u_a8f3c21d20aa
```

The app reads this value:

```text
uid=u_a8f3c21d20aa
```

Then it loads and saves vocabulary data for that user ID.

```text
u_a8f3c21d20aa
↓
Google Sheets
↓
shared vocabulary data
```

If the same QR code is opened on another device, the app reads the same `uid` and loads the same word list from Google Sheets.

---

## Difference from the localStorage-Only Version

The old version used only `localStorage`.

```text
Same QR + different device
↓
different data
```

This cloud sync version uses Google Sheets.

```text
Same QR + different device
↓
same data
```

However, `localStorage` is still used as a local cache.

---

## Setup Guide

### 1. Upload Frontend Files to GitHub

Upload these files to your GitHub repository:

```text
index.html
style.css
script.js
README.md
```

Then push them:

```bash
git add .
git commit -m "Add QR cloud sync vocabulary app"
git push
```

---

### 2. Enable GitHub Pages

Go to your GitHub repository:

```text
Settings
↓
Pages
↓
Build and deployment
↓
Source: Deploy from a branch
↓
Branch: main
↓
Folder: /root
↓
Save
```

After a while, GitHub Pages will provide a URL like this:

```text
https://your-username.github.io/your-repository/
```

---

### 3. Create a Google Spreadsheet

Create a new Google Spreadsheet.

Example name:

```text
vocab_cloud_db
```

This spreadsheet will store all vocabulary data.

---

### 4. Create Google Apps Script

Open the spreadsheet and go to:

```text
Extensions
↓
Apps Script
```

Copy the contents of this file:

```text
google_apps_script/Code.gs
```

Paste it into Apps Script.

If the script has this line:

```javascript
const SPREADSHEET_ID = "";
```

put your spreadsheet ID inside it.

Example spreadsheet URL:

```text
https://docs.google.com/spreadsheets/d/abcdefg123456789/edit
```

Spreadsheet ID:

```text
abcdefg123456789
```

So the code becomes:

```javascript
const SPREADSHEET_ID = "abcdefg123456789";
```

---

### 5. Deploy Apps Script as a Web App

In Apps Script:

```text
Deploy
↓
New deployment
↓
Select type
↓
Web app
```

Use these settings:

```text
Description: vocab cloud sync
Execute as: Me
Who has access: Anyone
```

Then click **Deploy**.

You will get a Web App URL like this:

```text
https://script.google.com/macros/s/xxxxx/exec
```

Copy this URL.

---

### 6. Paste the Apps Script URL into `script.js`

Open `script.js`.

Find this line:

```javascript
const CLOUD_WEB_APP_URL = "";
```

Replace it with your Apps Script Web App URL:

```javascript
const CLOUD_WEB_APP_URL = "https://script.google.com/macros/s/xxxxx/exec";
```

Then push again:

```bash
git add .
git commit -m "Set Apps Script web app URL"
git push
```

---

## QR Code Generation

QR codes are generated with Google Colab.

Use:

```text
tools/qr_generator_colab_random_no_noise.ipynb
```

Open it in Google Colab and edit this line:

```python
BASE_URL = "https://your-username.github.io/your-repository/"
```

Set the number of users:

```python
USER_COUNT = 20
```

Run all cells.

The notebook generates random user IDs like:

```text
u_a8f3c21d20aa
u_91bd0e5a33f2
u_f03a9c7710bb
```

Each QR code will contain a URL like:

```text
https://your-username.github.io/your-repository/?uid=u_a8f3c21d20aa
```

---

## QR Output Files

The Colab notebook generates:

```text
qr_codes_random.zip
qr_mapping_random.csv
```

Example ZIP contents:

```text
qr_codes_random.zip
├── u_a8f3c21d20aa.png
├── u_91bd0e5a33f2.png
├── u_f03a9c7710bb.png
└── qr_mapping_random.csv
```

The CSV file is important because it shows which QR code corresponds to which `uid`.

Example:

| uid | url | qr_file |
|---|---|---|
| u_a8f3c21d20aa | https://.../?uid=u_a8f3c21d20aa | u_a8f3c21d20aa.png |
| u_91bd0e5a33f2 | https://.../?uid=u_91bd0e5a33f2 | u_91bd0e5a33f2.png |

---

## Important QR Management Rule

Do not regenerate a new random ID for an existing user.

Correct operation:

```text
New user
↓
Generate new random QR
```

```text
Existing user
↓
Use the same uid again
```

If you generate a new QR for the same person, the app treats that person as a new user.

---

## Files That Should Not Be Uploaded Publicly

Do not upload these files to a public GitHub repository:

```text
qr_mapping_random.csv
qr_codes_random.zip
qr_codes_random/
```

These files are related to issued QR codes and user management.

Recommended `.gitignore`:

```gitignore
qr_codes_random/
qr_codes_clean/
qr_codes_random.zip
qr_codes_clean.zip
qr_mapping_random.csv
qr_mapping_clean.csv
```

---

## How to Test Cloud Sync

### Test 1: PC

Open:

```text
https://your-username.github.io/your-repository/?uid=testA
```

Add a word:

```text
English: apple
German: der Apfel
```

---

### Test 2: Smartphone

Open the same URL:

```text
https://your-username.github.io/your-repository/?uid=testA
```

If `apple / der Apfel` appears, cloud sync is working.

---

## App Usage

### Add Words

Open the **Add** tab and enter:

```text
English
German
CEFR Level
Memo
Checklist
```

The Part of Speech field is automatically suggested while typing.

The old `Auto Detect POS` button has been removed because classification now runs automatically.

---

### Words Tab

The Words tab shows all saved words.

You can:

- search words
- hide English
- hide German
- hide both
- show individual English or German
- open compact cards
- edit words
- delete words
- mark Correct
- mark Wrong
- reset all counts

---

### Cards Tab

The Cards tab allows flashcard practice.

Available options:

- English → German
- German → English
- Created order
- A-Z
- Z-A
- Random
- Filters by CEFR level, Part of Speech, Weak, Review, Favorite, Mistakes

---

### Quiz Tab

The Quiz tab creates 4-choice questions from saved words.

Available options:

- English → German
- German → English
- Created order
- A-Z
- Z-A
- Random
- Filters by CEFR level, Part of Speech, Weak, Review, Favorite, Mistakes

---

## Cloud Status

The app may show cloud status such as:

```text
Cloud: loaded
Cloud: synced
Cloud: off
Cloud: error
```

Meaning:

| Status | Meaning |
|---|---|
| Cloud: loaded | Data was loaded from Google Sheets |
| Cloud: synced | Data was saved to Google Sheets |
| Cloud: off | Apps Script URL is not set |
| Cloud: error | Sync failed |

---

## Troubleshooting

### Data is not shared across devices

Check these points:

```text
1. CLOUD_WEB_APP_URL is set in script.js
2. Apps Script is deployed as Web App
3. Access permission is set to Anyone
4. GitHub Pages has the latest script.js
5. Both devices are opening the same uid
6. Browser cache is not showing old files
```

---

### Apps Script URL changed

If you redeploy Apps Script and get a new URL, update this line again:

```javascript
const CLOUD_WEB_APP_URL = "https://script.google.com/macros/s/xxxxx/exec";
```

Then push to GitHub:

```bash
git add .
git commit -m "Update Apps Script URL"
git push
```

---

### QR opens the app but no shared data appears

Check whether the QR URL contains `uid`.

Good:

```text
https://your-username.github.io/your-repository/?uid=u_a8f3c21d20aa
```

Bad:

```text
https://your-username.github.io/your-repository/
```

If there is no `uid`, the app uses the default user.

---

### Word data disappeared

Possible causes:

- A different `uid` was opened
- Google Sheets data was manually deleted
- Apps Script URL was changed incorrectly
- Browser cache has old data
- localStorage was cleared

---

## Security Notes

This app uses QR-based simple user identification.

It is **not** a login system.

Anyone who knows the same URL can open the same `uid`.

For personal projects, classes, and small demonstrations, this is simple and practical.  
For real user authentication, Firebase Auth, Supabase Auth, or another login system should be added.

---

## Recommended Public Repository Contents

Public GitHub repository:

```text
index.html
style.css
script.js
README.md
google_apps_script/Code.gs
tools/qr_generator_colab_random_no_noise.ipynb
```

Private local files:

```text
qr_mapping_random.csv
qr_codes_random.zip
issued QR images
```

---

## Development Notes

This app is designed for GitHub Pages, so it does not require a Node.js server.

The frontend is written in plain JavaScript.

The app stores data in two layers:

```text
Google Sheets
↓
main shared cloud data

localStorage
↓
local cache / backup
```

---

## License

For personal and educational use.