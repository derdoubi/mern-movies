import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useProfileMutation } from "../../redux/api/user";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username || "");
    setEmail(userInfo.email || "");
    setPassword("");
    setConfirmPassword("");
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-xl shadow-xl border border-white/10 p-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-8 text-center">
          Update Profile
        </h2>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm text-white/80">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-white/80">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-white/80">Password</label>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-white/80">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-60"
              disabled={loadingUpdateProfile}
            >
              {loadingUpdateProfile ? "Updating..." : "Update Profile"}
            </button>

            {loadingUpdateProfile && (
              <div className="flex justify-center mt-4">
                <Loader />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
