import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUserCircle,
  faArrowUpRightFromSquare,
  faXmark,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import Logo from "../../../assets/images/BrokiLogo.png";
import SignInModal from "../../../components/auth/SignInModal";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../../../lib/Constant";
import axios from "axios";
import { setUser } from "../../../redux/authSlice";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

    useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const savedUsername = localStorage.getItem("username");

    const apiBaseUrl = typeof process !== "undefined" && process.env && process.env.REACT_APP_API_BASE_URL
      ? process.env.REACT_APP_API_BASE_URL
      : "http://localhost:8000/api";


    if (accessToken && savedUsername) {
      axios
        .get(`${apiBaseUrl}/auth-status/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          if (res.data.is_authenticated) {
            dispatch(setUser({ 
              username: savedUsername,
              first_name: res.data.first_name || "",
            }));
          } else {
            dispatch(setUser(null));
          }
        })
        .catch((error) => {
          console.error("Auth status error:", error.response || error.message || error);
          dispatch(setUser(null));
        });
    } else {
      console.log("No access token or username found in localStorage");
    }
  }, [dispatch, location]);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await axios.post(
        "http://localhost:8000/api/logout/",
        { refresh: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
    } catch (error) {
      console.error("Logout error", error);
    }

    // Clear tokens and Redux state
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");

    dispatch(setUser(null));
  };

  return (
    <nav className="sticky top-0 z-50 bg-white px-4 sm:px-6 lg:px-8 shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 relative">
        <div className="lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <FontAwesomeIcon icon={faBars} className="text-2xl text-black" />
          </button>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none">
          <a href="/">
            <img src={Logo} alt="Broki logo" className="h-11" />
          </a>
        </div>

        <div className="lg:hidden">
          <button onClick={() => setShowModal(true)}>
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-2xl text-black"
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-between items-center w-full">
          <div className="flex items-center space-x-6">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `text-base font-semibold ${
                    isActive
                      ? "text-[#00BFA6]"
                      : "text-black hover:text-[#00BFA6]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="/"
              className="relative px-6 py-3 text-sm font-semibold text-white rounded-xl bg-black border border-black"
            >
              List Your Outlet
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-sm ml-2"
              />
            </a>

            {/* Login/Logout Logic */}
            <div className="flex items-center space-x-6">
              {user ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <FontAwesomeIcon icon={faUserCircle} className="text-lg" />
                    <span>Hello, {user.first_name ? user.first_name : user.username}</span>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute right-0  w-48 bg-white rounded-lg shadow-lg z-10 p-4">
                      <ul className="space-y-2">
                        <li className="hover:font-semibold cursor-pointer">
                          <Link to="/properties">My Listings</Link>
                        </li>
                        <li className="hover:font-semibold cursor-pointer">
                          <Link to="/bookings">My Bookings</Link>
                        </li>
                        <li
                          className="hover:font-semibold cursor-pointer text-red-500"
                          onClick={handleLogout}
                        >
                          <Link to="/">Logout</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer flex items-center space-x-2 text-black"
                >
                  <FontAwesomeIcon icon={faUserCircle} className="text-lg" />
                  <span>Login / Register</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar, Auth Modal */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="bg-white w-72 md:w-96 h-full shadow-md flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ...sidebar contents... */}
          </div>
        </div>
      )}

      {showModal && (
        <SignInModal
          onClose={() => setShowModal(false)}
          setIsLoggedIn={() => {}}
        />
      )}
    </nav>
  );
};

export default Navbar;
