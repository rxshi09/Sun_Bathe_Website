import app, { connectDB } from './api/index.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to DB on startup
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`
  ✅ Local Backend running at: http://localhost:${PORT}
  🚀 Frontend running at: http://localhost:5173
  `);
  });
}).catch((err) => {
  console.error("Failed to start server due to DB connection issues:", err);
  process.exit(1);
});