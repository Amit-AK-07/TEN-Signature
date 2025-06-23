import React, { useState } from 'react';

export default function MapLocationForm() {
  const [formData, setFormData] = useState({
    city: '',
    state: '',
    country: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded shadow ">
      {/* Google Map */}
      <div className="w-full aspect-video mb-6 rounded overflow-hidden shadow-md">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8391987369!2d77.04417253093043!3d28.52728034315992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3a0b21cbbfd%3A0xe0148ef5194eb0df!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1680953940387!5m2!1sen!2sin"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="w-full h-full border-0"
        ></iframe>
      </div>

      {/* Form Inputs */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            className="w-full border border-gray-300 rounded-md p-3"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
            className="w-full border border-gray-300 rounded-md p-3"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
            className="w-full border border-gray-300 rounded-md p-3"
          />
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 lg:col-span-3 mt-4">
          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition"
          >
            Submit Listing
          </button>
        </div>
      </form>
    </div>
  );
}
