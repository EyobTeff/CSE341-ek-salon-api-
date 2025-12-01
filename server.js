const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/appointments', require('./routes/appointments'));
app.use('/barbers', require('./routes/barbers'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
try {
  const swaggerFile = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));
  
  // Update host based on environment
  if (process.env.RENDER_EXTERNAL_URL) {
    const renderUrl = new URL(process.env.RENDER_EXTERNAL_URL);
    swaggerFile.host = renderUrl.host;
    swaggerFile.schemes = [renderUrl.protocol.replace(':', '')];
  } else if (process.env.NODE_ENV === 'production') {
    // For other production deployments
    swaggerFile.schemes = ['https'];
  }
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
} catch (e) {
  console.warn('swagger.json not found. Run `npm run swagger` to generate it.');
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`EK Salon API running on port ${port}`));
