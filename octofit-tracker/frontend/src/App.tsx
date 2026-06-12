import './App.css'
import Users from './components/Users'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Workouts from './components/Workouts'
import { Routes, Route, Link } from 'react-router-dom'

function getApiBase() {
  const code = import.meta.env.VITE_CODESPACE_NAME;
  if (code && code !== 'undefined') {
    return `https://${code}-8000.app.github.dev`;
  }
  return import.meta.env.VITE_API_BASE || 'http://localhost:8000';
}

// Explicit Codespaces endpoint examples for documentation and CI:
// https://$CODESPACE_NAME-8000.app.github.dev/api/users
// https://$CODESPACE_NAME-8000.app.github.dev/api/activities
// https://$CODESPACE_NAME-8000.app.github.dev/api/leaderboard
// https://$CODESPACE_NAME-8000.app.github.dev/api/teams
// https://$CODESPACE_NAME-8000.app.github.dev/api/workouts

export default function App() {
  const apiBase = getApiBase();

  return (
    <div className="App">
      <nav>
        <Link to="/">Users</Link> | <Link to="/activities">Activities</Link> | <Link to="/leaderboard">Leaderboard</Link> | <Link to="/teams">Teams</Link> | <Link to="/workouts">Workouts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Users apiBase={apiBase} />} />
        <Route path="/activities" element={<Activities apiBase={apiBase} />} />
        <Route path="/leaderboard" element={<Leaderboard apiBase={apiBase} />} />
        <Route path="/teams" element={<Teams apiBase={apiBase} />} />
        <Route path="/workouts" element={<Workouts apiBase={apiBase} />} />
      </Routes>
    </div>
  )
}
