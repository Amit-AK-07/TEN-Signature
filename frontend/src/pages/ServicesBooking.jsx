import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

function ServicesBooking() {
  const location = useLocation();

  const {
    serviceData = {}, // fallback if undefined
    selectedAddOns = [],
    addOnsTotal = 0,
    tax = 0,
    totalPrice = 0,
  } = location?.state || {};

  if (!serviceData.name) {
    return (
      <div className="text-center py-10 text-red-500">
        ❌ Service details not found.
      </div>
    );
  }

  const {
    name = "Unknown Service",
    category_name = "Unknown Category",
    price = 0,
    attchments = [],
  } = serviceData;

  const mainImage =
    attchments?.length > 0 ? attchments[0] : "https://via.placeholder.com/300";

  const [locationInput, setLocationInput] = useState("");
  const [dateTime, setDateTime] = useState("");

  const subtotal = Number(price) + Number(addOnsTotal);
  const calculatedTax = +(subtotal * 0.18).toFixed(2);
  const calculatedTotal = +((subtotal || 0) + (calculatedTax || 0)).toFixed(2);
  const advancePayment = +(calculatedTotal * 0.2).toFixed(2);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationInput(
          `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`
        );
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 mt-4 rounded-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-50 gap-4 sm:gap-6 mb-6 p-4 sm:p-6 border border-gray-300 rounded-lg">
        <div className="bg-white rounded-sm shrink-0">
          <img
            src={mainImage}
            alt={name}
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-sm "
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300";
            }}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-gray-500 text-sm">Category: {category_name}</p>
        </div>
        <div className="text-[#26c4a0] font-bold text-xl sm:ml-auto">
          ₹{price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Schedule Section */}
        <section className="w-full lg:flex-1 bg-white rounded-xl p-4 border border-gray-300 shadow">
          <h3 className="text-lg font-semibold mb-4">Schedule Service</h3>

          <div className="mb-4">
            <label
              htmlFor="datetime"
              className="block text-sm mb-1 font-medium"
            >
              Date and Time
            </label>
            <div className="relative">
              <input
                id="datetime"
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm pr-10 focus:outline-teal-600 focus:ring-1 focus:ring-teal-600"
              />
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm mb-1 font-medium"
            >
              Location
            </label>
            <textarea
              id="location"
              rows={2}
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Enter service location"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-teal-600 focus:ring-1 focus:ring-teal-600 resize-none"
            />
          </div>

          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="w-full sm:w-auto bg-[#26c4a0] hover:bg-[#1aa68c] text-white font-semibold px-6 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
          >
            Use Current Location
          </button>
        </section>

        {/* Price Details */}
        <section className="w-full lg:w-[340px] bg-white rounded-xl p-4 border border-gray-300 shadow">
          <h3 className="text-lg font-semibold mb-4">Price Details</h3>
          <div className="text-sm text-gray-700 space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Service Price:</span>
              <span>
                ₹{price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Addons:</span>
              <span className="text-[#26c4a0]">
                +₹
                {addOnsTotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%):</span>
              <span className="text-blue-600">
                +₹
                {calculatedTax.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg mb-2">
            <span>Total:</span>
            <span>
              ₹
              {calculatedTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="text-xs text-gray-500 mb-4">
            Advance Payment (20%): ₹
            {advancePayment.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
          <button className="w-full bg-[#26c4a0] hover:bg-[#1aa68c] text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700">
            Pay Advance
          </button>
        </section>
      </div>
    </div>
  );
}

export default ServicesBooking;
