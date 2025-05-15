import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/user";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("User successfully registered.");
      } catch (error) {
        toast.error(error.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-700 p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-cyan-400 text-center">Create an Account</h2>

        <form onSubmit={submitHandler} className="mt-6 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-zinc-300">Name</label>
            <input
              type="text"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-zinc-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-zinc-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-zinc-300">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <div className="flex justify-center mt-4"><Loader /></div>}
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="text-cyan-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Right-side image */}
      <div className="hidden md:block md:ml-12 lg:ml-20">
        <img
          src="/api/placeholder/600/500"
          alt="Movie Theater"
          className="rounded-xl shadow-xl border border-zinc-700 w-full max-w-sm"
        />
      </div>
    </div>
  );
};

export default Register;
