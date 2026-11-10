# Grok Bot Demo (UI Only)

Frontend mock dashboard inspired by a trading-bot style interface.

**This is a pure demo.**  
- No real trading  
- No wallet connection  
- No exchange API  
- Not affiliated with xAI / Grok  

Just a dark-themed mobile-first UI with:
- Balance / P&L / Winrate cards
- Balance history chart
- Activity log
- Animated mesh heartbeat
- Agent status cards

## Live Preview (GitHub Pages)

After you push this repo and enable Pages, the URL will be:

```
https://<your-username>.github.io/<repo-name>/
```

## How to deploy to GitHub Pages

1. Create a new repository on GitHub (example name: `grok-bot-demo`)
2. Upload these files (`index.html`, `styles.css`, `app.js`, `README.md`)
3. Go to **Settings → Pages**
4. Source: **Deploy from a branch**
5. Branch: `main` (or `master`), folder: `/ (root)`
6. Save → wait 1–2 minutes → open the generated URL

### Quick push via Git (optional)

```bash
git init
git add .
git commit -m "Grok Bot demo UI"
git branch -M main
git remote add origin https://github.com/<your-username>/grok-bot-demo.git
git push -u origin main
```

Then enable Pages as above.

## Local preview

Just open `index.html` in a browser, or:

```bash
npx serve .
```

---

Made for demo / learning purposes only.
