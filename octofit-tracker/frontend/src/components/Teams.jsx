import React, { useEffect, useState } from 'react';

export default function Teams({ apiBase }) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${apiBase}/api/teams/`);
      const data = await res.json();
      setTeams(data.teams || data);
    }
    load();
  }, [apiBase]);

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((t) => (
          <li key={t._id}>{t.name} — members: {(t.members || []).length}</li>
        ))}
      </ul>
    </div>
  );
}
