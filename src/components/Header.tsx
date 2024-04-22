import { getAuth } from "firebase/auth";
import { fb } from "../firebaseConfig";

const Header = () => {
  const auth = getAuth(fb);

  return (
    <div
      className="flex items-center w-full justify-center bg-[#0e101071] backdrop-blur-md py-2 z-20 opacity-100 fixed cursor-pointer"
      onClick={() => (window.location.href = "/")}
    >
      <img
        src="../logowhite.png"
        alt="logo"
        className="h-10 md:h-14 px-5 py-2 rounded-full"
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
