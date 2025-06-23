import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { signUp } from "../../apiAction/login/Index";
import { setUser } from "../../redux/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";

const SignUpForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const registerMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      alert("Registration successful. Please verify OTP to login.");
      onClose();
    },
    onError: (error) => {
      alert(
        "Registration failed: " +
          (error.response?.data?.detail || error.message || "Unknown error")
      );
    },
  });

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const userData = {
      first_name: e.target.firstName.value,
      last_name: e.target.lastName.value,
      email: e.target.email.value,
    };
    registerMutation.mutate(userData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSignupSubmit}>
      <div>
        <label className="text-sm font-semibold" htmlFor="firstName">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          placeholder="Enter First Name"
          name="firstName"
          className="border rounded-lg px-4 py-3 w-full text-sm text-gray-600 mt-1"
          required
        />
      </div>
      <div>
        <label className="text-sm font-semibold" htmlFor="lastName">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          placeholder="Enter Last Name"
          name="lastName"
          className="border rounded-lg px-4 py-3 w-full text-sm text-gray-600 mt-1"
          required
        />
      </div>
      <div>
        <label className="text-sm font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter Email"
          className="border rounded-lg px-4 py-3 w-full text-sm text-gray-600 mt-1"
          required
        />
      </div>
      <button
        type="submit"
        disabled={registerMutation.isLoading}
        className={`w-full bg-[#2ac1a7] text-white font-bold py-3 rounded-lg flex justify-center items-center space-x-2 ${
          registerMutation.isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#27a994]"
        }`}
      >
        <span>{registerMutation.isLoading ? "Signing Up..." : "Sign Up"}</span>
        <FontAwesomeIcon
          icon={faSquareArrowUpRight}
          className="h-4 w-4 text-white"
        />
      </button>
    </form>
  );
};

export default SignUpForm;
