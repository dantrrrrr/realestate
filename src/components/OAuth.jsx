import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess, useUserSelector } from "../redux/user/userSlice";
export default function OAuth() {
  const dispatch = useDispatch();
  const { loading, error } = useUserSelector();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const data = {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      };

      const response = await axios.post("/api/auth/google", data);

      dispatch(signInSuccess(response.data));
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="flex bg-red-700 text-white p-3 rounded-lg justify-center items-center hover:opacity-90 transition-all uppercase"
    >
      Continue with Google
    </button>
  );
}
