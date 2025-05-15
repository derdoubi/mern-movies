import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
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

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 py-12">
      <section className="w-full max-w-md">
        <div className="bg-zinc-900 p-8 rounded-xl shadow-2xl border border-zinc-800">
          <h1 className="text-3xl font-bold text-cyan-400 text-center mb-8">Sign In</h1>

          <form onSubmit={submitHandler} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 
                           rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 
                           rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 transition-colors duration-300 
                        rounded-md font-semibold text-white focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 disabled:opacity-60"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <div className="flex justify-center mt-4"><Loader /></div>}
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-zinc-400">
            New here?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-cyan-400 hover:text-cyan-300 font-medium transition"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Optional Image Area */}
        <img
          src=""
          alt=""
          className="hidden md:block mt-6 mx-auto max-h-40 opacity-50"
        />
      </section>
    </div>
  );
};

export default Login;

