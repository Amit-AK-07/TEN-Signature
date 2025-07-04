import { useState, useEffect } from "react";
import axios from "axios";
import { filterOptions } from "../lib/Constant";

const FilterSidebar = ({ filters, onChange, onReset }) => {
  const minLimit = 0;
  const maxLimit = 10000000;

  const [minPrice, setMinPrice] = useState(minLimit);
  const [maxPrice, setMaxPrice] = useState(maxLimit);

  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [citiesRes, categoriesRes] = await Promise.all([
          axios.get("https://broki-clone-ui.onrender.com/api/cities/"),
          axios.get("https://broki-clone-ui.onrender.com/api/categories/"),
        ]);

        setCities(citiesRes.data.results);
        setCategories(categoriesRes.data.results);
      } catch (error) {
        console.error("Failed to load filter data:", error);
      }
    };

    fetchFilterData();
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
      {filterOptions.map(({ label, key, options }) => {
        let apiOptions = options;

        if (key === "location" && cities.length > 0) {
          apiOptions = ["All Locations", ...cities.map((c) => c.name)];
        }

        if (key === "category" && categories.length > 0) {
          apiOptions = ["All Categories", ...categories.map((c) => c.name)];
        }

        return (
          <div key={key}>
            <label className="block font-semibold mb-2 text-gray-700">
              {label}
            </label>
            <select
              value={filters[key]}
              onChange={(e) => onChange(key, e.target.value)}
              className="w-full border rounded-lg px-4 py-2 bg-white"
            >
              {apiOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );
      })}

      {/* Price slider */}
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
        <label className="block font-semibold mb-2 text-gray-700">
          Price Range
        </label>
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

      <button
        onClick={() => {}}
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
