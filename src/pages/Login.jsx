import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser({ email, password });
    if (data?.token) {
      login(data);
      alert("Login successfully");
      navigate("/");
    } else {
      alert(data.error || "Failed to log in, Please fill required details.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-lg w-96"
      >
        <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>

        <div className="mb-3">
          <label className="text-sm">Email</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="text-sm">Password</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded mt-4"
          type="submit"
        >
          Login
        </button>

        <p className="text-center text-sm mt-3">
          Don't have an account?{" "}
          <Link className="text-blue-600" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
