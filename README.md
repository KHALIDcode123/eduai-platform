# EduAI — AI-Powered Educational Assessment Platform

A modern, full-stack educational assessment platform that helps teachers evaluate written and spoken student responses while providing students with intelligent, personalized, and constructive feedback.

## 🌟 Features

### For Teachers
- **Create Assessments** — Build custom assessments with essays, short answers, and voice questions
- **Custom Rubric Builder** — Define grading criteria, expected concepts, sample answers, and common mistakes
- **AI-Assisted Grading** — Automatic evaluation of essays and voice responses using GPT-4
- **Teacher Review System** — Review, adjust, and override AI evaluations
- **Learning Analytics** — Track class performance, identify knowledge gaps, and monitor progress
- **Submission Management** — View and manage all student submissions in one place

### For Students
- **Submit Essays** — Write and submit text responses with autosave
- **Voice Responses** — Record audio answers directly in the browser
- **Instant AI Feedback** — Receive detailed, constructive feedback immediately
- **Progress Tracking** — Monitor learning progress, strengths, and areas for improvement
- **Performance Analytics** — View scores, trends, and personalized recommendations

### AI Features
- **Rubric-Guided Evaluation** — AI adapts to teacher-defined expectations
- **Essay Grading** — Analyzes grammar, clarity, coherence, organization, and content
- **Speech-to-Text** — Transcribes voice responses using Whisper API
- **Voice Analysis** — Evaluates fluency, clarity, pace, and communication effectiveness
- **Personalized Feedback** — Generates encouraging, educational feedback for each student

## 🚀 Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Firebase (Firestore, Authentication, Storage)
- **AI:** OpenAI GPT-4, Whisper API
- **UI Components:** Lucide Icons, Custom glassmorphism design
- **State Management:** React Context API
- **Notifications:** React Hot Toast

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Firebase account
- OpenAI API key

### Setup Steps

1. **Clone the repository**
   ```bash
   cd eduai-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Enable Storage
   - Copy your Firebase config

4. **Configure OpenAI**
   - Get your API key from [OpenAI Platform](https://platform.openai.com/)

5. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your credentials:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # OpenAI Configuration
   OPENAI_API_KEY=sk-your_openai_api_key

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
eduai-platform/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Dashboard pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── dashboard/         # Dashboard components
│   │   │   ├── teacher/       # Teacher-specific components
│   │   │   └── student/       # Student-specific components
│   │   ├── landing/           # Landing page components
│   │   └── ui/                # Reusable UI components
│   ├── contexts/
│   │   └── AuthContext.tsx    # Authentication context
│   ├── lib/
│   │   ├── firebase.ts        # Firebase configuration
│   │   ├── constants.ts       # App constants
│   │   └── utils.ts           # Utility functions
│   ├── services/
│   │   ├── firebaseService.ts # Firebase CRUD operations
│   │   ├── openaiService.ts   # OpenAI API integration
│   │   ├── aiService.ts       # AI service wrapper
│   │   ├── assessmentService.ts # Assessment operations
│   │   └── api.ts             # API client
│   └── types/
│       └── index.ts           # TypeScript type definitions
├── public/                     # Static assets
├── .env.example               # Environment variables template
├── tailwind.config.ts         # Tailwind CSS configuration
├── next.config.ts             # Next.js configuration
└── package.json               # Dependencies
```

## 🎨 Design System

### Color Palette
- **Primary:** Indigo/Purple gradient (`#6366f1` to `#4338ca`)
- **Accent:** Pink/Purple (`#d946ef` to `#c026d3`)
- **Dark:** Slate shades (`#0f172a` to `#1e293b`)

### Key Design Features
- **Dark Theme:** Modern dark UI with glassmorphism effects
- **Glow Effects:** Subtle glowing borders and shadows
- **Smooth Animations:** Fade-in, slide-up, and float animations
- **Responsive:** Mobile-first design that works on all devices

## 🔐 Security Features

- **Firebase Authentication:** Secure email/password authentication
- **Role-Based Access:** Separate teacher and student portals
- **Data Validation:** Input validation on both client and server
- **Secure API Keys:** Environment variables for sensitive data

## 📊 Database Schema

### Collections

**users**
- id, name, email, role, avatarUrl, createdAt

**assessments**
- id, title, description, teacherId, questions[], rubric, totalPoints, status, dueDate, allowVoiceResponses, createdAt, updatedAt

**submissions**
- id, assessmentId, studentId, studentName, answers[], gradedAnswers[], totalScore, maxScore, status, submittedAt, gradedAt, teacherComments

**rubrics**
- id, name, criteria[], expectedConcepts[], sampleAnswer, commonMistakes[], createdAt

## 🤖 AI Integration

### Essay Grading
- Uses GPT-4 for intelligent evaluation
- Considers rubric criteria, expected concepts, and sample answers
- Provides scores, feedback, strengths, weaknesses, and suggestions

### Voice Analysis
- Transcribes audio using Whisper API
- Analyzes fluency, clarity, pace, filler words, and hesitations
- Provides constructive communication feedback

### Feedback Generation
- Creates personalized summaries for each student
- Highlights strengths and areas for improvement
- Offers specific study recommendations

## 🚧 Important Notes

### AI Disclaimer
The platform clearly displays:
> "AI-generated evaluation is only a recommendation and should be reviewed by the teacher."

Teachers maintain final authority over all grades and can:
- Review AI evaluations
- Manually adjust scores
- Add personal comments
- Override AI recommendations

## 📝 Usage

### For Teachers

1. **Register** as a teacher
2. **Create an assessment** with questions and optional rubric
3. **Share** the assessment with students
4. **Review** AI-generated evaluations
5. **Adjust** scores and add comments as needed
6. **View analytics** to track class performance

### For Students

1. **Register** as a student
2. **View** available assessments
3. **Submit** written or voice responses
4. **Receive** instant AI feedback
5. **Track** your progress over time

## 🛠️ Development

### Build for production
```bash
npm run build
npm start
```

### Lint code
```bash
npm run lint
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy to other platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Railway

## 📄 License

This project is for educational and demonstration purposes.

## 🤝 Contributing

This is a demo/hackathon project. Feel free to fork and customize for your needs.

## 📧 Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ for educators and students everywhere.**
