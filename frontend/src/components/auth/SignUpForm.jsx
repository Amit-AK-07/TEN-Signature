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
      dispatch(setUser({ user: data.user, token: data.token }));
      localStorage.setItem("authToken", data.token);
      onClose();
    },
  });

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
    };
    registerMutation.mutate(userData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSignupSubmit}>
      <div>
        <label className="text-sm font-semibold" name="firstName">
          First Name
        </label>
        <input
          type="text"
          placeholder="Enter First Name"
          name="firstName"
          className="border rounded-lg px-4 py-3 w-full text-sm text-gray-600 mt-1"
          required
        />
      </div>
      <div>
        <label className="text-sm font-semibold" name="lastName">
          Last Name
        </label>
        <input
          type="text"
          placeholder="Enter Last Name"
          name="lastName"
          className="border rounded-lg px-4 py-3 w-full text-sm text-gray-600 mt-1"
          required
        />
      </div>
      <div>
        <label className="text-sm font-semibold" name="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="border rounded-lg px-4 py-3 w-full text-sm text-gray-600 mt-1"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#2ac1a7] hover:bg-[#27a994] text-white font-bold py-3 rounded-lg flex justify-center items-center space-x-2 cursor-pointer"
      >
        <span className="cursor-pointer">Sign Up</span>
        <FontAwesomeIcon
          icon={faSquareArrowUpRight}
          className="h-4 w-4 text-white"
        />
      </button>
    </form>
  );
};

export default SignUpForm;
