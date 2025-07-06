import { useState, useMemo, useEffect } from "react";

const FilterSidebar = ({
  filters,
  onChange,
  onReset,
  cities = [],
  categories = [],
}) => {
  const minLimit = 0;
  const maxLimit = 10000000;

  // Local state for temporary filter values
  const [tempFilters, setTempFilters] = useState({
    location: "",
    category: "",
    property_for: "",
    minPrice: "",
    maxPrice: "",
  });

  const [minPrice, setMinPrice] = useState(minLimit);
  const [maxPrice, setMaxPrice] = useState(maxLimit);

  // ✅ Update tempFilters whenever filters prop changes
  useEffect(() => {
    setTempFilters(filters);
    if (filters.minPrice) {
      setMinPrice(Number(filters.minPrice));
    } else {
      setMinPrice(minLimit);
    }

    if (filters.maxPrice) {
      setMaxPrice(Number(filters.maxPrice));
    } else {
      setMaxPrice(maxLimit);
    }
  }, [filters]);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxPrice) {
      setMinPrice(value);
      setTempFilters((prev) => ({ ...prev, minPrice: value.toString() }));
    }
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= minPrice) {
      setMaxPrice(value);
      setTempFilters((prev) => ({ ...prev, maxPrice: value.toString() }));
    }
  };

  const handleTempFilterChange = (key, value) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    // ✅ Apply all temp filters using the onChange callback
    Object.keys(tempFilters).forEach((key) => {
      if (tempFilters[key] !== (filters[key] || "")) {
        onChange(key, tempFilters[key]);
      }
    });
  };

  const handleReset = () => {
    const resetFilters = {
      location: "",
      category: "",
      property_for: "",
      minPrice: "",
      maxPrice: "",
    };
    setTempFilters(resetFilters);
    setMinPrice(minLimit);
    setMaxPrice(maxLimit);
    onReset(); // ✅ Reset parent filters
  };

  const dynamicFilterOptions = useMemo(() => {
    const locationOptions = [{ id: "", name: "All Locations" }];
    if (Array.isArray(cities) && cities.length > 0) {
      locationOptions.push(
        ...cities.map((city) => ({ id: city.id, name: city.name }))
      );
    }

    const categoryOptions = [{ id: "", name: "All Categories" }];
    if (Array.isArray(categories) && categories.length > 0) {
      categoryOptions.push(
        ...categories.map((cat) => ({ id: cat.id, name: cat.name }))
      );
    }

    return [
      {
        label: "Location",
        key: "location",
        options: locationOptions,
      },
      {
        label: "Category",
        key: "category",
        options: categoryOptions,
      },
      {
        label: "Property For",
        key: "property_for",
        options: [
          { id: "", name: "All" },
          { id: "1", name: "Sale" },
          { id: "0", name: "Rent" },
        ],
      },
    ];
  }, [cities, categories]);

  return (
    <aside className="bg-gray-50 p-4 rounded-xl shadow space-y-6 sticky top-6">
      {dynamicFilterOptions.map(({ label, key, options }) => (
        <div key={key}>
          <label className="block font-semibold mb-2 text-gray-700">
            {label}
          </label>
          <select
            value={tempFilters[key] || ""}
            onChange={(e) => handleTempFilterChange(key, e.target.value)}
            className="w-full border rounded-lg px-4 py-2 bg-white"
          >
            {options.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Price Range Slider */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">
          Price Range
        </label>
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

        <div className="flex items-center space-x-2">
          <input
            placeholder="₹0"
            value={tempFilters.minPrice || ""}
            onChange={(e) => handleTempFilterChange("minPrice", e.target.value)}
            className="w-1/2 border rounded-lg px-3 py-2"
          />
          <span className="text-gray-500">–</span>
          <input
            placeholder="₹1 Cr+"
            value={tempFilters.maxPrice || ""}
            onChange={(e) => handleTempFilterChange("maxPrice", e.target.value)}
            className="w-1/2 border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full bg-[#26c4a0] hover:bg-[#1a9f85] text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
      >
        Search
      </button>

      <button
        onClick={handleReset}
        className="text-sm text-gray-500 underline w-full text-center"
      >
        Reset all filters
      </button>
    </aside>
  );
};

export default FilterSidebar;