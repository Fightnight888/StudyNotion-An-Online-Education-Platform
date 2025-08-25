[![Releases](https://img.shields.io/badge/Releases-Open-blue?logo=github)](https://github.com/Fightnight888/StudyNotion-An-Online-Education-Platform/releases)  
https://github.com/Fightnight888/StudyNotion-An-Online-Education-Platform/releases

# StudyNotion — MERN EdTech Platform: Build, Learn, Scale Fast 🚀

![Hero image](https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80)

A modular MERN stack learning platform. Users sign up, buy or enroll in courses, track progress, and leave ratings. The app uses JWT and OTP for auth, Razorpay for payments, and MongoDB for data. The code aims for clarity, testability, and easy deployment.

Badges
- ![License](https://img.shields.io/badge/License-MIT-green)
- ![Stack](https://img.shields.io/badge/Stack-MERN-yellow)
- ![Releases](https://img.shields.io/badge/Download-Releases-blue) — see the Releases link above and download the release file to run in your environment.

Features ✨
- User auth with JWT and OTP-based verification.
- Role-based access: student, instructor, admin.
- Course management: create, edit, publish, archive.
- Video and document content hosting.
- Progress tracking per course and per lesson.
- Course rating and reviews.
- Razorpay integration for secure payments.
- REST API with clear routes and middleware.
- File uploads and CDN-ready assets.
- Unit tests for core services.

Tech stack 🧩
- Frontend: React (hooks, functional components), React Router, Context API.
- Backend: Node.js, Express.js, RESTful API.
- Database: MongoDB with Mongoose for schemas.
- Auth: JWT for session tokens, OTP via SMS/email flows.
- Payments: Razorpay server-side integration and client-side checkout.
- Dev tools: dotenv, ESLint, Prettier, nodemon.
- Optional: Docker for containerized deployment.

Repository layout (example)
- client/ — React app
  - src/components — UI pieces
  - src/pages — routes and pages
  - src/services — API wrappers
  - public — static assets
- server/ — Node + Express
  - controllers/ — request handlers
  - models/ — Mongoose schemas
  - routes/ — Express routes
  - middlewares/ — auth, error handling
  - utils/ — helpers, payment adapters
- scripts/ — deployment and helper scripts
- .env.example — environment template
- README.md — this file

Quick start (local dev) 🛠️
1. Clone the repo and install dependencies.
2. Create `.env` in the server folder with keys listed below.
3. Start MongoDB locally or use a cloud instance.
4. Run server and client.

Example commands
- Install server deps: `cd server && npm install`
- Install client deps: `cd client && npm install`
- Start dev server: `cd server && npm run dev`
- Start React app: `cd client && npm start`

Environment variables (server/.env)
- PORT=4000
- MONGO_URI=mongodb://localhost:27017/studynotion
- JWT_SECRET=replace_with_secure_string
- JWT_EXPIRES_IN=7d
- RAZORPAY_KEY_ID=your_key_id
- RAZORPAY_KEY_SECRET=your_key_secret
- OTP_SECRET=replace_with_otp_secret
- SMTP_HOST=smtp.example.com
- SMTP_PORT=587
- SMTP_USER=you@example.com
- SMTP_PASS=your_smtp_password

Authentication flows
- Signup: Collect email, password, role. Send OTP to verify.
- Login: Verify password, return JWT.
- OTP: One-time code for signup and sensitive ops.
- Protect routes with `auth` middleware. Use `roleCheck` middleware for admin/instructor routes.

API surface (examples)
- POST /api/auth/signup — create account, send OTP.
- POST /api/auth/verify-otp — verify OTP, activate account.
- POST /api/auth/login — return JWT.
- GET /api/courses — list public courses.
- POST /api/courses — create course (instructor).
- GET /api/courses/:id — course detail, lessons.
- POST /api/courses/:id/review — submit rating.
- POST /api/payments/create-order — create Razorpay order.
- POST /api/payments/verify — verify payment signature.

Database design (high level)
- Users: { name, email, passwordHash, role, verified, createdAt }
- Courses: { title, description, price, instructorId, published, tags, rating, lessons[] }
- Lessons: { title, type, contentUrl, duration, order }
- Enrollments: { userId, courseId, progress, startedAt, completedAt }
- Payments: { userId, orderId, paymentId, amount, status, createdAt }

Payments: Razorpay integration
- Server creates an order with Razorpay SDK and returns order details to client.
- Client opens Razorpay Checkout with order info.
- On payment success, client POSTs signature and payment details to `payments/verify`.
- Server verifies signature with secret and marks enrollment as paid.
- Keep secrets in `.env`. Do not store raw card data on the server.

Uploads and media
- Use cloud storage (S3, Cloudinary) for large media.
- Server accepts signed upload URLs or streams from client.
- Serve optimized images and videos to improve load times.
- Store original file metadata in MongoDB.

Security and best practices
- Hash passwords with bcrypt.
- Use short-lived JWTs and refresh tokens when needed.
- Validate all incoming data with Joi or express-validator.
- Sanitize inputs to prevent injections.
- Rate limit auth routes to reduce abuse.
- Store secrets in environment variables or secret manager.
- Use HTTPS in production.

Testing
- Unit tests for controllers and utilities.
- Integration tests for key endpoints.
- Sample commands: `npm run test` (server) and `npm run test` (client).

Docker
- Provide Dockerfile for server and client.
- Provide docker-compose to run app and MongoDB.
- Example: `docker-compose up --build` will start services.

CI/CD
- Use GitHub Actions or similar to run lint, tests, and build on push.
- Build Docker images on release tags.
- Deploy to provider of your choice (DigitalOcean, AWS, Heroku).

Releases and distribution
- Download compiled releases from the Releases page:
  https://github.com/Fightnight888/StudyNotion-An-Online-Education-Platform/releases
- The Releases page contains packaged server builds and optional client bundles. Download the release asset that matches your environment. Execute or deploy the included files per included instructions in the release notes. If you have a Linux binary or `studynotion.tar.gz` file, extract and run the startup script or use the provided Docker images.

Demo and screenshots
- Add client demo URL here when available.
- Screenshots:
  - Dashboard: clean metrics and course list.
  - Course editor: add lessons, reorder.
  - Checkout: Razorpay checkout in action.
  - Student view: progress bar and lesson playback.

Contributing 🤝
- Fork the repo.
- Create a branch per feature: `feature/your-feature`.
- Write tests for new features.
- Open a PR with a clear description and test results.
- Follow code style: ESLint + Prettier.
- Keep commits small and focused.

Code style
- Use ES6 modules and arrow functions.
- Keep functions small and single-purpose.
- Use descriptive names for variables and functions.
- Document API routes with OpenAPI or Postman.

Common tasks
- Reset DB: run seed script at `scripts/seed.js`.
- Create admin: run `node scripts/createAdmin.js`.
- Rebuild client: `cd client && npm run build`.
- Run production server: `NODE_ENV=production node server/dist/index.js`.

Troubleshooting
- If the server fails to connect to MongoDB, confirm `MONGO_URI` and network access.
- If payments fail, verify Razorpay keys and that the order currency and amount match.
- If media uploads fail, check storage credentials and CORS rules.

License
- MIT License. See LICENSE file.

Contact
- Open an issue for bug reports or feature requests.
- Use PRs for code contributions.
- For private collaboration, open an issue and request contact details.

Releases quick link
[![Download Releases](https://img.shields.io/badge/Get%20Release-Download-blue?logo=github)](https://github.com/Fightnight888/StudyNotion-An-Online-Education-Platform/releases)

This README aims to be a practical, hands-on guide. Follow the instructions in the Releases page to grab compiled assets and run them in your environment.