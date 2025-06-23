import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { sendOtp, verifyOtp } from "../../apiAction/login/Index"; // Backend API calls
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice"; // Redux action

const SignInForm = ({ onClose, setIsLoggedIn, switchToSignUp }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const inputEmail = e.target.email.value.trim();
    setEmail(inputEmail);
    setLoading(true);
    setErrorMessage("");

    try {
      await sendOtp(inputEmail);
      setOtpSent(true);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.email) {
        setErrorMessage(err.response.data.email[0]);
      } else if (err.response && err.response.data && err.response.data.detail) {
        setErrorMessage(err.response.data.detail);
      } else {
        setErrorMessage("Failed to send OTP. Check your email.");
      }
      console.error("Send OTP Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    const otp = e.target.otp.value.trim();
    setLoading(true);
    setErrorMessage("");

    try {
      const data = await verifyOtp({ email, otp });

      // Save tokens
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // Save user in Redux (with full user object)
      dispatch(setUser({
        username: data.user.username,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
      }));

      // Save user details to localStorage
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("first_name", data.user.first_name);
      localStorage.setItem("last_name", data.user.last_name);

      setIsLoggedIn(true);
      onClose();
    } catch (err) {
      setErrorMessage("Invalid OTP. Try again.");
      console.error("Verify OTP Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          defaultValue={email}
          disabled={otpSent}
        />
        {errorMessage && (
          <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
        )}

        {!otpSent ? (
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2ac1a7] hover:bg-[#27a994] text-white font-bold py-3 rounded-lg flex justify-center items-center"
          >
            {loading ? "Sending..." : "Send OTP"}
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
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2ac1a7] hover:bg-[#27a994] text-white font-bold py-3 rounded-lg"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </form>
      {!otpSent && (
        <p className="text-sm mt-2">
          Not registered? Please <a href="#" onClick={(e) => { e.preventDefault(); switchToSignUp(); }} className="text-teal-600 underline">register here</a>.
        </p>
      )}
    </>
  );
};

export default SignInForm;
