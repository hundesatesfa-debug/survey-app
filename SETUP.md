# Software Development Survey Website

A complete survey application for collecting information about people's familiarity with software development. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### User Features
- Multi-step survey with 8 different sections
- Collects user name and survey responses
- No personal information collected (no email, phone, age, gender)
- Simple confirmation message after submission
- Users cannot see results, scores, or charts

### Admin Features
- Secure login with username and password
- Admin dashboard with interactive charts
- View all survey participants and their responses
- Click on individual participants to view detailed responses
- Real-time statistics and analytics
- Charts for:
  - Technology awareness
  - Programming concept awareness
  - Software development terminology
  - Project experience
  - Learning goals

## Technology Stack

- **Frontend**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Authentication**: bcryptjs
- **Database**: Local JSON file (configurable for cloud)

## Project Structure

```
survey-app/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx           # Admin login page
│   │   └── dashboard/page.tsx       # Admin dashboard
│   ├── api/
│   │   ├── surveys/route.ts         # Survey submission and retrieval
│   │   └── admin/
│   │       ├── login/route.ts       # Authentication endpoint
│   │       └── stats/route.ts       # Statistics endpoint
│   ├── components/
│   │   ├── SurveyForm.tsx           # Main survey form
│   │   ├── AdminLogin.tsx           # Admin login component
│   │   ├── AdminDashboard.tsx       # Admin dashboard component
│   │   └── survey/                  # Individual survey steps
│   │       ├── Step1Technologies.tsx
│   │       ├── Step2Familiarity.tsx
│   │       ├── Step3ProgrammingTerms.tsx
│   │       ├── Step4BasicTerms.tsx
│   │       ├── Step5WebDevelopment.tsx
│   │       ├── Step6DevelopmentTools.tsx
│   │       ├── Step7ProjectExperience.tsx
│   │       └── Step8LearningGoals.tsx
│   ├── page.tsx                     # Home page with survey
│   └── layout.tsx                   # Root layout
├── lib/
│   ├── db.ts                        # Database utility functions
│   └── auth.ts                      # Authentication utilities
├── types/
│   └── survey.ts                    # TypeScript types
├── data/                            # Local survey data (auto-created)
│   └── surveys.json                 # Survey responses storage
└── .env.local                       # Environment variables
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Access

### Default Credentials
- **Username**: `Addajabo`
- **Password**: `admin123`

### Admin Login URL
[http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Admin Dashboard URL
[http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)

## Survey Sections

1. **User Name**: Collect participant name
2. **Technologies**: Ask which technologies they've heard of
3. **Technology Familiarity**: For each selected technology, ask familiarity level
4. **Programming Terms**: Ask about 21 programming-related terms
5. **Basic Programming Terms**: Ask about 11 basic programming concepts
6. **Web Development**: Ask about 15 web development terms
7. **Development Tools**: Ask about popular development tools and editors
8. **Project Experience**: Ask about programming project experience
9. **Learning Goals**: Ask what they want to learn

## Data Storage

### Development
- Surveys are stored in `data/surveys.json`
- Automatically created on first submission
- Data persists locally

### Production (Vercel)
To use cloud database for production:

1. Update `lib/db.ts` to use your cloud database (PostgreSQL, MongoDB, etc.)
2. Use environment variables for connection strings
3. The current implementation uses local files as a starting point

Example environment variables:
```env
DATABASE_URL=postgresql://user:password@host/database
```

## Customization

### Change Admin Password

To generate a new password hash:

```bash
node -e "require('bcryptjs').hash('your-new-password', 10).then(h => console.log(h))"
```

Then update `lib/auth.ts` with the new hash.

### Modify Survey Questions

Edit the relevant step component in `app/components/survey/` to add, remove, or modify questions.

### Change Colors/Styling

All styling uses Tailwind CSS. Update classes in components to match your brand colors.

## Building for Production

```bash
npm run build
npm run start
```

The application is optimized for deployment on Vercel.

## Important Notes

- Users do NOT see any results, scores, percentages, or charts
- Only authenticated admins can access the admin dashboard
- Survey data is collected securely and stored locally or in your configured database
- No email, phone, age, or gender information is collected from users

## Deployment to Vercel

1. Push your code to GitHub/GitLab
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

For cloud database persistence, configure your database connection in environment variables before deploying.

## License

MIT
