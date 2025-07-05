import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signUp } from "../../apiAction/login/Index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";

const SignUpForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const registerMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      // Reset form on success
      setFormData({ firstName: '', lastName: '', email: '' });
      setTimeout(() => {
        onClose();
      }, 2000);
    },
    onError: (error) => {
      console.error('Registration error:', error);
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  // Show message/error alerts
  const renderAlert = () => {
    if (registerMutation.isSuccess) {
      return (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">Registration successful! Please proceed to login.</p>
        </div>
      );
    }
    if (registerMutation.isError) {
      return (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">
            {registerMutation.error?.response?.data?.detail || registerMutation.error?.response?.data?.email?.[0] || 'Registration failed. Please try again.'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {renderAlert()}
      <form className="space-y-4" onSubmit={handleSignupSubmit}>
        <div>
          <label className="text-sm font-semibold" name="firstName">
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-3 w-full text-sm text-gray-600 mt-1"
            disabled={registerMutation.isLoading}
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
            value={formData.lastName}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-3 w-full text-sm text-gray-600 mt-1"
            disabled={registerMutation.isLoading}
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
            value={formData.email}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-3 w-full text-sm text-gray-600 mt-1"
            disabled={registerMutation.isLoading}
            required
          />
        </div>
        <button
          type="submit"
          disabled={registerMutation.isLoading}
          className="w-full bg-[#2ac1a7] hover:bg-[#27a994] text-white font-bold py-3 rounded-lg flex justify-center items-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="cursor-pointer">
            {registerMutation.isLoading ? 'Creating Account...' : 'Sign Up'}
          </span>
          <FontAwesomeIcon
            icon={faSquareArrowUpRight}
            className="h-4 w-4 text-white"
          />
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;