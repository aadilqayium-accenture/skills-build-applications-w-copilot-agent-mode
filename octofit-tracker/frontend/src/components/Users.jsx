import React, { useEffect, useState } from 'react';

export default function Users({ apiBase }) {
  // Codespaces preview endpoint example:
  // https://$CODESPACE_NAME-8000.app.github.dev/api/users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function load() {
      const codespaceUrl = 'https://$CODESPACE_NAME-8000.app.github.dev/api/users';
      const url = apiBase ? `${apiBase}/api/users/` : codespaceUrl;
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data.users || data);
    }
    load();
  }, [apiBase]);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </div>
  );
}
