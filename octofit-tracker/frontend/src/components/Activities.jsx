import React, { useEffect, useState } from 'react';

export default function Activities({ apiBase }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${apiBase}/api/activities/`);
      const data = await res.json();
      setActivities(data.activities || data);
    }
    load();
  }, [apiBase]);

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map((a) => (
          <li key={a._id}>{a.type} — {a.durationMinutes} mins</li>
        ))}
      </ul>
    </div>
  );
}
