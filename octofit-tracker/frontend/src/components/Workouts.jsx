import React, { useEffect, useState } from 'react';

export default function Workouts({ apiBase }) {
  // Codespaces preview endpoint example:
  // https://$CODESPACE_NAME-8000.app.github.dev/api/workouts
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    async function load() {
      const codespaceUrl = 'https://$CODESPACE_NAME-8000.app.github.dev/api/workouts';
      const url = apiBase ? `${apiBase}/api/workouts/` : codespaceUrl;
      const res = await fetch(url);
      const data = await res.json();
      setWorkouts(data.workouts || data);
    }
    load();
  }, [apiBase]);

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((w) => (
          <li key={w._id}>{w.name} — exercises: {(w.exercises || []).length}</li>
        ))}
      </ul>
    </div>
  );
}
