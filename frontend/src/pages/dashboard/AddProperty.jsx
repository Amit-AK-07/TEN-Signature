import { useState } from "react";
import { bookingsData } from "../../lib/Constant";
import Sidebar from "../../components/dashboard/Sidebar";
import PhotosUploadForm from "../../components/dashboardpages/PhotosUploadForm";
import MapLocationForm from "../../components/dashboardpages/MapLocationForm";
import { useLogout } from "../../hooks/useAuth";

const AddProperty = () => {
  const [bookings] = useState(bookingsData);
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
  };
  const categories = ["Commercial", "Residential", "Plot"];
  const propertyForOptions = ["Rent", "Sale"];
  const sellerTypes = ["Owner", "Agent", "Builder"];

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    propertyFor: "",
    sellerType: "",
    description: "",
    price: "",
    size: "",
    age: "",
    rental: "",
    sales: "",
    brand: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <div className="flex">
      <div className="">
        <Sidebar onLogout={handleLogout} />
      </div>
      <div className="flex-1 px-4 py-2 md:px-15 bg-[#fff] min-h-screen">
        <div className="py-12">
          <h1 className="text-3xl font-bold mb-3">Add New Property</h1>
          <p className="text-gray-500">We are glad to see you again!</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full p-4 md:p-8 bg-white rounded shadow"
        >
          <h2 className="text-xl font-semibold mb-6">Property Description</h2>

          {/* Title */}
          <input
            name="title"
            type="text"
            placeholder="Title for your listing"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 mb-6"
          />

          {/* Category, Property For, Seller Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              name="propertyFor"
              value={formData.propertyFor}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3"
            >
              <option value="">Select Property For</option>
              {propertyForOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <select
              name="sellerType"
              value={formData.sellerType}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3"
            >
              <option value="">Select Seller Type</option>
              {sellerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="There are many variations of passages."
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-3 mb-6"
          />

          {/* Price, Size, Age, Rental, Sales, Brand */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              name="price"
              type="number"
              placeholder="e.g 10000"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3"
            />

            <input
              name="size"
              type="number"
              placeholder="Area in sqft"
              value={formData.size}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3"
            />

            <input
              name="age"
              type="number"
              placeholder="Property is how much year old"
              value={formData.age}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3"
            />

            <input
              name="rental"
              type="number"
              placeholder="e.g 10000"
              value={formData.rental}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3"
            />

            <input
              name="sales"
              type="number"
              placeholder="e.g 10000"
              value={formData.sales}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3"
            />

            <input
              name="brand"
              type="text"
              placeholder="e.g Flashback Cafe"
              value={formData.brand}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </form>
        <PhotosUploadForm />
        <MapLocationForm />
      </div>
    </div>
  );
};

export default AddProperty;
