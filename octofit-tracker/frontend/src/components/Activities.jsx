import React, { useEffect, useState } from 'react';

export default function Activities({ apiBase }) {
  // Codespaces preview endpoint example:
  // https://$CODESPACE_NAME-8000.app.github.dev/api/activities
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function load() {
      const codespaceUrl = 'https://$CODESPACE_NAME-8000.app.github.dev/api/activities';
      const url = apiBase ? `${apiBase}/api/activities/` : codespaceUrl;
      const res = await fetch(url);
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
