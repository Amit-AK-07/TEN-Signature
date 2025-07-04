import { useState } from "react";
import VisitOffice from "../components/VisitOffice";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    outlet_type: "",
    location: "",
    brand_name: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Predefined cities list
  const cities = [
    "New Delhi",
    "Gurgaon (Delhi NCR)",
    "Noida (Delhi NCR)",
    "Faridabad (Delhi NCR)",
    "Ghaziabad (Delhi NCR)",
    "Mumbai",
    "Bangalore",
    "Other"
  ];

  // Hardcoded outlet types
  const outletTypes = [
    "Cloud kitchen",
    "Restaurant",
    "Take Away"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://broki-clone-ui.onrender.com/api/submit-contact-form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
        alert('Thank you! Your form has been submitted successfully.');
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          outlet_type: "",
          location: "",
          brand_name: "",
        });
      } else {
        console.error('Form submission failed');
        alert('Sorry, there was an error submitting your form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="relative w-full font-[poppins]">
        {/* Google Map Embed */}
        <div className="absolute top-0 left-0 w-full h-[500px] sm:h-[600px] z-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.4006632054!2d77.0688994424711!3d28.527582007847342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03072bb27f2f%3A0x9bc88a4f034fdf3e!2sBroki%20Services%20Private%20Limited!5e0!3m2!1sen!2sin!4v1716540893883!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Overlay Box */}
        <div className="absolute top-5 left-5 z-10 bg-white shadow-lg rounded-md p-3 text-xs max-w-xs">
          <strong>Broki Services Private Limited</strong>
          <br />
          Rattan Jyoti Building, G-1/18, 18,
          <br />
          Rajendra Place, New Delhi, Delhi 110008
          <br />
          <span className="text-yellow-500">★★★★★</span> 6 reviews
          <br />
          <a
            href="https://www.google.com/maps"
            className="text-blue-500 underline text-xs"
            target="_blank"
            rel="noopener noreferrer"
          >
            View larger map
          </a>
        </div>

        {/* Content Section */}
        <div className="relative z-10 px-4 md:px-10 pt-[520px] sm:pt-[640px] md:pt-[140px]">
          {/* Tablet & Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-10 items-end">
            {/* Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-[20px] font-semibold mb-4">
                Have questions? Get in touch!
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26c4a0] focus:border-transparent"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26c4a0] focus:border-transparent"
                    placeholder="Your Phone Number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26c4a0] focus:border-transparent"
                    placeholder="Your Email ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Outlet Type
                  </label>
                  <select
                    name="outlet_type"
                    value={formData.outlet_type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26c4a0] focus:border-transparent"
                    required
                  >
                    <option value="">Select Outlet Type...</option>
                    {outletTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26c4a0] focus:border-transparent"
                    required
                  >
                    <option value="">Select Location...</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    name="brand_name"
                    value={formData.brand_name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26c4a0] focus:border-transparent"
                    placeholder="E.g. Flashback Cafe Or NA"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#26c4a0] text-white py-2 rounded-md mt-2 font-semibold hover:bg-[#1fae8c] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#26c4a0] focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>

            {/* Text Section */}
            <div className="flex items-end justify-center md:justify-start">
              <div className="text-[#181a20] md:text-[#181a20] md:bg-transparent bg-white bg-opacity-90 p-6 rounded-lg max-w-md">
                <h2 className="text-[24px] md:text-[30px] font-bold mb-2">
                  We'd Love To Hear From You.
                </h2>
                <p className="text-sm leading-relaxed">
                  We are here to answer any question you may have. Let's start
                  the conversation and make something amazing together!
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Layout: Form below map */}
          <div className="md:hidden mt-10 space-y-6">
            {/* Text Section */}
            <div className="text-[#181a20] bg-white bg-opacity-90 p-6 rounded-lg shadow max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-2">
                We'd Love To Hear From You.
              </h2>
              <p className="text-sm leading-relaxed">
                We are here to answer any question you may have. Let's start the
                conversation and make something amazing together!
              </p>
            </div>

            {/* Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
              <h2 className="text-[20px] font-semibold mb-4">
                Have questions? Get in touch!
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26c4a0] focus:border-transparent"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26c4a0] focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email ID"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26c4a0] focus:border-transparent"
                  required
                />
                <select
                  name="outlet_type"
                  value={formData.outlet_type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26c4a0] focus:border-transparent"
                  required
                >
                  <option value="">Select Outlet Type...</option>
                  {outletTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26c4a0] focus:border-transparent"
                  required
                >
                  <option value="">Select Location...</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="brand_name"
                  placeholder="E.g. Flashback Cafe Or NA"
                  value={formData.brand_name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#26c4a0] focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#26c4a0] text-white py-2 rounded-md font-semibold hover:bg-[#1fae8c] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#26c4a0] focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <VisitOffice />
    </>
  );
};

export default ContactUs;