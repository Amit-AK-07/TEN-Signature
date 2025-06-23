import { useState, useEffect } from "react";
import axios from "axios";

const FilterSidebar = ({ filters, onChange, onReset, onSearch }) => {
  const minLimit = 0;
  const maxLimit = 10000000;

  const [minPrice, setMinPrice] = useState(minLimit);
  const [maxPrice, setMaxPrice] = useState(maxLimit);

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  // Static options for Property For
  const propertyTypes = [
    { label: "All", value: "" },
    { label: "Sale", value: 1 },
    { label: "Rent", value: 0 },
  ];

  useEffect(() => {
    axios.get("http://localhost:8000/api/categories/")
      .then((res) => setCategories(res.data.results))
      .catch((err) => console.error("Category fetch error:", err));

    axios.get("http://localhost:8000/api/cities/")
      .then((res) => setCities(res.data.results))
      .catch((err) => console.error("City fetch error:", err));
  }, []);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxPrice) setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= minPrice) setMaxPrice(value);
  };

  return (
    <aside className="bg-gray-50 p-4 rounded-xl shadow space-y-6 sticky top-6">

      {/* Property For (static) */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">Property For</label>
        <select
          value={filters.property_for}
          onChange={(e) => onChange("property_for", e.target.value)}
          className="w-full border rounded-lg px-4 py-2 bg-white"
        >
          {propertyTypes.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category (from backend) */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">Category</label>
        <select
          value={filters.category}
          onChange={(e) => onChange("category", e.target.value)}
          className="w-full border rounded-lg px-4 py-2 bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* City (from backend) */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">City</label>
        <select
          value={filters.city}
          onChange={(e) => onChange("city", e.target.value)}
          className="w-full border rounded-lg px-4 py-2 bg-white"
        >
          <option value="">All Locations</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Slider */}
      <div className="relative h-10 mb-4 flex items-center">
        <div className="absolute w-full h-2 bg-gray-300 rounded-md z-0" />
        <div
          className="absolute h-2 bg-[#22b99a] rounded-md z-10"
          style={{
            left: `${(minPrice / maxLimit) * 100}%`,
            width: `${((maxPrice - minPrice) / maxLimit) * 100}%`,
          }}
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minPrice}
          onChange={handleMinChange}
          className="absolute w-full h-2 appearance-none bg-transparent"
          style={{ zIndex: minPrice >= maxPrice ? 40 : 30 }}
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxPrice}
          onChange={handleMaxChange}
          className="absolute w-full h-2 appearance-none bg-transparent"
          style={{ zIndex: maxPrice <= minPrice ? 40 : 30 }}
        />
      </div>

      {/* Price Range Inputs */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">Price Range</label>
        <div className="flex items-center space-x-2">
          <input
            placeholder="₹0"
            value={filters.minPrice}
            onChange={(e) => onChange("minPrice", e.target.value)}
            className="w-1/2 border rounded-lg px-3 py-2"
          />
          <span className="text-gray-500">–</span>
          <input
            placeholder="₹1 Cr+"
            value={filters.maxPrice}
            onChange={(e) => onChange("maxPrice", e.target.value)}
            className="w-1/2 border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Buttons */}
      <button
        onClick={onSearch}
        className="w-full bg-[#26c4a0] hover:bg-[#1a9f85] text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
      >
        Search
      </button>

      <button
        onClick={onReset}
        className="text-sm text-gray-500 underline w-full text-center"
      >
        Reset all filters
      </button>
    </aside>
  );
};

export default FilterSidebar;