const request = require('supertest');
const { ObjectId } = require('mongodb');

let app;
let server;

beforeAll(async () => {
  // Load environment variables
  require('dotenv').config();
  
  // Import app
  const appModule = require('../server');
  app = appModule.app;
  server = appModule.server;
  
  // Wait for server to be ready
  await new Promise(resolve => setTimeout(resolve, 1000));
});

afterAll(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
});

describe('Appointments API', () => {
  let appointmentId;

  describe('GET /appointments', () => {
    it('should return all appointments', async () => {
      const res = await request(app).get('/appointments');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /appointments (protected)', () => {
    it('should return 401 without authentication', async () => {
      const newAppointment = {
        customerId: new ObjectId().toString(),
        barberId: new ObjectId().toString(),
        serviceId: new ObjectId().toString(),
        appointmentDate: '2025-12-20T10:00:00.000Z',
        status: 'scheduled',
        notes: 'Test appointment'
      };

      const res = await request(app)
        .post('/appointments')
        .send(newAppointment);
      
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toContain('Unauthorized');
    });
  });

  describe('GET /appointments/:id', () => {
    it('should return 404 for non-existent appointment', async () => {
      const fakeId = new ObjectId().toString();
      const res = await request(app).get(`/appointments/${fakeId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});

describe('Barbers API', () => {
  describe('GET /barbers', () => {
    it('should return all barbers', async () => {
      const res = await request(app).get('/barbers');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /barbers (protected)', () => {
    it('should return 401 without authentication', async () => {
      const newBarber = {
        name: 'Test Barber',
        email: 'test@test.com',
        phone: '+1-555-9999',
        specialties: ['haircut'],
        isActive: true
      };

      const res = await request(app)
        .post('/barbers')
        .send(newBarber);
      
      expect(res.statusCode).toBe(401);
    });
  });
});

describe('Customers API', () => {
  describe('GET /customers', () => {
    it('should return all customers', async () => {
      const res = await request(app).get('/customers');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /customers (protected)', () => {
    it('should return 401 without authentication', async () => {
      const newCustomer = {
        name: 'Test Customer',
        email: 'customer@test.com',
        phone: '+1-555-8888',
        address: '123 Test St'
      };

      const res = await request(app)
        .post('/customers')
        .send(newCustomer);
      
      expect(res.statusCode).toBe(401);
    });
  });

  describe('POST /customers with invalid data', () => {
    it('should return 400 for missing required fields', async () => {
      const invalidCustomer = {
        email: 'incomplete@test.com'
      };

      const res = await request(app)
        .post('/customers')
        .send(invalidCustomer);
      
      expect(res.statusCode).toBe(400);
    });
  });
});

describe('Services API', () => {
  describe('GET /services', () => {
    it('should return all services', async () => {
      const res = await request(app).get('/services');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /services (protected)', () => {
    it('should return 401 without authentication', async () => {
      const newService = {
        name: 'Test Service',
        description: 'Test description',
        duration: 45,
        price: 30,
        isActive: true
      };

      const res = await request(app)
        .post('/services')
        .send(newService);
      
      expect(res.statusCode).toBe(401);
    });
  });
});

describe('Auth API', () => {
  describe('GET /auth/status', () => {
    it('should return authenticated: false when not logged in', async () => {
      const res = await request(app).get('/auth/status');
      expect(res.statusCode).toBe(200);
      expect(res.body.authenticated).toBe(false);
    });
  });
});
