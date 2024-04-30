import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "sonner";
import { fb } from "../../firebaseConfig";

const Auth = () => {
  const auth = getAuth(fb);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      toast.success("Signed in successfully");
      window.location.href = "/";
    } catch (error) {
      console.log("ERR" )
      console.log(error)
      toast.error("Invalid Credentials");
    }
  };
  return (
    <div className="flex items-center justify-center flex-col h-[100vh]">
      <h2 className="text-5xl">Signin.</h2>
      <p className="mt-3">Use your username and password to continue</p>

      <div className="p-5 mt-5 flex flex-col">
        <form className="flex flex-col">
          <input
            type="text"
            className="bg-transparent border text-white px-5 py-2 rounded-lg"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="password"
            className="bg-transparent border text-white px-5 py-2 rounded-lg mt-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="true"
          />
        </form>
        <button
          className="border border-blue-500 text-white rounded-lg p-2 mt-3 hover:border-white transition-all duration-200 cursor-pointer"
          onClick={signin}
        >
          Signin
        </button>
      </div>
    </div>
  );
};

export default Auth;
