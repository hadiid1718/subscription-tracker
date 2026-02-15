# Subdub - Subscription Tracker API

A Production Level Express.js API for managing user subscriptions with authentication, security, and database persistence using MongoDB.

## 🎯 Features

- **User Authentication:** JWT-based authentication with bcryptjs password hashing
- **Subscription Management:** Create, read, update, and delete subscriptions
- **User Management:** User profile management and operations
- **Security:** Arcjet-powered security middleware for DDoS and bot protection
- **Database:** MongoDB with Mongoose ODM for reliable data persistence
- **Error Handling:** Centralized error handling middleware
- **Development Tools:** nodemon for auto-reload during development

## 📋 Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- MongoDB v4.4 or higher (local or cloud)
- Git

## 🚀 Quick Start

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd subscription-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/subdub
JWT_SECRET=your_jwt_secret_key
ARCJET_KEY=your_arcjet_key
NODE_ENV=development
```

### Running the Application

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

**Run Tests:**
```bash
npm test
```

The API will be available at `http://localhost:3000`

## 📁 Project Structure

```
subscription-tracker/
├── app.js                          # Main application entry point
├── test.js                         # Test suite
├── package.json                    # Dependencies and scripts
├── eslint.config.js               # ESLint configuration
├── config/
│   ├── env.js                     # Environment configuration
│   └── arcjet.js                  # Arcjet security configuration
├── controllers/
│   ├── auth.controller.js         # Authentication logic
│   ├── user.controller.js         # User management logic
│   └── subscription.controller.js # Subscription logic
├── routes/
│   ├── auth.router.js            # Authentication routes
│   ├── user.router.js            # User routes
│   └── subcription.router.js     # Subscription routes
├── models/
│   ├── user.model.js             # User database schema
│   └── subscription.model.js     # Subscription database schema
├── middlewares/
│   ├── auth.middlewar.js         # JWT authentication middleware
│   ├── arcjet.middleware.js      # Security middleware
│   └── error.middleware.js       # Error handling middleware
└── database/
    └── mongodb.js                 # MongoDB connection setup
```

## 🔌 API Endpoints

### Authentication Routes (`/api/v1/auth`)
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout

### User Routes (`/api/v1/users`)
- `GET /api/v1/users` - Get all users (admin only)
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user profile
- `DELETE /api/v1/users/:id` - Delete user account

### Subscription Routes (`/api/v1/subscriptions`)
- `GET /api/v1/subscriptions` - Get all subscriptions for logged-in user
- `POST /api/v1/subscriptions` - Create a new subscription
- `GET /api/v1/subscriptions/:id` - Get subscription by ID
- `PUT /api/v1/subscriptions/:id` - Update subscription
- `DELETE /api/v1/subscriptions/:id` - Delete subscription

### Health Check
- `GET /` - API health check endpoint

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer < token >
```

Tokens are issued during login and should be stored securely in your client application.

## 🛡️ Security Features

- **Arcjet Security:** DDoS and bot protection
- **Password Hashing:** bcryptjs for secure password storage
- **JWT Tokens:** Secure token-based authentication
- **Cookie Parser:** Secure cookie handling
- **Error Handling:** Prevents information leakage through error messages

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **@arcjet/node** - Security middleware
- **dotenv** - Environment variable management
- **morgan** - HTTP request logger
- **cookie-parser** - Cookie middleware

## 🛠️ Development Dependencies

- **nodemon** - Auto-reload on file changes
- **eslint** - Code linting
- **@eslint/js** - ESLint JavaScript support

## 🧪 Testing

Tests are run via the CI/CD pipeline on every push to the main branch. Run tests locally:

```bash
npm test
```

The test suite validates:
- API endpoint availability
- Database connectivity
- Authentication mechanisms
- Error handling
- Core functionality

## 📊 CI/CD Pipeline

The project uses GitHub Actions for continuous integration:

1. **Checkout Code** - Clones the repository
2. **Setup Node.js** - Configures Node.js 18
3. **Install Dependencies** - Installs npm packages
4. **Run Tests** - Executes the test suite
5. **Deploy** (optional) - Deploys to production

Pipeline runs automatically on every push to the `main` branch.

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` is correct
- Verify MongoDB credentials and network access

### JWT Token Errors
- Ensure `JWT_SECRET` is configured in `.env`
- Check token expiration
- Verify Authorization header format

### Arcjet Security Blocks
- Ensure `ARCJET_KEY` is configured
- Check request rate limits
- Review Arcjet dashboard for blocked requests

## 📝 Environment Variables

```
PORT                    - Server port (default: 3000)
MONGODB_URI            - MongoDB connection string
JWT_SECRET             - Secret key for JWT signing
ARCJET_KEY             - API key for Arcjet security service
NODE_ENV               - Environment (development/production)
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add new feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

## 📧 Support

For issues, questions, or contributions, please open an issue in the repository.

---

**Last Updated:** February 2026

