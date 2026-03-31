import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import volunteerRoutes from './routes/volunteer.js';
import { initMailer } from './utils/mailer.js';

const app = express();
const PORT = 3002;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:8080',
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

// Connect to in-memory MongoDB and start server
async function start() {
  try {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri);
    console.log('📦 Connected to in-memory MongoDB');

    await initMailer();

    app.listen(PORT, () => {
      console.log(`🤝 Volunteer API server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

start();
