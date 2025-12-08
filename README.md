# EK Salon API

A RESTful API for managing salon operations including appointments, barbers, customers, and services.

## Features

- ✅ Full CRUD operations for Appointments, Barbers, Customers, and Services
- 🔒 OAuth 2.0 authentication via GitHub (POST, PUT, DELETE protected)
- 📚 Swagger/OpenAPI documentation
- ✅ Automated testing with Jest
- 🗄️ MongoDB database
- 🚀 Deployed on Render

## Tech Stack

- Node.js & Express.js
- MongoDB (native driver)
- Passport.js (GitHub OAuth)
- express-validator
- Swagger UI
- Jest & Supertest

## Getting Started

### Prerequisites

- Node.js 14+ 
- MongoDB Atlas account
- GitHub OAuth App (for authentication)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/EyobTeff/CSE341-ek-salon-api-.git
cd ek-salon-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (use `.env.example` as template):
```env
MONGODB_URI=your_mongodb_connection_string
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
CALLBACK_URL=http://localhost:8080/auth/github/callback
SESSION_SECRET=your_random_secret
```

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:8080/auth/github/callback`
4. Copy Client ID and Client Secret to your `.env` file

### Running the Application

```bash
# Generate Swagger documentation
npm run swagger

# Start server
npm start

# Development mode with nodemon
npm run dev
```

Visit `http://localhost:8080/api-docs` for Swagger UI.

## Authentication

### Login Flow

1. Navigate to: `http://localhost:8080/auth/github`
2. Authorize with GitHub
3. You'll be redirected to Swagger UI (authenticated)

### Check Auth Status

```bash
GET /auth/status
```

### Logout

```bash
GET /auth/logout
```

### Protected Endpoints

All POST, PUT, and DELETE operations require authentication:
- `POST /appointments` ⚠️ Protected
- `PUT /appointments/:id` ⚠️ Protected
- `DELETE /appointments/:id` ⚠️ Protected
- (Same for /barbers, /customers, /services)

GET requests are public.

## API Endpoints

### Appointments
- `GET /appointments` - Get all appointments
- `GET /appointments/:id` - Get appointment by ID
- `POST /appointments` - Create appointment (auth required)
- `PUT /appointments/:id` - Update appointment (auth required)
- `DELETE /appointments/:id` - Delete appointment (auth required)

### Barbers
- `GET /barbers` - Get all barbers
- `GET /barbers/:id` - Get barber by ID
- `POST /barbers` - Create barber (auth required)
- `PUT /barbers/:id` - Update barber (auth required)
- `DELETE /barbers/:id` - Delete barber (auth required)

### Customers
- `GET /customers` - Get all customers
- `GET /customers/:id` - Get customer by ID
- `POST /customers` - Create customer (auth required)
- `PUT /customers/:id` - Update customer (auth required)
- `DELETE /customers/:id` - Delete customer (auth required)

### Services
- `GET /services` - Get all services
- `GET /services/:id` - Get service by ID
- `POST /services` - Create service (auth required)
- `PUT /services/:id` - Update service (auth required)
- `DELETE /services/:id` - Delete service (auth required)

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test

# Run tests in watch mode
npm run test:watch
```

Tests cover:
- All GET endpoints (public access)
- Authentication requirements for POST/PUT/DELETE
- Validation error handling
- 404 responses for non-existent resources

## Database Schema

### Appointment
```javascript
{
  customerId: ObjectId,
  barberId: ObjectId,
  serviceId: ObjectId,
  appointmentDate: Date,
  status: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Barber
```javascript
{
  name: String,
  email: String,
  phone: String,
  specialties: [String],
  schedule: Object,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Customer
```javascript
{
  name: String,
  email: String,
  phone: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Service
```javascript
{
  name: String,
  description: String,
  duration: Number, // minutes
  price: Number, // USD
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Render

The API is deployed at: `https://cse341-ek-salon-api.onrender.com`

For production deployment:
1. Set environment variables on Render dashboard
2. Update `CALLBACK_URL` to production URL
3. Push to GitHub (auto-deploys via Render)

## Project Structure

```
ek-salon-api/
├── __tests__/          # Jest test files
├── config/             # Database and Passport config
├── controllers/        # Route controllers
├── middleware/         # Custom middleware (auth)
├── models/             # MongoDB models
├── routes/             # Express routes
├── validation/         # Input validation schemas
├── .env.example        # Environment variables template
├── jest.config.js      # Jest configuration
├── package.json
├── server.js           # Main entry point
└── swagger.js          # Swagger generation script
```

## License

ISC
