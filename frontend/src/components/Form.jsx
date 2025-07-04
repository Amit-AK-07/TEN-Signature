import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { locationOptions, outletOptions } from "../lib/Constant";
import FormImg from "../assets/images/form.webp";

// Animation Variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Reusable Text Input
const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-[15px] font-semibold text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded-md border border-gray-300 px-4 py-3 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
    />
  </div>
);

// Reusable Select Input
const SelectInput = ({ label, name, value, onChange, options }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-[15px] font-semibold text-gray-700 mb-1"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full rounded-md border border-gray-300 px-4 py-3 text-[15px] text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value} disabled={value === ""}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    outlet_type: "", // ✅ API field
    location: "",
    brand: "",
    max_budget: "", // ✅ API field
    min_size: "", // ✅ API field
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://broki-clone-ui.onrender.com/api/submit-form/",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Form submitted successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          outlet_type: "",
          location: "",
          brand: "",
          max_budget: "",
          min_size: "",
        });
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to submit the form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full bg-[#f7f7f7] px-4 py-8 font-[poppins] text-[15px]"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-[20px] md:text-[30px] font-extrabold text-gray-900 mb-1 max-md:text-center"
          variants={formVariants}
        >
          LOOKING For something specific
        </motion.h2>
        <motion.p
          className="text-[15px] text-gray-700 mb-8 max-md:text-center"
          variants={formVariants}
        >
          Let us know. Our team will get it for you!
        </motion.p>

        <div className="flex flex-col lg:flex-row lg:space-x-16 items-center">
          {/* Form section */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex-1 w-full space-y-6"
            noValidate
            variants={formVariants}
          >
            <TextInput
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
            <TextInput
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone Number"
              required
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email ID"
              required
            />
            <SelectInput
              label="Outlet Type"
              name="outlet_type" // ✅ API field
              value={formData.outlet_type}
              onChange={handleChange}
              options={outletOptions}
            />
            <SelectInput
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              options={locationOptions}
            />
            <TextInput
              label="Brand Name"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="E.g. Flashback Cafe Or NA"
            />
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <TextInput
                  label="Max Budget"
                  name="max_budget" // ✅ API field
                  value={formData.max_budget}
                  onChange={handleChange}
                  placeholder="Budget"
                />
              </div>
              <div className="w-full md:w-1/2">
                <TextInput
                  label="Min Size (Sq ft)"
                  name="min_size" // ✅ API field
                  value={formData.min_size}
                  onChange={handleChange}
                  placeholder="Area Required"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-teal-400" : "bg-teal-500 hover:bg-teal-600"
              } text-white font-semibold py-3 rounded-md text-center flex items-center justify-center space-x-2 cursor-pointer`}
            >
              {loading ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>Submit</span>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="text-sm"
                  />
                </>
              )}
            </button>

            {/* Success and Error messages */}
            {successMessage && (
              <p className="text-green-600 text-sm font-medium mt-2">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-red-600 text-sm font-medium mt-2">
                {errorMessage}
              </p>
            )}
          </motion.form>

          {/* Image section */}
          <motion.div
            className="flex-1 mt-12 lg:mt-0 flex justify-center items-center"
            variants={imageVariants}
          >
            <img
              src={FormImg}
              alt="Man with headset illustration"
              className="max-w-full h-auto"
              width="600"
              height="400"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Form;