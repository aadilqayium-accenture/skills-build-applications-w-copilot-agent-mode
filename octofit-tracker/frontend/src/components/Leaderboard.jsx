import React, { useEffect, useState } from 'react';

export default function Leaderboard({ apiBase }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${apiBase}/api/leaderboard`);
      const data = await res.json();
      setEntries(data.entries || data);
    }
    load();
  }, [apiBase]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {entries.map((e) => (
          <li key={e._id}>{e.user?.name || e.user} — {e.points} pts</li>
        ))}
      </ol>
    </div>
  );
}
