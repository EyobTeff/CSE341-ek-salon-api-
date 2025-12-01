const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'EK Salon API',
    description: 'API for managing salon customers, appointments, services, and barbers'
  },
  host: process.env.SWAGGER_HOST || 'localhost:8080',
  schemes: ['http', 'https'],
  definitions: {
    Appointment: {
      $customerId: '674b8a1234567890abcdef01',
      $barberId: '674b8a1234567890abcdef02',
      $serviceId: '674b8a1234567890abcdef03',
      $appointmentDate: '2025-12-05T10:00:00.000Z',
      status: 'scheduled',
      notes: 'Customer prefers morning appointments'
    },
    AppointmentResponse: {
      _id: '692cff00b29f0372734fd0d5',
      customerId: '674b8a1234567890abcdef01',
      barberId: '674b8a1234567890abcdef02',
      serviceId: '674b8a1234567890abcdef03',
      appointmentDate: '2025-12-05T10:00:00.000Z',
      status: 'scheduled',
      notes: 'Customer prefers morning appointments',
      createdAt: '2025-11-30T08:00:00.000Z',
      updatedAt: '2025-11-30T08:00:00.000Z'
    },
    Barber: {
      $name: 'John Smith',
      $email: 'john.smith@eksalon.com',
      $phone: '+1-555-0101',
      specialties: ['haircut', 'beard trim', 'shaving'],
      schedule: {
        monday: '9:00-17:00',
        tuesday: '9:00-17:00',
        wednesday: '9:00-17:00',
        thursday: '9:00-17:00',
        friday: '9:00-17:00',
        saturday: '10:00-16:00'
      },
      isActive: true
    },
    BarberResponse: {
      _id: '692cff3cb29f0372734fd0da',
      name: 'John Smith',
      email: 'john.smith@eksalon.com',
      phone: '+1-555-0101',
      specialties: ['haircut', 'beard trim', 'shaving'],
      schedule: {
        monday: '9:00-17:00',
        tuesday: '9:00-17:00',
        wednesday: '9:00-17:00',
        thursday: '9:00-17:00',
        friday: '9:00-17:00',
        saturday: '10:00-16:00'
      },
      isActive: true,
      createdAt: '2025-11-30T08:00:00.000Z',
      updatedAt: '2025-11-30T08:00:00.000Z'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('swagger.json generated');
});
