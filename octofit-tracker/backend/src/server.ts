import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

const app = express();
app.use(express.json());

// Codespaces-aware API URL support
// If running in Codespaces, `CODESPACE_NAME` will be set. Build a preview URL
// so frontend/CORS can interact with the backend through the forwarded port.
const codespace = process.env.CODESPACE_NAME;
let apiUrl = `http://localhost:${PORT}`;
if (codespace) {
  // Use Codespaces app preview domain with port embedded as requested
  apiUrl = `https://${codespace}-${PORT}.app.github.dev`;
}

// Configure CORS to allow either localhost or the Codespaces preview URL
const corsOptions: cors.CorsOptions = {
  origin: [`http://localhost:5173`, apiUrl],
};

app.use(cors(corsOptions));

app.get('/health', (_req, res) => res.json({ status: 'ok', apiUrl }));

// Mount API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

async function start() {
  try {
    await connectDatabase();
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
      console.log(`API base URL: ${apiUrl}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
