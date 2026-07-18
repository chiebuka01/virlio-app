import { FaPlus, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <header className="flex justify-between py-1">
      <h1 className="text-4xl" onClick={() => navigate("/")}>
        <FaPlay className="inline-block text-4xl" /> Virlio
      </h1>
      <div className="flex gap-x-2 items-center">
        <button
          className="border-gray-500 border-2 px-4 py-1 flex items-center gap-x-2 justify-center"
          onClick={() => navigate("/upload")}
        >
          <FaPlus />
          Upload
        </button>
        {isLoggedIn ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              window.location.href = "/";
            }}
          >
            Log Out
          </button>
        ) : (
          <>
            <button onClick={() => navigate("/signin")}>Log In</button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
