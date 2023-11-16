import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export default function SignUp() {
  console.log("render");
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  // const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setLoading(true);

    try {
      // Make a POST request using Axios
      const response = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      // setData(response.data);
      toast.success(response.data.message);

      // console.log("Server response:", response.data);
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message);
      // console.log(error)
      // console.error("Error during signup:", err.response.data);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto flex flex-col items-center justify-center h-screen">
      <div className="w-96 p-8 rounded-lg shadow-lg bg-gray-50 ">
        <h1 className="text-3xl text-center font-semibold my-7 text-gray-600">
          Sign up
        </h1>
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              ref={usernameRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            className="bg-slate-700 text-white p-3 rounded-lg text-lg uppercase hover:opacity-95 hover:scale-105 transition-all disabled:opacity-80 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin border-b-2 rounded-full border-white"></div>
            ) : (
              <span>Sign up</span>
            )}
          </button>
        </form>
        <div className="flex gap-2 mt-5 text-sm justify-end ">
          <p>Have an account ?</p>
          <Link to="/sign-in">
            <span className="text-blue-700 hover:underline">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
