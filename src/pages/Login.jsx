import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || password.length < 6) {
      alert("User not found. Please signup first");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!existingUser) {
      alert("❌ User not found. Please create account first.");
      return;
    }

    const role = existingUser.role === "Admin" ? "admin" : "user";
    const name = existingUser.name;
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ name, email, role })
    );
    dispatch(login({ user: name, role }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 shadow-2xl text-white mx-4">
        <div className="flex items-center gap-3 mb-6">
          <MdDashboard size="2em" />
          <h1 className="text-lg font-semibold">
            Dash<span className="text-blue-400">Flow</span>
          </h1>
        </div>

        <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
        <p className="text-gray-400 text-sm mb-6">Sign in to continue</p>

        <div className="flex mb-6 bg-black/40 rounded-lg p-1">
          <button className="flex-1 py-2 rounded-md bg-[#0f172a]">
            Sign In
          </button>
          <button
            className="flex-1 py-2 rounded-md text-gray-400"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-xs text-gray-400">EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-white/10 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="text-xs text-gray-400">PASSWORD</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-white/10 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 transition">
            Sign In
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Demo: any email + any password (min 6 chars)
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
