import React, { useEffect, useState } from 'react';

export default function Teams({ apiBase }) {
  // Codespaces preview endpoint example:
  // https://$CODESPACE_NAME-8000.app.github.dev/api/teams
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function load() {
      const codespaceUrl = 'https://$CODESPACE_NAME-8000.app.github.dev/api/teams';
      const url = apiBase ? `${apiBase}/api/teams/` : codespaceUrl;
      const res = await fetch(url);
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
