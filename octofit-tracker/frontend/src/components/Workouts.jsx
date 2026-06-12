import React, { useEffect, useState } from 'react';

export default function Workouts({ apiBase }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${apiBase}/api/workouts/`);
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
