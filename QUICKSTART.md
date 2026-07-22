# Quick Start Guide

## Running the Survey Website

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

### 3. Access the Survey
- **User Survey**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

## Admin Login

Use these credentials to log in:

| Field | Value |
|-------|-------|
| Username | `Addajabo` |
| Password | `admin123` |

## What's Included

### For Users
✓ Multi-step survey (8 sections)
✓ Clean, beginner-friendly interface
✓ No confusing jargon
✓ Confirmation message on submission
✓ No visible results or scores

### For Admins
✓ Secure login page
✓ Interactive dashboard with charts
✓ View all 125+ participants
✓ Click on any participant to see detailed responses
✓ Real-time statistics
✓ Technology awareness breakdown
✓ Programming concept knowledge
✓ Project experience data
✓ Learning goals analysis

## Survey Flow

The survey collects:
1. **Name** - Only personal information collected
2. **Technologies** - Which ones they've heard of
3. **Familiarity** - How well they know each technology
4. **Programming Terms** - Awareness of dev terminology
5. **Basic Concepts** - Understanding of programming basics
6. **Web Development** - Knowledge of web tech
7. **Development Tools** - Familiarity with IDEs and tools
8. **Project Experience** - Any coding projects they've tried
9. **Learning Goals** - What they want to learn next

## Key Features

### User Experience
- Progress bar shows completion status
- Simple Yes/No/"I'm not sure" options
- No coding required
- Mobile-friendly interface
- Data is collected, not scored
- No rankings or comparisons

### Admin Dashboard
- **Statistics Cards**: Total participants, unique responses, last submission
- **Technology Awareness Chart**: Shows % of users familiar with each tech
- **Project Experience Pie Chart**: Visual breakdown of experience levels
- **Programming Concepts Bar Chart**: Understanding of key concepts
- **Learning Goals Chart**: What users want to learn
- **Participants Table**: List all responses with quick view button
- **Detailed Responses**: Click any participant to see their full survey answers

## Database

Data is stored in `data/surveys.json` (auto-created).

For production (Vercel), configure a cloud database:
- PostgreSQL
- MongoDB
- Firebase
- Any REST API endpoint

Update `lib/db.ts` to use your preferred database.

## Build for Production

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables if using cloud database
4. Deploy!

The app will work immediately without additional configuration.

## Troubleshooting

**Admin login not working?**
- Ensure you're using exactly: `Addajabo` (case-sensitive)
- Password: `admin123`
- Check browser console for errors

**Survey not saving?**
- Check that `data/` directory was created
- Ensure write permissions in project directory
- Check browser console for API errors

**Charts not showing?**
- Ensure at least one survey has been submitted
- Refresh the page
- Check browser console

## Customization

### Change Admin Password
See `SETUP.md` for instructions

### Modify Questions
Edit files in `app/components/survey/` folder

### Change Colors
Update Tailwind classes in component files

### Add Questions
Add new step components and update `SurveyForm.tsx`

## Technology Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Charts and graphs
- **bcryptjs** - Password hashing
- **Node.js/File System** - Local data storage

## Next Steps

1. Run `npm run dev` to start
2. Visit http://localhost:3000
3. Fill out the survey as a user
4. Go to http://localhost:3000/admin/login
5. Log in with Addajabo / admin123
6. View your responses in the dashboard!

## Support

For issues or questions, check:
- `SETUP.md` for detailed configuration
- Component files in `app/components/` for customization
- `lib/db.ts` for database configuration
