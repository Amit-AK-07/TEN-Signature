import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../../lib/config";
import { useNavigate } from "react-router-dom";

export default function RealEstateSearchForm({
  selectedCity,
  setSelectedCity,
  selectedCategory,
  setSelectedCategory,
  onOpenAdvanced,
}) {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesRes, categoriesRes] = await Promise.all([
          axios.get(`${BASE_URL}/cities/`),
          axios.get(`${BASE_URL}/categories/`),
        ]);

        const citiesData = citiesRes.data.results || [];
        const categoriesData = categoriesRes.data.results || [];

        setCities(citiesData);
        setCategories(categoriesData);

        // ✅ Ensure no city or category is preselected
        setSelectedCity("");
        setSelectedCategory("");

        setLoading(false);
      } catch (error) {
        console.error("Error fetching cities or categories:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [setSelectedCity, setSelectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();

    // ✅ Use IDs in URL
    if (selectedCity) {
      queryParams.append("city", selectedCity);
    }
    if (selectedCategory) {
      queryParams.append("category", selectedCategory);
    }

    navigate(`/listings?${queryParams.toString()}`);
  };

  if (loading) {
    return (
      <div className="text-center py-4 text-gray-500">Loading filters...</div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap lg:flex-nowrap items-center gap-4 p-6 rounded-b-xl bg-white"
    >
      {/* City Dropdown */}
      <select
        value={selectedCity || ""}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="flex-1 bg-[#f7f7f7] rounded-xl py-3 px-4 text-gray-500 text-sm"
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      {/* Category Dropdown */}
      <select
        value={selectedCategory || ""}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="flex-1 bg-[#f7f7f7] rounded-xl py-3 px-4 text-gray-500 text-sm"
      >
        <option value="">Select Property Type</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className="text-gray-700 flex items-center cursor-pointer"
          onClick={() => onOpenAdvanced()}
        >
          <FontAwesomeIcon icon={faSlidersH} />
          <span className="ml-2 font-semibold">Advanced</span>
        </button>

        <button
          type="submit"
          className="bg-[#22b99a] cursor-pointer rounded-xl w-12 h-12 flex items-center justify-center text-white"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
}