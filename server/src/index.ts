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

// MongoDB connection (reuses existing connection on Vercel warm starts)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const mongoUri = process.env.MONGODB_URI;

  if (mongoUri) {
    await mongoose.connect(mongoUri);
    console.log('📦 Connected to MongoDB Atlas');
  } else {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
    console.log('📦 Connected to in-memory MongoDB (dev mode)');
  }

  await initMailer();
  isConnected = true;
}

// Initialize on every request (for Vercel serverless)
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('DB connection error:', error);
    next(error);
  }
});

// Local dev: start server normally
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🤝 Volunteer API server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  });
}

// Export for Vercel
export default app;
