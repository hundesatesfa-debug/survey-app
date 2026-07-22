# 🎓 Software Development Survey Website - Complete

A fully-functional, modern survey application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Collects information about people's familiarity with software development. Perfect for beginners with zero programming knowledge.

## ✨ What's Included

### User Experience
- ✅ Multi-step survey (8 comprehensive sections)
- ✅ Beginner-friendly language (no jargon)
- ✅ Progress bar for feedback
- ✅ Mobile responsive design
- ✅ Confirmation message after submission
- ✅ **Users see NO results, scores, or charts**

### Admin Features
- ✅ Secure login page (username: `Addajabo`)
- ✅ Interactive dashboard with live charts
- ✅ View all survey participants
- ✅ Click to view detailed individual responses
- ✅ Real-time statistics and analytics
- ✅ Technology awareness breakdown
- ✅ Programming concept knowledge analysis
- ✅ Project experience insights
- ✅ Learning goals visualization

### Data Collection
Surveys collect 9 categories of information:
1. **Name** - Only personal identifier
2. **Technologies** - 16 different tech options
3. **Familiarity** - 6 levels of knowledge per tech
4. **Programming Terms** - 21 technical terms
5. **Basic Concepts** - 11 fundamental programming concepts
6. **Web Development** - 15 web-specific terms
7. **Development Tools** - 10 tools and IDEs
8. **Project Experience** - 5 experience levels
9. **Learning Goals** - 8 learning path options

## 🚀 Quick Start

### Install & Run
```bash
npm install
npm run dev
```

Visit: **http://localhost:3000**

### Admin Access
- **Login URL**: http://localhost:3000/admin/login
- **Dashboard URL**: http://localhost:3000/admin/dashboard
- **Username**: `Addajabo`
- **Password**: `admin123`

## 📁 Project Structure

```
survey-app/
├── app/
│   ├── components/
│   │   ├── SurveyForm.tsx              # Main survey controller
│   │   ├── AdminLogin.tsx              # Admin login page
│   │   ├── AdminDashboard.tsx          # Dashboard with charts
│   │   └── survey/                     # Individual survey steps
│   │       ├── Step1Technologies.tsx
│   │       ├── Step2Familiarity.tsx
│   │       ├── Step3ProgrammingTerms.tsx
│   │       ├── Step4BasicTerms.tsx
│   │       ├── Step5WebDevelopment.tsx
│   │       ├── Step6DevelopmentTools.tsx
│   │       ├── Step7ProjectExperience.tsx
│   │       └── Step8LearningGoals.tsx
│   ├── api/
│   │   ├── surveys/route.ts           # Save & retrieve surveys
│   │   └── admin/
│   │       ├── login/route.ts         # Authentication
│   │       └── stats/route.ts         # Statistics calculation
│   ├── admin/
│   │   ├── login/page.tsx
│   │   └── dashboard/page.tsx
│   ├── page.tsx                        # Home page
│   └── layout.tsx                      # Root layout
├── lib/
│   ├── db.ts                          # Database operations
│   └── auth.ts                        # Password hashing & auth
├── types/
│   └── survey.ts                      # TypeScript interfaces
├── data/                              # Auto-created survey storage
│   └── surveys.json
├── .env.local                         # Environment config
├── QUICKSTART.md                      # Get started guide
├── SETUP.md                           # Detailed setup
├── DEPLOYMENT.md                      # Production deployment
└── package.json
```

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ Secure admin authentication
- ✅ Protected API routes
- ✅ Local token-based sessions
- ✅ No sensitive data exposure
- ✅ Environment variables for secrets

## 📊 Admin Dashboard

### Statistics Cards
- Total participants count
- Unique responses tracked
- Last submission timestamp

### Interactive Charts
1. **Technology Awareness** - Bar chart (% familiar with each tech)
2. **Project Experience** - Pie chart (breakdown of experience levels)
3. **Programming Concepts** - Bar chart (% aware of basic concepts)
4. **Learning Goals** - Horizontal bar chart (interest by goal)
5. **Software Development Terms** - Bar chart (% familiar with terms)

### Participant Management
- Table view of all participants
- Submission timestamps
- Quick-view buttons for each response
- Detailed view modal with all answers
- Tagged display of selections

