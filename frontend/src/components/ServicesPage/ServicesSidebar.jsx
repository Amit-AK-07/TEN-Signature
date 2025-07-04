const ServiceAddOnSidebar = ({
  addOns,
  selectedAddOns,
  toggleAddOn,
  price,
  addOnsTotal,
  tax,
  totalPrice,
  handleProceed,
}) => {
  return (
    <div className="w-full sticky top-20">
      {/* Add-ons Section */}
      <h3 className="font-semibold text-gray-800 text-lg mb-4">
        Enhance Your Service
      </h3>

      {addOns.length > 0 ? (
        <div className="space-y-4 mb-6">
          {addOns.map((addon) => {
            const isSelected = selectedAddOns.some((a) => a.id === addon.id);
            return (
              <div
                key={addon.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white rounded-lg p-3 shadow-sm border border-gray-200"
              >
                {/* Left: Icon + Text */}
                <div className="flex items-center gap-3">
                  {addon.serviceaddon_image && (
                    <img
                      src={addon.serviceaddon_image}
                      alt={addon.name}
                      className="w-10 h-10 object-contain rounded"
                    />
                  )}
                  <div>
                    <p className="text-gray-800 text-sm font-medium">
                      {addon.name}
                    </p>
                    <p className="text-[#26c4a0] font-semibold text-sm">
                      ₹{addon.price}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => toggleAddOn(addon)}
                  aria-label={isSelected ? "Remove Add-on" : "Add Add-on"}
                  className={`px-4 py-1 text-sm rounded-lg text-white w-full sm:w-auto ${
                    isSelected
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-[#26c4a0] hover:bg-[#1aa68c]"
                  }`}
                >
                  {isSelected ? "Remove" : "Add"}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600 mb-6">
          No add-ons available for this service.
        </p>
      )}

      {/* Price Summary */}
      <h3 className="font-semibold text-[20px] text-gray-800 mb-2">
        Price Breakup
      </h3>
      <div className="text-[14px] font-[system-ui] text-gray-700 space-y-1 mb-4">
        <p>Base Price: ₹{price}</p>
        <p>Add-ons: ₹{addOnsTotal}</p>
        <p>Tax (18%): ₹{tax}</p>
        <p className="font-bold">Total: ₹{totalPrice}</p>
      </div>

      <button
        onClick={handleProceed}
        className="w-full bg-[#26c4a0] text-white py-3 rounded-lg hover:bg-[#1aa68c] transition-colors duration-200"
      >
        Proceed to Booking
      </button>
    </div>
  );
};

export default ServiceAddOnSidebar;
