import { useState, useContext } from "react";
import { UserContext } from "../context/UserContect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useOutletContext } from "react-router-dom";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const { users, addUser, isLoading } = useContext(UserContext);
  const { isDark } = useOutletContext();


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "Viewer",
      status: "Active",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      addUser(values);
      resetForm();
      setOpen(false);
    },
  });

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <button
          onClick={() => setOpen(true)}
          className="w-full sm:w-auto bg-white text-black px-5 py-2 rounded-lg"
        >
          + Add User
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div
            className={`p-6 rounded-xl w-full max-w-md mx-4 border ${isDark
              ? "bg-[#0b1220] border-white/10 text-white"
              : "bg-white border-slate-200 text-black"
              }`}
          >
            <h2 className="text-lg font-semibold mb-4">Add New User</h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                className={`w-full p-2 rounded border ${isDark
                  ? "bg-[#020617] border-white/10 text-white"
                  : "bg-white border-slate-300 text-black"
                  }`}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && (
                <p className="text-red-400 text-xs">{formik.errors.name}</p>
              )}

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className={`w-full p-2 rounded border ${isDark
                  ? "bg-[#020617] border-white/10 text-white"
                  : "bg-white border-slate-300 text-black"
                  }`}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && (
                <p className="text-red-400 text-xs">{formik.errors.email}</p>
              )}

              <select
                name="role"
                onChange={formik.handleChange}
                value={formik.values.role}
                className={`w-full p-2 rounded border ${isDark
                  ? "bg-[#020617] border-white/10 text-white"
                  : "bg-white border-slate-300 text-black"
                  }`}
              >
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>

              <select
                name="status"
                onChange={formik.handleChange}
                value={formik.values.status}
                className={`w-full p-2 rounded border ${isDark
                  ? "bg-[#020617] border-white/10 text-white"
                  : "bg-white border-slate-300 text-black"
                  }`}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    setOpen(false);
                  }}
                  className="px-4 py-2 bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-gray-400">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-gray-400">No users available yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={`${user.id}-${user.email}`}
              className={`p-4 rounded-xl border ${isDark
                ? "bg-[#408A71] border-white/10"
                : "bg-gray-400 border-slate-200"
                }`}
            >
              <h2 className="font-semibold">{user.name}</h2>

              <p className="text-gray-400 text-sm">{user.email}</p>

              <div className="flex justify-between mt-3">
                <span className="text-xs bg-white/10 px-2 py-1 rounded">
                  {user.role}
                </span>

                <span
                  className={`text-xs ${user.status === "Active"
                    ? "text-green-400"
                    : "text-gray-400"
                    }`}
                >
                  ● {user.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
