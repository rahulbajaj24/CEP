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
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      // Allow exact matches from the allow-list
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      // Allow any Vercel preview deployment (*.vercel.app)
      if (/\.vercel\.app$/.test(origin)) return callback(null, true);
      callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
  })
);
app.use(express.json());

// MongoDB connection (reuses existing connection on Vercel warm starts)
let isDBConnected = false;
let isMailerReady = false;

async function connectDB() {
  if (isDBConnected) return;

  const mongoUri = process.env.MONGODB_URI;

  if (mongoUri) {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    console.log('📦 Connected to MongoDB Atlas');
  } else {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
    console.log('📦 Connected to in-memory MongoDB (dev mode)');
  }

  isDBConnected = true;
}

async function ensureMailer() {
  if (isMailerReady) return;
  await initMailer();
  isMailerReady = true;
}

// ⚡ Initialize DB + Mailer BEFORE routes (must be registered first!)
app.use(async (_req, _res, next) => {
  try {
    await ensureMailer();
  } catch (error) {
    console.error('Mailer init error:', error);
  }

  try {
    await connectDB();
  } catch (error) {
    console.error('DB connection error:', error);
  }

  next();
});

// Routes (AFTER init middleware)
app.use('/api/volunteer', volunteerRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
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

