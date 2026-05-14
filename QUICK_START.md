# ⚡ Quick Start Guide

## Option 1: Run with Mock Data (No API Keys Needed)

You can test the UI immediately without setting up Firebase or OpenAI:

```cmd
npm run dev
```

Then open: http://localhost:3000

**Note:** Authentication and AI features won't work, but you can see the full UI design.

---

## Option 2: Full Setup (5 Minutes)

### Step 1: Create Firebase Project (2 minutes)

1. Go to: https://console.firebase.google.com/
2. Click **"Add project"**
3. Name it: `eduai-platform`
4. Disable Google Analytics
5. Click **"Create project"**

### Step 2: Enable Firebase Services (2 minutes)

**Authentication:**
1. Click **"Authentication"** → **"Get started"**
2. Click **"Email/Password"** → Enable it → Save

**Firestore:**
1. Click **"Firestore Database"** → **"Create database"**
2. Select **"Start in test mode"** → Next
3. Choose location (e.g., us-central) → Enable

**Storage:**
1. Click **"Storage"** → **"Get started"**
2. Start in test mode → Done

### Step 3: Get Firebase Config (1 minute)

1. Click the **gear icon** (Settings) → **"Project settings"**
2. Scroll to **"Your apps"**
3. Click the **web icon** `</>`
4. Register app: `eduai-web`
5. **Copy the config values**

### Step 4: Get OpenAI API Key (1 minute)

1. Go to: https://platform.openai.com/api-keys
2. Click **"Create new secret key"**
3. Copy the key (starts with `sk-`)
4. **Important:** Add billing info at https://platform.openai.com/account/billing

### Step 5: Update .env.local

Open `.env.local` and replace the placeholder values with your actual credentials.

### Step 6: Run the App

```cmd
npm run dev
```

Open: http://localhost:3000

---

## Test Accounts

Create these accounts to test:

**Teacher:**
- Email: teacher@test.com
- Password: password123

**Student:**
- Email: student@test.com
- Password: password123

---

## Troubleshooting

**"Firebase not configured"**
- Check that all Firebase env variables are set in `.env.local`

**"OpenAI API error"**
- Verify your API key is correct
- Ensure billing is enabled on OpenAI account

**Port 3000 in use**
- Run: `npm run dev -- -p 3001`

---

## Need Help?

Check the full SETUP_GUIDE.md for detailed instructions.
