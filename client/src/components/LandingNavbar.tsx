import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { showToast } from "../utility/toast";
import { MdArrowDropDown } from "react-icons/md";

interface Props {
  name: string;
  image: string;
}

const LandingNavbar = (props: Props) => {
    const [isLoggedIn, setLoggedIn] = useState(true);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const user: any = localStorage.getItem("user");
    const mainUser = JSON.parse(user);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        setLoggedIn(false);
        return showToast(`Goodbye ${mainUser.first_name}`);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
      };

  return (
    <nav className="w-full bg-gray-100 p-4 fixed top-0 z-40">
      <div className="w-10/12 mx-auto flex items-center justify-between">
        <div className="text-center">
          <Link to={"/"} className="no-underline">
            <span className="text-gray-900 text-3xl font-Holtwood leading-14">
              DECA
            </span>
            <span className="text-green-500 text-3xl font-Holtwood leading-14">
              EVENTS
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            // Render user information and dropdown when logged in
            <div className="relative group">
              <div 
              className="justify-start items-center gap-2 flex cursor-pointer"
              onClick={toggleDropdown}
              >
                <img
                  className="w-8 h-8 relative rounded-[200px] border-2 border-gray-300"
                  src={props.image}
                />
                <div className="text-gray-900 text-base font-normal font-Inter leading-snug tracking-tight">
                  {props.name}
                </div>
                <MdArrowDropDown />
              </div>
              <div className={`absolute ${isDropdownOpen ? "block" : "hidden"} top-full right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md py-2`}>
                {/* Dropdown content (e.g., dashboard link) */}
                <Link to="/dashboard" className="block px-4 py-2 text-gray-800 no-underline">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            // Render login and signup buttons when not logged in
            <>
              <Link to={"/signin"} className="no-underline">
                <Button
                  title={"Login"}
                  text={"#27AE60"}
                  bg={"white"}
                  type={""}
                />
              </Link>
              <Link to={"/signup"} className="no-underline">
                <Button
                  title={"Signup"}
                  text={"white"}
                  bg={"#27AE60"}
                  type={""}
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;