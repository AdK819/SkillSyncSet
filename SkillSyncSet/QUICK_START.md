# Quick Start Guide - SkillSyncSet

## 🚀 Get Started in 3 Steps

### Step 1: Set Up Firebase (5 minutes)

1. **Create Firebase Project**
   - Visit: https://console.firebase.google.com/
   - Click "Create a project" → Name it "SkillSyncSet"

2. **Enable Services**
   - **Authentication**: Go to Authentication > Enable "Email/Password"
   - **Firestore**: Go to Firestore Database > Create database (test mode)
   - **Storage**: Go to Storage > Get Started (test mode)

3. **Get Your Config**
   - Go to Project Settings (⚙️ icon)
   - Under "Your apps" → Click Web icon `</>`
   - Copy the `firebaseConfig` object

4. **Update Your Code**
   - Open: `src/services/firebase.js`
   - Replace the placeholder values with your actual Firebase config

### Step 2: Run the App

```bash
npm run dev
```

App opens at: **http://localhost:5173**

### Step 3: Test It!

1. Go to `/signup`
2. Select "Student"
3. Fill the form and sign up
4. Complete the profile setup
5. Your profile is ready! ✨

## 📱 What You Can Do Now

- ✅ Sign up as Student/Teacher/Event Organizer
- ✅ Complete student profile with photo
- ✅ Add GitHub, LinkedIn, Discord profiles
- ✅ Edit profile anytime
- ✅ Works on mobile and desktop

## 📖 Need More Help?

- Full details: See `IMPLEMENTATION_COMPLETE.md`
- Firebase setup: See `SETUP_GUIDE.md`

## ⚡ One-Line Commands

```bash
# Install dependencies (if needed)
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

That's it! You're all set! 🎉
