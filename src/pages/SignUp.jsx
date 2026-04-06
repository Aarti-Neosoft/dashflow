import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContect";
import { MdDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

function SignUp() {
  const navigate = useNavigate();
  const { addUser } = useContext(UserContext);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || password.length < 6) {
      alert(
        "Please complete all fields and use a password with at least 6 characters.",
      );
      return;
    }
    const newUser = {
      name,
      email,
      password,
      role: "Viewer",
      status: "Active",
    };

    addUser(newUser);
    const role = "user";
    localStorage.setItem("loggedInUser", JSON.stringify({ name, email, role }));
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

        <h2 className="text-2xl font-bold mb-1">Create Account</h2>
        <p className="text-gray-400 text-sm mb-6">
          Enter your details to sign up
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-xs text-gray-400">FULL NAME</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-white/10 focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <div className="mb-4">
            <label className="text-xs text-gray-400">PASSWORD</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-white/10 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 transition">
            Create Account
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Demo: any email + password (min 6 chars)
          </p>

          <p className="text-xs text-gray-400 text-center mt-3">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-blue-400 hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
