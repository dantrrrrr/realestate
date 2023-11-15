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
      setError(err.response ? err.response.data : err.message);

      // console.error("Error during signup:", err.response.data);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg "
          id="username"
          ref={usernameRef}
        />
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg "
          id="email"
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg "
          id="password"
          ref={passwordRef}
        />
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
      <div className="flex gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
