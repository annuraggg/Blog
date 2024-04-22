import { getAuth } from "firebase/auth";
import { fb } from "../firebaseConfig";

const Header = () => {
  const auth = getAuth(fb);

  return (
    <div
      className="flex items-center justify-center bg-transparent fixed m-auto left-10 my-5 cursor-pointer"
      onClick={() => (window.location.href = "/")}
    >
      <img
        src="../logowhite.png"
        alt="logo"
        className="h-14 px-5 py-2 rounded-full"
      />

      {auth.currentUser && (
        <button
          className="text-xs"
          onClick={() => (window.location.href = "/editor")}
        >
          + Create
        </button>
      )}
    </div>
  );
};

export default Header;
