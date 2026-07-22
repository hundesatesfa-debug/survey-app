# API Documentation

## Overview

The Survey Application provides RESTful API endpoints for survey submission, authentication, and statistics retrieval.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://yourdomain.com/api`

## Authentication

Admin endpoints use token-based authentication via localStorage. After successful login, a token is stored and can be used for subsequent requests.

---

## Endpoints

### 1. Submit Survey

**POST** `/api/surveys`

Submit a completed survey from a user.

#### Request Body

```json
{
  "name": "John Doe",
  "technologies": ["HTML", "CSS", "JavaScript"],
  "technologyFamiliarity": {
    "HTML": "I have used it to build something",
    "CSS": "I have followed a tutorial using it",
    "JavaScript": "I have read a little about it"
  },
  "programmingTerms": {
    "Programming": "Yes",
    "Code": "Yes",
    "Software": "I'm not sure",
    "Application/App": "No"
  },
  "basicTerms": {
    "Variable": "Yes",
    "Loop": "No",
    "Function": "I'm not sure"
  },
  "webDevelopment": {
    "HTML": "Yes",
    "CSS": "Yes",
    "JavaScript": "Yes",
    "Frontend": "No"
  },
  "developmentTools": ["VS Code", "GitHub"],
  "toolsFamiliarity": {
    "used": "Yes"
  },
  "projectExperience": "Yes, I tried programming",
  "projectTypes": ["Website", "Calculator"],
  "learningGoals": ["Web development", "Programming"]
}
```

#### Response (Success)

```json
{
  "success": true,
  "id": "1234567890ab"
}
```

**Status**: `201 Created`

#### Response (Error)

```json
{
  "error": "Failed to save survey"
}
```

**Status**: `500 Internal Server Error`

---

### 2. Get All Surveys

**GET** `/api/surveys`

Retrieve all submitted surveys.

#### Response

```json
[
  {
    "id": "1234567890ab",
    "name": "John Doe",
    "submittedAt": "2024-01-15T10:30:00Z",
    "technologies": ["HTML", "CSS", "JavaScript"],
    "technologyFamiliarity": { ... },
    "programmingTerms": { ... },
    "basicTerms": { ... },
    "webDevelopment": { ... },
    "developmentTools": ["VS Code"],
    "toolsFamiliarity": { ... },
    "projectExperience": "Yes, I tried programming",
    "projectTypes": ["Website"],
    "learningGoals": ["Web development"]
  }
]
```

**Status**: `200 OK`

---

### 3. Admin Login

**POST** `/api/admin/login`

Authenticate admin user and receive token.

#### Request Body

```json
{
  "username": "Addajabo",
  "password": "admin123"
}
```

#### Response (Success)

```json
{
  "success": true,
  "token": "QWRkYWphYm86MTczNDU2Nzg5MA=="
}
```

**Status**: `200 OK`

#### Response (Error)

```json
{
  "error": "Invalid credentials"
}
```

**Status**: `401 Unauthorized`

#### Notes

- Token is automatically set in HttpOnly cookie
- Token expires after 1 hour
- Use token for subsequent admin requests

---

### 4. Get Statistics

**GET** `/api/admin/stats`

Retrieve aggregated survey statistics.

#### Response

```json
{
  "totalParticipants": 125,
  "technologyAwareness": {
    "HTML": 85,
    "CSS": 78,
    "JavaScript": 72,
    "Python": 65,
    "Java": 45,
    "C++": 38,
    "C": 35,
    "C#": 32,
    "PHP": 28,
    "SQL": 62,
    "Git": 58,
    "GitHub": 64,
    "React": 42,
    "Node.js": 38
  },
  "programmingConceptAwareness": {
    "Variables": 72,
    "Number": 65,
    "Text/String": 58,
    "True/False": 52,
    "Condition": 68,
    "If/Else": 65,
    "Loop": 62,
    "Function": 70,
    "Array/List": 48,
    "Object": 42,
    "Class": 35
  },
  "softwareDevelopmentAwareness": {
    "Programming": 88,
    "Frontend": 72,
    "Backend": 65,
    "Database": 62,
    "API": 58,
    "Server": 52,
    "Git": 64,
    "GitHub": 70,
    "Deployment": 45
  },
  "projectExperience": {
    "No project experience": 28,
    "Tried programming": 35,
    "Followed tutorials": 25,
    "Built projects independently": 12
  },
  "learningGoals": {
    "Programming": 45,
    "Web development": 58,
    "Mobile app development": 38,
    "Computer software development": 22,
    "Software engineering": 18,
    "Full-stack development": 28,
    "I'm not sure yet": 15
  }
}
```

