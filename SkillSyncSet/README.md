# SkillSyncSet

A platform to connect skilled and like-minded students within a college.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Routing**: React Router

## Project Structure

```
SkillSyncSet/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components (Home, Login, Signup)
│   ├── services/        # Firebase configuration
│   ├── context/         # React context (Auth)
│   ├── utils/           # Utility functions
│   └── App.jsx          # Main app component
├── public/              # Static assets
└── package.json
```

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project called "SkillSyncSet"
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password"
4. Create Firestore Database:
   - Go to Firestore Database > Create database
   - Start in test mode (for development)
5. Get your config:
   - Go to Project Settings > General
   - Scroll to "Your apps" > Web app
   - Copy the firebaseConfig object
6. Update `src/services/firebase.js` with your config

### 2. Run the Project

```bash
npm run dev
```

The app will run on http://localhost:5173

## Features Roadmap

### Phase 1 (MVP)
- [x] Authentication (Login/Signup)
- [ ] User Profile Creation
- [ ] Skill tagging
- [ ] Student directory/search

### Phase 2
- [ ] In-app messaging
- [ ] Posts/Feed
- [ ] Event creation (for organizers)
- [ ] Polls

### Phase 3
- [ ] Notifications
- [ ] Resource sharing
- [ ] Analytics for organizers

## Database Schema (Firestore)

### Users Collection
```javascript
{
  uid: string,
  email: string,
  name: string,
  year: string,
  branch: string,
  skills: [string],
  experienceLevel: string, // beginner/intermediate/advanced
  preferredRoles: [string], // frontend, backend, designer, etc.
  projects: [{ title, status, link }],
  availability: { hours: string, days: [string] },
  bio: string,
  contact: { discord, github, linkedin },
  createdAt: timestamp
}
```

### Posts Collection
```javascript
{
  userId: string,
  content: string,
  type: string, // post, event, poll
  likes: number,
  comments: [{ userId, text, timestamp }],
  createdAt: timestamp
}
```
