import { useState, useEffect } from "react";
import axios from "axios";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // store logged in user

  // 🔹 Check if user already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        // 🔹 Login
        const res = await axios.post("http://localhost:5000/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        // Save user + token to localStorage
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);

        setMessage(`✅ Logged in as ${res.data.user?.username || formData.email}`);

      } else {
        // 🔹 Register
        const res = await axios.post("http://localhost:5000/auth/register", {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        });

        setMessage("🎉 Signup successful! Please login now.");
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMessage(" Logged out successfully");
  };

  // If user is logged in, show dashboard
  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center text-gray-800">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.user?.username || 'User'}</h2>
          <p className="mb-4">You are logged in with email: {user.user?.email || 'No email found'}</p>
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500 font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Otherwise show auth form
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-amber-200 shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                placeholder="Your name"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-black font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-black font-medium">{message}</p>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-black hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already a member?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-black hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}