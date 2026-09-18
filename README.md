A simple and secure Node.js Auth API using Supabase, Express & JWT.

### Live Repo
https://github.com/kaxaf/Auth-Api

### Features
- User Signup / Signin with Supabase Auth
- JWT Token Generation & Verification
- Protected Routes Middleware
- Secure Password Handling

### Tech Stack
- Node.js, Express.js
- Supabase Auth
- JSON Web Token (JWT)

### How to Run

1. Clone repo
```bash
git clone https://github.com/kaxaf/Auth-Api.git
cd Auth-Api
2. Install dependencies
npm install
3. Create .env file
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_jwt_secret
4. Run server
node server.js
### API Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `GET /api/protected` - Protected route (requires JWT)

### Author
*kaxaf*

```powershell
git add README.md
git commit -m "docs: add professional README"
git push


