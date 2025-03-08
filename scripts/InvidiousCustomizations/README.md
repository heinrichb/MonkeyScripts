# 🎮 Invidious Customizations

This **Tampermonkey userscript** automatically applies **custom playback speed settings** to Invidious and improves the site's user interface.

## ✨ Features

- **Auto-adjust playback speed** based on the channel.
- **UI enhancements** for a better viewing experience.
- Works seamlessly with **Invidious instances**.

## 🛠️ Installation

1. **Install Tampermonkey**
   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/)
2. **Copy the script manually** from this repository.
3. **Paste it into a new Tampermonkey script** and save.
4. **Adjust settings** as needed.

## ⚙️ Customization

Settings are stored directly in the script. Modify the `settings` object inside the script to customize playback speeds.

### Example Configuration

```js
const settings = {
	channels: {
		"Channel Name": { playback_speed: "1.5x" },
		"Another Channel": { playback_speed: "2x" }
	}
};
```

### 🎥 Supported Playback Speeds

- `0.5x`
- `0.75x`
- `1x` (Default)
- `1.25x`
- `1.5x`
- `1.75x`
- `2x`

## 🛠️ How It Works

The script **automatically detects the channel** and adjusts the playback speed accordingly. It also applies some **minor UI improvements** for better usability.

## ❓ FAQ

**Q: Does this work on YouTube?**  
A: No, this script is designed for **Invidious instances** only.

**Q: Can I add more channels?**  
A: Yes! Modify the `settings` object inside the script to add more.

## ⚠️ Disclaimer

This script is for **personal use only**. It is not affiliated with Invidious.
