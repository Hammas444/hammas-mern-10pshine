import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const endpoint = isLogin
        ? "http://localhost:5000/auth/login"
        : "http://localhost:5000/auth/register";

      const body = isLogin
        ? { email: formData.email, password: formData.password }
        : { username: formData.name, email: formData.email, password: formData.password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (isLogin) {
        // ✅ Save JWT token in localStorage
        localStorage.setItem("token", data.token);
        setSuccess("Login successful! ✅");
      } else {
        setSuccess("Signup successful! 🎉 Now you can log in.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md transition-all duration-500">
        <h2 className="text-3xl font-bold text-center text-black mb-6 drop-shadow">
          {isLogin ? "Welcome Back 👋" : "Join Us 🚀"}
        </h2>

        {/* Show error/success */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Your Name"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-black mt-6">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already a member?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
