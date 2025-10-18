import { useState, useEffect } from "react";
import axios from "axios";
import UserDashboard from "./UserDashboard";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);


  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
   
  }

  // 🔹 Check if user already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []); // This useEffect is now for local state, redirection is handled in App.jsx or similar



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
        // Redirect to dashboard
          window.location.href = "/dashboard";
       setUser(res.data);

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

  // This component no longer shows the dashboard.
  // It only handles login/signup and redirects.

  // If user is logged in, show dashboard
  // if (user) {
  //   return (
      
  //     <UserDashboard user={user} />
       
      
  //   );
  // }

  // Otherwise show auth form
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-black text-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Your name"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-white font-medium">{message}</p>
        )}

        <p className="text-center text-sm text-white mt-4">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-400 hover:underline rounded-2"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already a member?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-400 hover:underline rounded-1"
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