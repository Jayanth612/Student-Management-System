import React, { useEffect, useState } from "react";
import axios from "axios";

const emptyForm = { username: "", password: "", role: "STUDENT" };

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setError("");
      const response = await axios.get("http://localhost:8080/api/admin/users");
      setUsers(response.data);
    } catch (requestError) {
      setError(requestError.response?.data?.detail || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await axios.post("http://localhost:8080/api/admin/users", form);
      setForm(emptyForm);
      setMessage("User created successfully.");
      await loadUsers();
    } catch (requestError) {
      setError(requestError.response?.data?.detail || "Unable to create user.");
    } finally {
      setSaving(false);
    }
  };

  const resetPassword = async (username) => {
    const password = window.prompt(`Enter a new password for ${username}:`);
    if (!password) return;
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }
    try {
      await axios.put(`http://localhost:8080/api/admin/users/${encodeURIComponent(username)}/password`, { password });
      setMessage(`Password reset for ${username}.`);
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.detail || "Unable to reset password.");
    }
  };

  const changeRole = async (username, role) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/users/${encodeURIComponent(username)}/role`, { role });
      setMessage(`Role updated for ${username}.`);
      setError("");
      await loadUsers();
    } catch (requestError) {
      setError(requestError.response?.data?.detail || "Unable to update role.");
    }
  };

  const deleteUser = async (username) => {
    if (!window.confirm(`Delete the login account for ${username}?`)) return;
    try {
      await axios.delete(`http://localhost:8080/api/admin/users/${encodeURIComponent(username)}`);
      setMessage(`User ${username} deleted.`);
      setError("");
      await loadUsers();
    } catch (requestError) {
      setError(requestError.response?.data?.detail || "Unable to delete user.");
    }
  };

  return (
    <section className="user-management">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ADMINISTRATION</p>
          <h1>Manage user accounts</h1>
          <p className="muted">Create accounts, update roles, reset passwords, and remove access.</p>
        </div>
      </div>

      <form className="user-form card" onSubmit={handleCreate}>
        <h2>Create account</h2>
        <div className="user-form-grid">
          <label>Username<input value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} required /></label>
          <label>Initial password<input type="password" minLength="8" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /></label>
          <label>Role<select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}><option>STUDENT</option><option>TEACHER</option><option>ADMIN</option></select></label>
          <button className="save-btn" disabled={saving}>{saving ? "Creating..." : "Create account"}</button>
        </div>
      </form>

      {message && <div className="inline-message success">{message}</div>}
      {error && <div className="inline-message error">{error}</div>}

      <div className="card user-table-card">
        <div className="section-header"><h2>Accounts</h2><span>{users.length} total</span></div>
        {loading ? <p className="muted">Loading accounts...</p> : (
          <div className="table-scroll">
            <table>
              <thead><tr><th>Username</th><th>Role</th><th>Actions</th></tr></thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.username}>
                    <td><strong>{user.username}</strong></td>
                    <td>
                      <select value={user.role} onChange={(event) => changeRole(user.username, event.target.value)}>
                        <option>ADMIN</option><option>STUDENT</option><option>TEACHER</option>
                      </select>
                    </td>
                    <td className="action-row">
                      <button type="button" className="secondary-btn" onClick={() => resetPassword(user.username)}>Reset password</button>
                      <button type="button" className="danger-btn" onClick={() => deleteUser(user.username)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
