import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../lib/config";

export default function AdvancedModal({ onClose }) {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedType, setSelectedType] = useState(""); // category ID
  const [selectedLocation, setSelectedLocation] = useState(""); // city ID

  const minLimit = 0;
  const maxLimit = 10000000;

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [citiesRes, categoriesRes] = await Promise.all([
          axios.get(`${BASE_URL}/cities/`),
          axios.get(`${BASE_URL}/categories/`),
        ]);
        setCities(citiesRes.data.results || []);
        setCategories(categoriesRes.data.results || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching filters:", error);
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (selectedLocation) queryParams.append("city", selectedLocation); // send city.id
    if (selectedType) queryParams.append("category", selectedType); // send category.id
    if (minPrice) queryParams.append("min_price", minPrice);
    if (maxPrice) queryParams.append("max_price", maxPrice);

    navigate(`/listings?${queryParams.toString()}`);
    onClose();
  };

  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    if (value <= (maxPrice || maxLimit)) setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    if (value >= (minPrice || minLimit)) setMaxPrice(value);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative text-center">
          <h2 className="text-lg text-gray-600">Loading filters...</h2>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-2xl p-6 relative"
      >
        <button
          className="cursor-pointer absolute top-4 right-4 text-3xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-6">More Filters</h2>

        {/* Price Range Slider */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Price Range</label>

          <div className="relative h-10 mb-4 flex items-center">
            <div className="absolute w-full h-2 bg-gray-300 rounded-md z-0" />

            <div
              className="absolute h-2 bg-[#22b99a] rounded-md z-10"
              style={{
                left: `${((minPrice || minLimit) / maxLimit) * 100}%`,
                width: `${
                  (((maxPrice || maxLimit) - (minPrice || minLimit)) /
                    maxLimit) *
                  100
                }%`,
              }}
            />

            <input
              type="range"
              min={minLimit}
              max={maxLimit}
              value={minPrice || minLimit}
              onChange={handleMinPriceChange}
              className="absolute w-full h-2 appearance-none bg-transparent"
              style={{ zIndex: minPrice >= maxPrice ? 40 : 30 }}
            />

            <input
              type="range"
              min={minLimit}
              max={maxLimit}
              value={maxPrice || maxLimit}
              onChange={handleMaxPriceChange}
              className="absolute w-full h-2 appearance-none bg-transparent"
              style={{ zIndex: maxPrice <= minPrice ? 40 : 30 }}
            />
          </div>

          {/* Min/Max Price Inputs */}
          <div className="flex items-center space-x-2">
            <input
              placeholder="₹0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 border rounded-lg px-3 py-2"
            />
            <span className="text-gray-500">–</span>
            <input
              placeholder="₹1 Cr+"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Type & Location Dropdowns */}
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label className="block mb-2">Type</label>
            <select
              className="w-full border rounded-lg px-4 py-2"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Select...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2">
            <label className="block mb-2">Location</label>
            <select
              className="w-full border rounded-lg px-4 py-2"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select...</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSearch}
            className="bg-[#22b99a] cursor-pointer px-6 py-2 rounded-lg text-white font-semibold"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}