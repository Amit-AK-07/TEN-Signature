import { ADDON_ICONS, PRICE_LABELS } from "../../lib/Constant";
import { Link } from "react-router-dom";
const ServiceAddOnSidebar = ({
  addOns,
  selectedAddOns,
  toggleAddOn,
  price,
  addOnsTotal,
  tax,
  totalPrice,
  handleProceed,
}) => (
  <div className="w-full md:w-[35%] bg-gray-50 rounded-xl shadow p-4 sticky top-20">
    <h3 className="font-semibold text-gray-800 mb-4">Enhance Your Service</h3>
    <div className="space-y-4 mb-6">
      {addOns.map((addon, idx) => {
        const isSelected = selectedAddOns.some((a) => a.title === addon.title);
        return (
          <div
            key={idx}
            className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <img
                src={ADDON_ICONS[addon.title]}
                alt={addon.title}
                className="w-10 h-10 object-contain rounded"
              />
              <div>
                <p className="text-gray-800">{addon.title}</p>
                <p className="text-[#26c4a0] font-semibold">₹{addon.price}</p>
              </div>
            </div>
            <button
              onClick={() => toggleAddOn(addon)}
              className={`px-4 py-1 rounded-lg text-white cursor-pointer ${
                isSelected
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-[#26c4a0] hover:bg-[#1aa68c] transition-colors duration-200"
              }`}
            >
              {isSelected ? "Remove" : "Add"}
            </button>
          </div>
        );
      })}
    </div>

    <h3 className="font-semibold text-gray-800 mb-2">Price Breakup</h3>
    <div className="text-sm text-gray-700 space-y-1 mb-4">
      <p>
        {PRICE_LABELS.basePrice}: ₹{price}
      </p>
      <p>{PRICE_LABELS.discount}: -₹0.00</p>
      <p>
        {PRICE_LABELS.addons}: ₹{addOnsTotal}
      </p>
      <p>
        {PRICE_LABELS.tax}: ₹{tax}
      </p>
      <p className="font-bold">
        {PRICE_LABELS.total}: ₹{totalPrice}
      </p>
    </div>

    <button
      onClick={handleProceed}
      className="w-full bg-[#26c4a0] text-white py-3 rounded-lg hover:bg-[#1aa68c] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      <Link to={"/booking"}>
      Proceed to Booking
      </Link>
    </button>
  </div>
);

export default ServiceAddOnSidebar;
