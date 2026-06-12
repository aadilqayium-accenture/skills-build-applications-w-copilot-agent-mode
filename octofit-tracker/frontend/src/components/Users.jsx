import React, { useEffect, useState } from 'react';

export default function Users({ apiBase }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${apiBase}/api/users`);
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
