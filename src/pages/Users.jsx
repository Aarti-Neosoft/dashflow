import { useContext, useState } from "react";
import { UserContext } from "../context/UserContect";
import { useOutletContext } from "react-router-dom";

function Users() {
  const { users, setUsers } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const { isDark } = useOutletContext();

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
    <div
      className={`p-6 rounded-2xl border ${isDark
        ? "bg-[#169976] border-white/10"
        : "bg-gray-300 border-slate-200"
        }`}
    >
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`mb-4 w-full p-2 rounded border ${isDark
          ? "bg-[#169976] border-white/10 text-white placeholder-gray-300"
          : "bg-gray-200 border-slate-200 text-black placeholder-gray-500"
          }`}
      />

      <div className="overflow-x-auto">
        <table className="min-w-[640px] w-full text-sm">
          <thead className="text-gray-900 border-b border-white/10">
            <tr>
              <th className="py-3 text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={`${user.id}-${user.email}`} className="border-b border-white/5">
                <td className="py-3">{user.name}</td>
                <td className="text-white-500">{user.email}</td>

                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(index, e.target.value)}
                    className="bg-[#F0F8FF] text-gray-900 border border-white/10 px-2 py-1 rounded"
                  >
                    {roles.map((role) => (
                      <option key={role}>{role}</option>
                    ))}
                  </select>
                </td>

                <td>
                  <button
                    onClick={() => toggleStatus(index)}
                    className={`relative flex items-center w-24 h-7 rounded-full px-1 transition-all duration-300 ${user.status === "Active"
                      ? "bg-green-600 justify-end"
                      : "bg-red-500 justify-start"
                      }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full shadow transition-all duration-300"></div>
                    <span
                      className={`absolute text-[10px] font-semibold ${user.status === "Active"
                        ? "left-2 text-white"
                        : "right-2 text-white"
                        }`}
                    >
                      {user.status === "Active" ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </button>
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