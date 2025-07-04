import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";

const SignInForm = ({ onClose, setIsLoggedIn }) => {
  const [otpSent, setOtpSent] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log("Sending OTP to:", email);
    setOtpSent(true);
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    const otp = e.target.otp.value;
    console.log("Verifying OTP:", otp);
    setIsLoggedIn(true);
    onClose();
  };

  return (
    <form className="space-y-4" onSubmit={otpSent ? handleOtpVerify : handleLoginSubmit}>
      <label htmlFor="email" className="text-sm font-semibold">
        Enter Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter Email"
        className="border rounded-lg px-4 py-3 w-full text-sm text-gray-600"
        required
      />

      {!otpSent ? (
        <button type="submit" className="w-full bg-[#2ac1a7] hover:bg-[#27a994] text-white font-bold py-3 rounded-lg">
          <span>Send OTP</span>
          <FontAwesomeIcon icon={faSquareArrowUpRight} className="h-4 w-4 ml-2" />
        </button>
      ) : (
        <>
          <label htmlFor="otp" className="text-sm font-semibold">
            Enter OTP
          </label>
          <input
            type="text"
            name="otp"
            id="otp"
            placeholder="Enter OTP"
            className="border rounded-lg px-4 py-3 w-full text-sm text-gray-600"
            required
          />
          <button type="submit" className="w-full bg-[#2ac1a7] hover:bg-[#27a994] text-white font-bold py-3 rounded-lg">
            Verify OTP
          </button>
        </>
      )}
    </form>
  );
};

export default SignInForm;
