# 🚀 Complete Setup Guide for EduAI Platform

## Step-by-Step Installation

### 1. Install Dependencies

```bash
cd eduai-platform
npm install
```

If you encounter peer dependency issues, use:
```bash
npm install --legacy-peer-deps
```

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `eduai-platform`
4. Disable Google Analytics (optional)
5. Click "Create project"

#### Enable Authentication
1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Click "Email/Password"
4. Enable "Email/Password"
5. Click "Save"

#### Create Firestore Database
1. Go to **Firestore Database**
2. Click "Create database"
3. Select "Start in test mode" (for development)
4. Choose a location (e.g., us-central)
5. Click "Enable"

#### Enable Storage
1. Go to **Storage**
2. Click "Get started"
3. Start in test mode
4. Click "Done"

#### Get Firebase Config
1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click the web icon `</>`
4. Register app name: `eduai-web`
5. Copy the `firebaseConfig` object

### 3. OpenAI Setup

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to **API Keys**
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. **Important:** Add billing information to use GPT-4 and Whisper

### 4. Environment Variables

Create `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# OpenAI Configuration
OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🧪 Testing the Platform

### Create Test Accounts

#### Teacher Account
1. Go to `/register`
2. Select "Teacher"
3. Name: `Sarah Johnson`
4. Email: `teacher@test.com`
5. Password: `password123`

#### Student Account
1. Go to `/register`
2. Select "Student"
3. Name: `Marcus Chen`
4. Email: `student@test.com`
5. Password: `password123`

### Test Teacher Flow

1. **Login** as teacher
2. **Create Assessment:**
   - Click "New Assessment"
   - Title: "Chapter 5 Quiz - Biology"
   - Add question: "Explain the process of photosynthesis"
   - Points: 20
   - Enable rubric (optional)
   - Create assessment

3. **View Dashboard:**
   - Check overview stats
   - Browse assessments
   - View analytics

### Test Student Flow

1. **Login** as student
2. **Take Assessment:**
   - Click "Start Assessment"
   - Write answer or record voice
   - Submit

3. **View Results:**
   - Check AI feedback
   - View progress
   - Track performance

## 🔧 Troubleshooting

### Firebase Errors

**Error: "Firebase: Error (auth/configuration-not-found)"**
- Solution: Check that all Firebase env variables are set correctly
- Verify Firebase project is created and enabled

**Error: "Missing or insufficient permissions"**
- Solution: In Firestore, go to Rules and use test mode:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 12, 31);
    }
  }
}
```

### OpenAI Errors

**Error: "Insufficient quota"**
- Solution: Add billing information in OpenAI dashboard
- Check usage limits

**Error: "Invalid API key"**
- Solution: Verify OPENAI_API_KEY in `.env.local`
- Regenerate key if needed

### Build Errors

**Error: "Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Error: "Port 3000 already in use"**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

## 📊 Firestore Collections Structure

The app will automatically create these collections:

### users
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "teacher",
  "createdAt": "2026-05-13T10:00:00.000Z"
}
```

### assessments
```json
{
  "id": "assessment_id",
  "title": "Chapter 5 Quiz",
  "teacherId": "teacher_id",
  "questions": [...],
  "rubric": {...},
  "status": "active",
  "createdAt": "2026-05-13T10:00:00.000Z"
}
```

### submissions
```json
{
  "id": "submission_id",
  "assessmentId": "assessment_id",
  "studentId": "student_id",
  "answers": [...],
  "gradedAnswers": [...],
  "status": "graded",
  "submittedAt": "2026-05-13T10:00:00.000Z"
}
```

## 🚀 Production Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/eduai-platform.git
git push -u origin main
```

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repo
   - Add environment variables
   - Deploy

3. **Update Firebase Config**
   - Add your Vercel domain to Firebase authorized domains
   - Go to Firebase Console > Authentication > Settings > Authorized domains

### Environment Variables in Vercel

Add all variables from `.env.local`:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_APP_URL` (set to your Vercel URL)

## 💡 Tips for Demo/Presentation

1. **Prepare Sample Data:**
   - Create 2-3 assessments beforehand
   - Have sample student submissions ready
   - Prepare interesting questions

2. **Demo Flow:**
   - Start with landing page (show features)
   - Login as teacher → create assessment
   - Login as student → take assessment
   - Show AI feedback
   - Return to teacher → review and override
   - Show analytics

3. **Highlight Key Features:**
   - Rubric-guided AI evaluation
   - Voice response capability
   - Instant feedback
   - Teacher control/override
   - Learning analytics

## 📝 Next Steps

After basic setup:

1. **Customize Branding:**
   - Update colors in `tailwind.config.ts`
   - Change logo and app name
   - Modify landing page content

2. **Add Features:**
   - Email notifications
   - PDF report generation
   - Advanced analytics charts
   - Plagiarism detection
   - Class management

3. **Improve AI:**
   - Fine-tune prompts
   - Add more rubric options
   - Implement better voice analysis
   - Add multi-language support

## 🆘 Need Help?

- Check the main README.md
- Review Firebase documentation
- Check OpenAI API docs
- Open an issue on GitHub

---

**You're all set! 🎉 Start building amazing educational experiences.**
