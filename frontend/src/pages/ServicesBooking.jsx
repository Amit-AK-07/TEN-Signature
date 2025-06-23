import React from "react";
import { useLocation } from "react-router-dom";
import { servicesData } from "../lib/Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FaRegCalendarAlt } from "react-icons/fa";

// import servicesData from "../../components/listings/Constant";

 function ServicesBooking() {
  const location = useLocation();
  const serviceId = location?.state?.serviceId;

  const serviceData = servicesData.find(
    (service) => service.serviceId === serviceId
  );

//   if (!serviceData) {
//     return (
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6 mt-4 text-center">
//         <h2 className="text-xl font-semibold mb-4">No service selected</h2>
//         <p>Please go back and select a service to book.</p>
//       </div>
//     );
//   }

  const {
    name,
    category,
    price,
    images = [],
    selectedAddOns = [],
  } = serviceData;

  const mainImage = images?.[0] || "https://via.placeholder.com/80";

  const [locationInput, setLocationInput] = React.useState("");
  const [dateTime, setDateTime] = React.useState("");

  const addOnsTotal = selectedAddOns.reduce(
    (acc, addOn) => acc + (addOn.price || 0),
    0
  );

  const subtotal = price + addOnsTotal;
  const tax = +(price * 0.18).toFixed(2);
  const totalPrice = +(subtotal + tax).toFixed(2);
  const advancePayment = +(totalPrice * 0.2).toFixed(2);

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
    <div className="max-w-6xl mx-auto bg-white p-6 mt-4 rounded-xl">
      {/* Header */}
      <div className="flex items-center bg-gray-50 gap-6 mb-6 p-6 border border-gray-300 rounded-lg">
        <div className="p-0 bg-white rounded-sm shrink-0">
          <img
            src={mainImage}
            alt={name}
            className="w-25 h-25 object-cover rounded-sm"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-xl font-bold">Food Photography by {name}</h2>
          <p className="text-gray-500 text-sm">Category: {category}</p>
        </div>
        <div className="ml-auto text-[#26c4a0] font-bold text-xl">
          ₹{price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
      </div>
      {/* Main Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Schedule Section */}
        <section className="md:flex-1 bg-white rounded-xl p-6 border border-gray-300 shadow self-start">
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
              {/* <FaRegCalendarAlt className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" /> */}
              <FontAwesomeIcon
                icon={["fas", "calendar-alt"]}
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
            className="inline-block bg-[#26c4a0] hover:bg-[#26c4a0] text-white font-semibold px-6 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
          >
            Use Current Location
          </button>
        </section>

        {/* Price Details */}
        <section className="w-full md:w-[340px] bg-white rounded-xl p-6 border border-gray-300 shadow">
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
              <span>Coupon Discount:</span>
              <span className="text-red-500">Not Applied</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18% on base price):</span>
              <span className="text-blue-600">
                +₹{tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <button className="w-full border border-[#26c4a0] text-[#26c4a0] font-semibold py-2 rounded-lg hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-600 mb-4">
            Apply Coupon
          </button>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg mb-2">
            <span>Total:</span>
            <span>
              ₹
              {totalPrice.toLocaleString(undefined, {
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
          <button className="w-full bg-[#26c4a0] hover:bg-[#26c4a0] text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700">
            Pay Advance
          </button>
        </section>
      </div>
         
    </div>
  );
}

export  default ServicesBooking;