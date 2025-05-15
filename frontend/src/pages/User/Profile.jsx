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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black via-red-950 to-black p-6">
      <div className="bg-[#1e1e1e] text-white shadow-2xl rounded-2xl w-full max-w-md p-8 space-y-6 border border-red-700">
        <h2 className="text-3xl font-bold text-center text-red-500 uppercase tracking-wide">
          Update Profile
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#2b2b2b] border border-red-500 text-white focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#2b2b2b] border border-red-500 text-white focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#2b2b2b] border border-red-500 text-white focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#2b2b2b] border border-red-500 text-white focus:outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
              disabled={loadingUpdateProfile}
            >
              {loadingUpdateProfile ? "Updating..." : "Update"}
            </button>

            {loadingUpdateProfile && (
              <div className="mt-4">
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
