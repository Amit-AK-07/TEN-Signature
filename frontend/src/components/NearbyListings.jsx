import { useState } from "react";
import PropertyCards from "./PropertyCards"; // import this

const NearbyListings = () => {
  const [activeTab, setActiveTab] = useState("rent");

  return (
    <section className="w-full px-4 md:px-10 lg:px-20 py-12 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Left side */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Discover Near By Listings
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Find properties close to this location that match your preferences.
          </p>
        </div>

        {/* Right side toggle buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("rent")}
            className={`px-6 py-2 rounded-md font-semibold text-sm transition cursor-pointer ${
              activeTab === "rent"
                ? "bg-gray-900 text-white"
                : "border border-gray-400 text-gray-900 bg-white"
            }`}
          >
            For Rent
          </button>

          <button
            onClick={() => setActiveTab("sale")}
            className={`px-6 py-2 rounded-md font-semibold text-sm transition cursor-pointer ${
              activeTab === "sale"
                ? "bg-gray-900 text-white"
                : "border border-gray-400 text-gray-900 bg-white"
            }`}
          >
            For Sale
          </button>
        </div>
      </div>

      {/* Render property cards based on active tab */}
      <PropertyCards activeTab={activeTab} />
    </section>
  );
};

export default NearbyListings;
