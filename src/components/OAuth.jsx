import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

export default function OAuth() {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      ///TODO make sync with database account
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
