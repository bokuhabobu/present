# QR Code Generator for English-German Vocabulary Book
# Run this code in Google Colab.

# 1) Install QR library
!pip install -q qrcode[pil]

# 2) Import libraries
import os
import zipfile
import secrets
from pathlib import Path

import pandas as pd
import qrcode
from google.colab import files

# 3) Set your GitHub Pages URL
# Change this URL to your own GitHub Pages URL.
BASE_URL = "https://bokuhabobu.github.io/present/"

# 4-A) Manual user IDs
USER_IDS = [
    "u_001",
    "u_002",
    "u_003",
    "u_004",
    "u_005",
]

# 4-B) Optional: random user IDs
# If you want random IDs, uncomment the next line and comment out the manual USER_IDS above.
# USER_IDS = [f"u_{secrets.token_hex(3)}" for _ in range(20)]

# 5) Create output folder
output_dir = Path("qr_codes")
output_dir.mkdir(exist_ok=True)

records = []

# 6) Generate QR images
for uid in USER_IDS:
    url = f"{BASE_URL}?uid={uid}"

    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )

    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    filename = f"{uid}.png"
    filepath = output_dir / filename
    img.save(filepath)

    records.append({
        "uid": uid,
        "url": url,
        "qr_file": filename,
    })

# 7) Save uid-url mapping table
mapping_df = pd.DataFrame(records)
mapping_df.to_csv("qr_mapping.csv", index=False, encoding="utf-8-sig")

print(mapping_df)

# 8) Zip all QR images and mapping CSV
zip_filename = "qr_codes.zip"

with zipfile.ZipFile(zip_filename, "w", compression=zipfile.ZIP_DEFLATED) as zipf:
    for png_file in output_dir.glob("*.png"):
        zipf.write(png_file, arcname=png_file.name)

    zipf.write("qr_mapping.csv", arcname="qr_mapping.csv")

# 9) Download zip file
files.download(zip_filename)
