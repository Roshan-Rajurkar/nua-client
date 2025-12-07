import { useState } from "react";
import { registerUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser(form);
    alert("User registred", data?.username);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-lg w-96"
      >
        <h2 className="text-2xl font-semibold mb-5 text-center">Register</h2>

        <div className="mb-3">
          <label className="text-sm">User Name</label>
          <input
            className="w-full border p-2 rounded mt-1"
            name="username"
            onChange={handleChange}
            type="text"
          />
        </div>

        <div className="mb-3">
          <label className="text-sm">Email</label>
          <input
            className="w-full border p-2 rounded mt-1"
            name="email"
            onChange={handleChange}
            type="email"
          />
        </div>

        <div className="mb-3">
          <label className="text-sm">Password</label>
          <input
            className="w-full border p-2 rounded mt-1"
            name="password"
            onChange={handleChange}
            type="password"
          />
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded mt-4"
          type="submit"
        >
          Register
        </button>

        <p className="text-center text-sm mt-3">
          Already have an account?{" "}
          <Link className="text-blue-600" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
