import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

function Users() {
  const { users, setUsers } = useContext(UserContext);
  const [search, setSearch] = useState("");

  const roles = ["Admin", "Editor", "Viewer"];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleRoleChange = (index, newRole) => {
    const updated = [...users];
    updated[index].role = newRole;
    setUsers(updated);
  };

  const toggleStatus = (index) => {
    const updated = [...users];
    updated[index].status =
      updated[index].status === "Active" ? "Inactive" : "Active";
    setUsers(updated);
  };

  return (
    <div className="bg-[#0b1220] p-6 rounded-2xl border border-white/10">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full p-2 bg-[#020617] border border-white/10 rounded"
      />

      <div className="overflow-x-auto">
        <table className="min-w-[640px] w-full text-sm">
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="py-3 text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="border-b border-white/5">
                <td className="py-3">{user.name}</td>
                <td className="text-gray-400">{user.email}</td>

                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(index, e.target.value)}
                    className="bg-[#020617] border border-white/10 px-2 py-1 rounded"
                  >
                    {roles.map((role) => (
                      <option key={role}>{role}</option>
                    ))}
                  </select>
                </td>

                <td>
                  <span
                    onClick={() => toggleStatus(index)}
                    className={`cursor-pointer text-xs px-2 py-1 rounded ${
                      user.status === "Active"
                        ? "text-green-400"
                        : "text-gray-400"
                    }`}
                  >
                    ● {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-gray-400 mt-4 text-center">No users found 😔</p>
      )}
    </div>
  );
}

export default Users;