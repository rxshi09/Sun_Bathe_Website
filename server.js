import app from './api/index.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`
  ✅ Local Backend running at: http://localhost:${PORT}
  🚀 Frontend running at: http://localhost:5173
  `);
});