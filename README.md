# Le'Tits'Now / Git'R'Wet
### Real-time AI-powered ski & whitewater conditions app

---

## Deploy in 5 Steps

### 1. Push this repo to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/letitsnow.git
git push -u origin main
```

### 2. Connect to Netlify
- Go to [netlify.com](https://netlify.com) and sign up (free)
- Click **"Add new site" → "Import an existing project"**
- Choose **GitHub** and select your `letitsnow` repo
- Build settings are auto-detected from `netlify.toml` — leave defaults
- Click **Deploy site**

### 3. Add your Anthropic API key
- In Netlify dashboard go to **Site configuration → Environment variables**
- Click **Add a variable**
- Key: `ANTHROPIC_API_KEY`
- Value: your key from [console.anthropic.com](https://console.anthropic.com)
- Click **Save**

### 4. Redeploy
- Go to **Deploys → Trigger deploy → Deploy site**
- Takes about 30 seconds

### 5. Done 🎉
Your app is live at `https://YOUR-SITE-NAME.netlify.app`

---

## How it works
- `index.html` — the full app, no build step required
- `netlify/functions/proxy.js` — serverless function that holds your API key server-side
- Users call `/api/proxy` → Netlify forwards to Anthropic with your key — **users never see the key**
- Free Netlify tier includes 125,000 function calls/month (plenty for this app)

## Local development
```bash
npm install -g netlify-cli
netlify dev
```
Then open `http://localhost:8888` — the proxy runs locally too.
