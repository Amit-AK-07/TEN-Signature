import { useState } from "react";

const PriceFilter = () => {
  const minLimit = 0;
  const maxLimit = 10000000;

  const [minPrice, setMinPrice] = useState(minLimit);
  const [maxPrice, setMaxPrice] = useState(maxLimit);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxPrice) setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= minPrice) setMaxPrice(value);
  };

  return (
    <div className="pb-6 rounded-xl max-w-2xl mx-auto">
      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-2">
          Price Range
        </label>

        {/* Sliders */}
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

        {/* Input fields */}
        <div className="flex flex-row gap-4 w-full">
          <div className="flex-1">
            <input
              type="text"
              value={`₹${minPrice.toLocaleString()}`}
              readOnly
              className="w-full px-4 py-2 border rounded-lg text-sm border-gray-300 bg-gray-100 text-gray-700"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={`₹${maxPrice.toLocaleString()}`}
              readOnly
              className="w-full px-4 py-2 border rounded-lg text-sm border-gray-300 bg-gray-100 text-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
