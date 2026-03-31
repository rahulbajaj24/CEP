import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import volunteerRoutes from './routes/volunteer.js';
import { initMailer } from './utils/mailer.js';

const app = express();
const PORT = parseInt(process.env.PORT || '3002');

// Allowed frontend origins
const ALLOWED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

// Middleware
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    methods: ['GET', 'POST'],
  })
);
app.use(express.json());

// Routes
app.use('/api/volunteer', volunteerRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Connect to MongoDB and start server
async function start() {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (mongoUri) {
      // Production: MongoDB Atlas
      await mongoose.connect(mongoUri);
      console.log('📦 Connected to MongoDB Atlas');
    } else {
      // Development: In-memory MongoDB
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      await mongoose.connect(mongod.getUri());
      console.log('📦 Connected to in-memory MongoDB (dev mode)');
    }

    await initMailer();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🤝 Volunteer API server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

start();
