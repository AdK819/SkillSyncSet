# Quick Setup Guide

## What You Have Now

✅ React app with Vite (fast build tool)
✅ Firebase integration (ready to configure)
✅ Authentication pages (Login/Signup)
✅ React Router for navigation
✅ Basic folder structure

## Next Steps

### Step 1: Set Up Firebase (5 minutes)

1. Go to https://console.firebase.google.com/
2. Click "Add project" or "Create a project"
3. Name it "SkillSyncSet" (or any name you like)
4. Disable Google Analytics (optional, you can enable later)
5. Click "Create project"

### Step 2: Enable Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Click "Email/Password" under Sign-in method
4. Toggle "Enable" and click Save

### Step 3: Create Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (we'll add security rules later)
4. Select your location (closest to you)
5. Click "Enable"

### Step 4: Get Your Firebase Config

1. Click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the "</>" (Web) icon
5. Register app with nickname "SkillSyncSet Web"
6. Copy the `firebaseConfig` object (looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "skillsyncset-xxxxx.firebaseapp.com",
  projectId: "skillsyncset-xxxxx",
  storageBucket: "skillsyncset-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxx"
};
```

7. Open `src/services/firebase.js` in VS Code
8. Replace the placeholder values with your actual config

### Step 5: Run the App

Open terminal in VS Code and run:

```bash
npm run dev
```

The app will start on http://localhost:5173

### Step 6: Test It Out

1. Go to http://localhost:5173/signup
2. Create an account with email/password
3. You should be redirected to the home page
4. Check Firebase Console > Authentication to see your user!

## What to Build Next

- [ ] User profile page with skills, year, branch
- [ ] Search page to find students by skills
- [ ] Messaging system
- [ ] Posts/Feed
- [ ] Event creation for organizers

## Need Help?

- Firebase Docs: https://firebase.google.com/docs
- React Router Docs: https://reactrouter.com/
- Vite Docs: https://vite.dev/

## Common Issues

**Port already in use?**
- Change the port in `vite.config.js` or kill the process using that port

**Firebase not connecting?**
- Double check your config in `firebase.js`
- Make sure you enabled Email/Password authentication

**Module not found?**
- Run `npm install` again
