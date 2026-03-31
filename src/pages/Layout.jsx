import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";

function Layout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [userEmail, setUserEmail] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const name = parsed.name || parsed.email?.split("@")[0] || "Guest";
        setUserName(name.charAt(0).toUpperCase() + name.slice(1));
        setUserEmail(parsed.email || "");
      } catch {
        const name = storedUser.split("@")[0];
        setUserName(name.charAt(0).toUpperCase() + name.slice(1));
      }
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const profileInitial = userName.charAt(0) || "G";
  const isDark = theme === "dark";

  return (
    <div
      className={`flex min-h-screen flex-col lg:flex-row ${
        isDark ? "bg-[#020617] text-white" : "bg-slate-100 text-slate-900"
      }`}
    >
      <div
        className={`w-full lg:w-64 p-5 ${
          isDark
            ? "bg-[#0b1220] border-b lg:border-b-0 lg:border-r border-white/10"
            : "bg-white border-b lg:border-b-0 lg:border-r border-slate-200"
        }`}
      >
        <div style={{display: "flex",alignItems: "center",gap: "8px",marginBottom: "2em"}}>
           <MdDashboard  size="1em" />
        <h1
          className={`text-xl font-bold ${isDark ? "" : "text-slate-900"}`}
        >
          Dash<span className="text-blue-400">Flow</span>
        </h1>

        </div>
        

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `block p-2 rounded mb-2 ${
              isActive
                ? isDark
                  ? "bg-blue-600/20 text-blue-400"
                  : "bg-blue-50 text-sky-600"
                : isDark
                ? "hover:bg-white/5"
                : "hover:bg-slate-100 text-slate-900"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `block p-2 rounded mb-2 ${
              isActive
                ? isDark
                  ? "bg-blue-600/20 text-blue-400"
                  : "bg-blue-50 text-sky-600"
                : isDark
                ? "hover:bg-white/5"
                : "hover:bg-slate-100 text-slate-900"
            }`
          }
        >
          Users
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `block p-2 rounded mb-2 ${
              isActive
                ? isDark
                  ? "bg-blue-600/20 text-blue-400"
                  : "bg-blue-50 text-sky-600"
                : isDark
                ? "hover:bg-white/5"
                : "hover:bg-slate-100 text-slate-900"
            }`
          }
        >
          Settings
        </NavLink>
      </div>

      <div className="flex-1 flex flex-col">
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b ${
            isDark
              ? "border-white/10 bg-[#0b1220]"
              : "border-slate-200 bg-slate-100"
          }`}
        >
          <h2 className="text-lg font-semibold">
            Dash<span className="text-blue-400">Flow</span>
          </h2>

          <div className="flex flex-wrap items-center gap-4 relative">
            <button
              type="button"
              onClick={handleToggleTheme}
              className={`px-3 py-1.5 rounded-lg ${
                isDark
                  ? "bg-slate-200 text-slate-900"
                  : "bg-[#020617] text-white"
              }`}
            >
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 border ${
                isDark
                  ? "bg-[#0b1220] border-white/10 text-white"
                  : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-semibold">
                {profileInitial}
              </div>
              <span className="hidden sm:inline text-sm">{userName}</span>
            </button>

            {menuOpen && (
              <div
                className={`absolute right-0 top-full mt-2 w-56 rounded-2xl border shadow-xl text-left ${
                  isDark
                    ? "bg-[#0b1220] border-white/10"
                    : "bg-white border-slate-200"
                }`}
              >
                <div
                  className={`px-4 py-4 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  <p className="text-sm font-semibold">{userName}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {userEmail || "No email available"}
                  </p>
                </div>
                <div className="border-t border-white/10"></div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`w-full text-left px-4 py-3 ${
                    isDark
                      ? "hover:bg-white/5 text-white"
                      : "hover:bg-slate-100 text-slate-900"
                  }`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;