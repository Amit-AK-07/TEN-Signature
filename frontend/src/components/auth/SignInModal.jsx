import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const SignInModal = ({   onClose, setIsLoggedIn  }) => {
  const [isSignIn, setIsSignIn] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") onClose();
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1050] p-4"
    >
      <div
        className="bg-white max-w-md w-full p-8 relative font-inter shadow-lg rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
        </button>

        <h2 className="text-lg font-bold mb-6">Welcome to Broki</h2>

        {/* Tabs */}
        <div className="flex space-x-8 mb-6 font-semibold text-sm text-gray-700">
          <button
            onClick={() => setIsSignIn(true)}
            className={`cursor-pointer pb-1 ${
              isSignIn ? "border-b-2 border-black" : "text-gray-400"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignIn(false)}
            className={`cursor-pointer pb-1 ${
              !isSignIn ? "border-b-2 border-black" : "text-gray-400"
            }`}
          >
            New Account
          </button>
        </div>

        {isSignIn ? (
          <SignInForm  onClose={onClose} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <SignUpForm onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default SignInModal;
