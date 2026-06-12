import React, { useEffect, useState } from 'react';

export default function Leaderboard({ apiBase }) {
  // Codespaces preview endpoint example:
  // https://$CODESPACE_NAME-8000.app.github.dev/api/leaderboard
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function load() {
      const codespaceUrl = 'https://$CODESPACE_NAME-8000.app.github.dev/api/leaderboard';
      const url = apiBase ? `${apiBase}/api/leaderboard/` : codespaceUrl;
      const res = await fetch(url);
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
