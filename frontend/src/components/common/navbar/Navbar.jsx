import { useState } from "react";
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

import Logo from "../../../assets/images/tenlogo.jpg";
import SignInModal from "../../../components/auth/SignInModal";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../../../lib/Constant";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    setIsDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white px-4 sm:px-6 lg:px-8 shadow font-[Poppins]">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 relative">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <FontAwesomeIcon icon={faBars} className="text-2xl text-black" />
          </button>
        </div>

        {/* Logo Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none">
          <a href="/">
            <img src={Logo} alt="Broki logo" className="h-11 rounded-full" />
          </a>
        </div>

        {/* Mobile User Icon + Dropdown */}
        <div className="lg:hidden relative">
          {isLoggedIn ? (
            <div>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1"
              >
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="text-2xl text-black"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg z-50 p-3 sm:p-4 text-sm">
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/properties"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My Listings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/bookings"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My Bookings
                      </Link>
                    </li>
                    <li
                      onClick={handleLogout}
                      className="text-red-500 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setShowModal(true)}>
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-2xl text-black"
              />
            </button>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-between items-center w-full">
          <div className="flex text-[14px] items-center space-x-6">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `font-semibold ${
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
              className="relative px-6 py-3 text-[15px] font-semibold text-white rounded-xl bg-black border border-black"
            >
              List Your Outlet
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-sm ml-2"
              />
            </a>

            {/* Desktop User Dropdown */}
            <div className="flex items-center space-x-6">
              {isLoggedIn ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <FontAwesomeIcon icon={faUserCircle} className="text-lg" />
                    <span>Hello, UserName</span>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute right-0 w-48 bg-white rounded-lg shadow-lg z-10 p-4">
                      <ul className="space-y-2">
                        <li className="hover:font-semibold cursor-pointer">
                          <Link to={"/properties"}>My Listings</Link>
                        </li>
                        <li className="hover:font-semibold cursor-pointer">
                          <Link to={"/bookings"}>My Bookings</Link>
                        </li>
                        <li
                          className="hover:font-semibold cursor-pointer text-red-500"
                          onClick={handleLogout}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer flex items-center space-x-2 text-black text-[14px]"
                >
                  <FontAwesomeIcon icon={faUserCircle} className="text-lg" />
                  <span>Login / Register</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="bg-white w-72 md:w-96 h-full shadow-md flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar Header */}
            <div className="flex justify-between items-center bg-[hsla(8,79%,62%,0.07)] border-b border-[#ddd] px-6 py-4">
              <h4 className="font-bold text-lg">Welcome to Broki</h4>
              <button
                onClick={() => setSidebarOpen(false)}
                className="bg-[#26c4a0] text-white rounded-full h-10 w-10 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faXmark} className="text-lg" />
              </button>
            </div>

            {/* Sidebar Body */}
            <div className="overflow-y-auto flex-1 p-6">
              {navLinks.map(({ label, to, icon }) => (
                <NavLink
                  key={label}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex justify-between items-center py-4 font-medium text-sm ${
                      isActive
                        ? "text-[#00BFA6]"
                        : "text-black hover:text-[#00BFA6]"
                    }`
                  }
                >
                  <span>{label}</span>
                  <FontAwesomeIcon icon={icon} />
                </NavLink>
              ))}

              <div className="mt-10 text-sm text-black">
                <div className="flex flex-col md:flex-row justify-between mb-2 font-semibold">
                  <div>Total Free Customer Care</div>
                  <div className="md:text-right mt-1 md:mt-0">
                    Need Live Support?
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div className="font-bold text-base flex items-center">
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    +(91) 987 010 5602
                  </div>
                  <div className="text-base mt-2 md:mt-0 md:text-right">
                    contact@broki.in
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-7">
                  <span className="font-semibold">Follow us</span>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="hover:text-[#00BFA6] cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="hover:text-[#00BFA6] cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="hover:text-[#00BFA6] cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="hover:text-[#00BFA6] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showModal && (
        <SignInModal
          onClose={() => setShowModal(false)}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </nav>
  );
};

export default Navbar;