**Status**: `200 OK`

#### Notes

- All values are percentages (0-100)
- Calculated from all survey responses
- Updates in real-time as surveys are submitted

---

## Data Structures

### Survey Object

```typescript
{
  id: string;                           // Unique identifier
  name: string;                         // Participant name
  submittedAt: string;                  // ISO timestamp
  technologies: string[];               // Array of selected techs
  technologyFamiliarity: {              // Familiarity per tech
    [key: string]: string;
  };
  programmingTerms: {                   // Yes/No/I'm not sure
    [key: string]: string;
  };
  basicTerms: {                         // Yes/No/I'm not sure
    [key: string]: string;
  };
  webDevelopment: {                     // Yes/No/I'm not sure
    [key: string]: string;
  };
  developmentTools: string[];           // Selected tools
  toolsFamiliarity: {                   // Tools usage
    [key: string]: string;
  };
  projectExperience: string;            // Experience level
  projectTypes: string[];               // Projects attempted
  learningGoals: string[];              // Learning interests
}
```

### Stats Object

```typescript
{
  totalParticipants: number;
  technologyAwareness: {
    [key: string]: number;              // Percentage 0-100
  };
  programmingConceptAwareness: {
    [key: string]: number;              // Percentage 0-100
  };
  softwareDevelopmentAwareness: {
    [key: string]: number;              // Percentage 0-100
  };
  projectExperience: {
    [key: string]: number;              // Percentage 0-100
  };
  learningGoals: {
    [key: string]: number;              // Percentage 0-100
  };
}
```

---

## Error Handling

### Common Status Codes

| Status | Meaning |
|--------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Not found |
| 500 | Server error |

### Error Response Format

```json
{
  "error": "Description of error"
}
```

---

## Rate Limiting

No rate limiting in current implementation. For production deployment, consider adding:

- Rate limiting middleware
- Request throttling
- IP-based blocking

---

## CORS

Currently configured for same-origin requests. To enable CORS:

```typescript
// In API routes
response.headers.set('Access-Control-Allow-Origin', '*');
```

---

## Authentication Flow

### Login Flow

```
1. POST /api/admin/login
   ├─ Submit: { username, password }
   └─ Receive: { token }

2. Store token in localStorage
3. Token automatically used for subsequent requests
4. Token expires after 1 hour
5. Login again when token expires
```

### Protected Endpoints

Currently, GET `/api/admin/stats` is not protected. To add protection:

```typescript
// Check for token in request headers
const token = request.headers.get('Authorization');
if (!token) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

---

## Examples

### Submit Survey (cURL)

```bash
curl -X POST http://localhost:3000/api/surveys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "technologies": ["HTML", "CSS"],
    "technologyFamiliarity": {
      "HTML": "I have used it to build something"
    },
    ...
  }'
```

### Get Surveys (JavaScript)

```javascript
fetch('/api/surveys')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Admin Login (JavaScript)

```javascript
fetch('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'Addajabo',
    password: 'admin123'
  })
})
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('adminToken', data.token);
  });
```

### Get Statistics (JavaScript)

```javascript
fetch('/api/admin/stats')
  .then(res => res.json())
  .then(stats => console.log(stats));
```

---

## Future Enhancements

- [ ] JWT tokens instead of simple tokens
- [ ] Token refresh mechanism
- [ ] Request validation middleware
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] API versioning (v1, v2)
- [ ] Export data as CSV
- [ ] Webhook notifications
- [ ] Analytics tracking

---

## Implementation Notes

### Database Abstraction

The API is designed to work with different databases. Currently using file-based storage. To change:

1. Update `lib/db.ts` functions
2. Use PostgreSQL, MongoDB, etc.
3. Keep the same return types
4. API endpoints remain unchanged

### Scalability

For production:
- Use connection pooling
- Cache statistics (redis)
- Implement pagination
- Add database indexes
- Monitor query performance

---

## API Health Check

No dedicated health check endpoint. Add one if needed:

```typescript
// GET /api/health
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
```

---

Last Updated: 2024
API Version: 1.0
