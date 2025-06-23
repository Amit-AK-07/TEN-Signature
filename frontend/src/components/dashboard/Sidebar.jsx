import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBarsProgress,
  faClipboardList,
  faHouse,
  faPlusSquare,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function Sidebar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Bar - Always Visible */}
      <div className="lg:hidden fixed top-16 left-0 w-full h-[50px] bg-white z-50 shadow flex items-center px-10">
        <div
          className="flex items-center gap-5 cursor-pointer w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={faBars} className="text-lg text-gray-700" />
          <span className="text-lg text-gray-800 font-medium">
            Dashboard Navigation
          </span>
        </div>
      </div>
      {/* Dropdown-Style Sidebar for Mobile */}
      {isOpen && (
        <>
          <div className="lg:hidden absolute top-[115px] left-0 w-full bg-white shadow-lg p-4 space-y-6 z-40">
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Manage Listings
              </h2>
              <nav className="flex flex-col gap-2">
                <NavLink
                  to="/add-property"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition ${
                      isActive
                        ? "bg-black text-white"
                        : "text-gray-800 hover:bg-gray-100"
                    }`
                  }
                >
                  <FontAwesomeIcon icon={faPlusSquare} /> Add New Property
                </NavLink>
                <NavLink
                  to="/properties"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition ${
                      isActive
                        ? "bg-black text-white"
                        : "text-gray-800 hover:bg-gray-100"
                    }`
                  }
                >
                  <FontAwesomeIcon icon={faHouse} /> My Properties
                </NavLink>
                <NavLink
                  to="/bookings"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition ${
                      isActive
                        ? "bg-black text-white"
                        : "text-gray-800 hover:bg-gray-100"
                    }`
                  }
                >
                  <FontAwesomeIcon icon={faClipboardList} /> Service Bookings
                </NavLink>
              </nav>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Manage Account
              </h2>
              <li
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:text-black hover:bg-gray-100 transition w-full text-left"
              >
                <FontAwesomeIcon icon={faBarsProgress} /> My Profile
              </li>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:text-black hover:bg-gray-100 transition w-full text-left"
              >
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </button>
            </div>
          </div>

          {/* Spacer to prevent overlap */}
          <div className="md:hidden h-[320px]" />
        </>
      )}
      {/* Sidebar for Desktop */}
      <div className="hidden lg:block bg-white w-72 h-screen p-6 pt-10  flex-col justify-between">
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
              Manage Listings
            </h2>
            <nav className="flex flex-col gap-2">
              <NavLink
                to="/add-property"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-4 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-800 hover:bg-gray-100"
                  }`
                }
              >
                <FontAwesomeIcon icon={faPlusSquare} /> Add New Property
              </NavLink>
              <NavLink
                to="/properties"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-4 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-800 hover:bg-gray-100"
                  }`
                }
              >
                <FontAwesomeIcon icon={faHouse} /> My Properties
              </NavLink>
              <NavLink
                to="/bookings"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-4 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-800 hover:bg-gray-100"
                  }`
                }
              >
                <FontAwesomeIcon icon={faClipboardList} /> Service Bookings
              </NavLink>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              Manage Account
            </h2>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:text-black hover:bg-gray-100 transition w-full text-left"
            >
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </button>
          </div>
        </div>
      </div>
          
    </>
  );
}
