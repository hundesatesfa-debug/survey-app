# Deployment Guide

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Building for Production

```bash
npm run build
npm run start
```

## Deploy to Vercel (Recommended)

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Import to Vercel
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### Step 3: Configure Environment Variables (if using cloud database)
In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add your database connection string:
   ```
   DATABASE_URL=postgresql://...
   DATABASE_NAME=survey_db
   ```

### Step 4: Deploy
Click "Deploy" - that's it!

## Data Storage Options

### Option 1: Local File Storage (Current Setup)
- **Best for**: Development, small deployments
- **How**: Data stored in `data/surveys.json`
- **Problem on Vercel**: Files are ephemeral - data lost on redeploy
- **Solution**: Use Option 2 or 3 for production

### Option 2: PostgreSQL (Recommended for Vercel)

**Setup:**
1. Create a PostgreSQL database (Vercel Postgres, Supabase, etc.)
2. Update `lib/db.ts` to use PostgreSQL
3. Set environment variable: `DATABASE_URL=postgresql://...`

**Update `lib/db.ts`:**
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function saveSurvey(survey: SurveyData): Promise<void> {
  const query = `
    INSERT INTO surveys (id, name, data, submitted_at)
    VALUES ($1, $2, $3, $4)
  `;
  await pool.query(query, [
    survey.id,
    survey.name,
    JSON.stringify(survey),
    survey.submittedAt,
  ]);
}

export async function getAllSurveys(): Promise<SurveyData[]> {
  const result = await pool.query('SELECT data FROM surveys');
  return result.rows.map(row => JSON.parse(row.data));
}
```

### Option 3: MongoDB (Alternative)

**Setup:**
1. Create MongoDB database (MongoDB Atlas, etc.)
2. Update `lib/db.ts` to use MongoDB driver
3. Set environment variable: `MONGODB_URI=mongodb+srv://...`

**Example:**
```typescript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db('survey_app');
const surveysCollection = db.collection('surveys');

export async function saveSurvey(survey: SurveyData): Promise<void> {
  await surveysCollection.insertOne(survey);
}

export async function getAllSurveys(): Promise<SurveyData[]> {
  return await surveysCollection.find({}).toArray();
}
```

### Option 4: Supabase (PostgreSQL + Auth)

Easy PostgreSQL setup with built-in features.

**Setup:**
1. Create account at https://supabase.com
2. Create new project
3. Get connection string
4. Update `lib/db.ts` for PostgreSQL
5. Set `DATABASE_URL` environment variable

## Vercel-Specific Configuration

### Environment Variables
```env
# If using database
DATABASE_URL=postgresql://user:password@host/database
MONGODB_URI=mongodb+srv://...

# Admin credentials (optional - can use defaults)
ADMIN_USERNAME=Addajabo
ADMIN_PASSWORD_HASH=$2a$10$...
```

### Persistent Folder (for local development)
The `data/` folder is used for local development only. On Vercel, use a database instead.

### API Routes
All API routes are automatically deployed:
- `/api/surveys` - POST/GET survey data
- `/api/admin/login` - POST authentication
- `/api/admin/stats` - GET statistics

## Migration from Local to Cloud Database

1. Export current data from `data/surveys.json`
2. Import into your cloud database
3. Update `lib/db.ts`
4. Deploy to Vercel

## Performance Optimization

### For Vercel
- Edge functions are used automatically
- Automatic image optimization
- Static site generation for pages
- API routes are serverless functions

### Database Optimization
- Add indexes on frequently queried columns
- Use connection pooling for database
- Cache statistics responses

## Monitoring

### Vercel Analytics
1. Enable in Vercel Dashboard
2. View performance metrics
3. Monitor API usage

### Logs
View real-time logs in Vercel Dashboard:
1. Project Settings → Logs
2. Filter by Function (API routes)
3. Search by timestamp or error message

## Backup Strategy

### Automatic
- Version control (GitHub) as backup
- Database provider's automatic backups

### Manual
```bash
# Export data from PostgreSQL
pg_dump DATABASE_URL > survey_backup.sql

# Export data from MongoDB
mongodump --uri "MONGODB_URI" --out ./backup

# Export from Vercel filesystem
# Download surveys.json from your repository
```

## Cost Estimation

### Vercel Hosting
- Hobby plan: Free (with limits)
- Pro plan: $20/month (scale as needed)

### Databases
- PostgreSQL (Vercel): $15/month (dev), $50+ (production)
- MongoDB Atlas: Free tier or pay-as-you-go
- Supabase: Free tier or $25+/month

## Security Checklist

- [ ] Change default admin password
- [ ] Use HTTPS (automatic on Vercel)
- [ ] Set strong database password
- [ ] Limit database access by IP (if available)
- [ ] Use environment variables for secrets
- [ ] Enable 2FA on GitHub and Vercel
- [ ] Regular backups of survey data
- [ ] Monitor admin login attempts
- [ ] Keep dependencies updated

## Scaling Considerations

### Current Setup
- Supports 1,000+ surveys locally
- Instant response times
- No database scaling issues

### After Cloud Database
- Can handle unlimited surveys
- Add database indexes for performance
- Use caching for statistics
- Consider CDN for static assets

## Troubleshooting Deployment

### 502 Bad Gateway
- Check API routes for errors
- Verify environment variables set
- Check database connection

### 404 Not Found
- Verify file paths are correct
- Check route configuration
- Ensure build completed successfully

### Database Connection Issues
- Verify connection string is correct
- Check IP whitelist settings
- Ensure database is running

## Next Steps

1. Choose your database (PostgreSQL recommended)
2. Update `lib/db.ts` with database code
3. Set environment variables in Vercel
4. Deploy and test
5. Monitor in Vercel Dashboard

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- PostgreSQL Docs: https://www.postgresql.org/docs/
- MongoDB Docs: https://docs.mongodb.com/
