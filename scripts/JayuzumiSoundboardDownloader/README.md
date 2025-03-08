# 🔊 Jayuzumi Soundboard Downloader

This **Tampermonkey userscript** adds batch download functionality to Jayuzumi soundboards, allowing users to quickly save multiple sound clips with properly formatted filenames.

## ✨ Features

- **Batch Download** – Download multiple sound clips at once.
- **Auto-Naming** – Files are saved with category-based names.
- **Dynamic Injection** – Re-runs when new sounds are loaded.
- **Search-Compatible** – Ensures buttons persist after searching.

## 🛠️ Installation

1. **Install Tampermonkey**
   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/)
2. **Copy the script manually** from this repository.
3. **Paste it into a new Tampermonkey script** and save.
4. **Ensure CORS is enabled** for the script to function correctly.

## ⚙️ Customization

Settings are stored directly in the script. Modify the `settings` object inside the script to adjust debug options and batch download size.

### Example Configuration

```js
const settings = {
	debug: true,
	testDownload: false,
	downloadBatch: 10
};
```

## 🛠️ How It Works

The script **automatically detects sound clips** on the page and injects download buttons for batch downloading. Clicking a button will download the specified range of sound clips.

## ❓ FAQ

**Q: Why do I need CORS enabled?**  
A: The script downloads files directly from Jayuzumi, which requires CORS permissions.

**Q: Can I change the number of downloads per batch?**  
A: Yes! Modify the `downloadBatch` value in the script settings.

## ⚠️ Disclaimer

This script is for **personal use only**. It is not affiliated with Jayuzumi.
