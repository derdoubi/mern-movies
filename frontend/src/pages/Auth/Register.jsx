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
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md relative">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-500/20 blur-3xl" />
        
        <section className="relative bg-[#1a1a1a] p-8 rounded-xl shadow-2xl border border-white/10 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 text-center mb-8">
            Create Account
          </h1>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90
                      rounded-lg font-semibold text-white transition-all duration-200 
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                      focus:ring-offset-[#1a1a1a] disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            {isLoading && <div className="flex justify-center"><Loader /></div>}
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 
                       hover:opacity-80 transition-opacity"
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Register;
