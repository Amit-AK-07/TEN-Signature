import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { sendOTP, verifyOTP } from "../../apiAction/login/Index";
import { setUser } from "../../redux/authSlice";

const SignInForm = ({ onClose }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const emailValue = e.target.email.value;
    setEmail(emailValue);
    
    try {
      await sendOTP(emailValue);
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.email?.[0] || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const otp = e.target.otp.value;
    
    try {
      const response = await verifyOTP({ email, otp });
      
      // Store tokens in localStorage (respects backend token expiry)
      if (response.access) {
        localStorage.setItem("authToken", response.access);
      }
      if (response.refresh) {
        localStorage.setItem("refreshToken", response.refresh);
      }
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      
      // Update Redux state
      dispatch(setUser({
        user: response.user,
        token: response.access
      }));
      
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={otpSent ? handleOtpVerify : handleLoginSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <label htmlFor="email" className="text-sm font-semibold">
        Enter Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter Email"
        className="border rounded-lg px-4 py-3 w-full text-sm text-gray-600"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={otpSent || loading}
        required
      />

      {!otpSent ? (
        <button 
          type="submit" 
          className="w-full bg-[#2ac1a7] hover:bg-[#27a994] disabled:bg-gray-400 text-white font-bold py-3 rounded-lg"
          disabled={loading}
        >
          <span>{loading ? "Sending..." : "Send OTP"}</span>
          {!loading && <FontAwesomeIcon icon={faSquareArrowUpRight} className="h-4 w-4 ml-2" />}
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
            disabled={loading}
            required
          />
          <button 
            type="submit" 
            className="w-full bg-[#2ac1a7] hover:bg-[#27a994] disabled:bg-gray-400 text-white font-bold py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}
    </form>
  );
};

export default SignInForm;