## 🗄️ Database

### Local Development
- Surveys stored in `data/surveys.json`
- Automatically created on first submission
- Perfect for testing and demo

### Production (Vercel)
Supports multiple databases:
- **PostgreSQL** (recommended)
- **MongoDB**
- **Supabase**
- Custom REST API

See `DEPLOYMENT.md` for setup instructions.

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with API routes |
| **React 19** | UI components and state |
| **TypeScript** | Type safety throughout |
| **Tailwind CSS** | Responsive styling |
| **Recharts** | Interactive data visualization |
| **bcryptjs** | Password hashing |
| **Node.js fs** | Local file storage |

## 📋 Survey Questions

### Heard Of (Multiple Choice)
- 16 technologies (HTML, CSS, JavaScript, Python, Java, C++, etc.)
- 21 programming terms (Programming, Code, Software, etc.)
- 11 basic concepts (Variable, Function, Loop, etc.)
- 15 web development terms (API, Database, Frontend, etc.)
- 10 development tools (VS Code, GitHub, etc.)

### Familiarity (Single Choice)
- 6 levels per selected technology
- Understanding scale from "heard name" to "built something"

### Experience (Single Choice)
- 5 project experience levels
- 10 project types to select from

### Goals (Multiple Choice)
- 8 learning paths
- Understand what users want to learn

## 🎨 UI Features

- Clean, modern design
- Progress bar shows completion
- Responsive mobile layout
- Color-coded sections
- Smooth transitions
- Accessible forms
- Clear navigation
- Loading states

## 🧪 Building & Testing

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Code Quality
```bash
npm run lint
```

## 📤 Deployment

### Vercel (1-click)
1. Push to GitHub
2. Import to Vercel
3. Configure database (optional)
4. Deploy!

See `DEPLOYMENT.md` for detailed instructions.

### Environment Variables for Production
```env
DATABASE_URL=your_database_connection_string
ADMIN_PASSWORD_HASH=your_bcrypt_hash
```

## 🔐 Change Admin Password

Generate a new bcryptjs hash:

```bash
node -e "require('bcryptjs').hash('your-new-password', 10).then(h => console.log(h))"
```

Update `lib/auth.ts` with the new hash.

## 📈 Analytics

### Metrics Provided
- Total survey responses
- Technology familiarity percentages
- Programming concept awareness
- Project experience breakdown
- Learning goal distribution
- Per-participant detailed view

### Export Data
- View all raw data in JSON format
- Individual response download capability
- Statistics exportable via API

## ⚠️ Important Notes

1. **User Privacy**: Users cannot see any results, scores, or charts
2. **Admin Only**: Only admin (Addajabo) can access dashboard
3. **Data Persistence**: Local storage works for development; use database for production
4. **Beginner Friendly**: Language and questions assume zero programming knowledge
5. **No Scoring**: This is a survey, not an exam - no scores or levels

## 🚨 Troubleshooting

### Build Fails
```bash
npm install
npm run build
```

### Admin Login Not Working
- Check username is exactly: `Addajabo` (case-sensitive)
- Check password: `admin123`
- Clear browser cache
- Check console for errors

### Survey Not Saving
- Ensure `data/` directory was created
- Check write permissions
- Verify API response in browser Network tab

### Charts Not Showing
- Ensure at least one survey submitted
- Refresh page (Ctrl+F5)
- Check browser console for errors

## 📚 Documentation

- **QUICKSTART.md** - Get running in 2 minutes
- **SETUP.md** - Complete setup and customization guide
- **DEPLOYMENT.md** - Production deployment instructions

## 📞 Support

For issues:
1. Check the relevant documentation file
2. Review error messages in browser console
3. Check API responses in Network tab
4. Ensure environment variables are set

## 📄 License

MIT - Free to use and modify

## 🎯 Next Steps

1. **Run locally**: `npm run dev`
2. **Test survey**: Fill out as user
3. **Admin access**: Login with Addajabo/admin123
4. **Review dashboard**: View responses and charts
5. **Customize**: Modify questions or colors as needed
6. **Deploy**: Push to Vercel for production

---

**Built with ❤️ for beginners learning about software development**

Complete, working, production-ready survey application.
Ready to deploy to Vercel or any Node.js hosting.
