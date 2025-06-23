import PriceFilter from "../../components/PriceFilter";

export default function AdvancedModal({ onClose, setShowAdvancedModal }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-2xl p-6 relative"
      >
        <button className="cursor-pointer absolute top-4 right-4 text-3xl" onClick={onClose}>
          ×
        </button>
        <h2 className="text-xl font-semibold mb-6">More Filter</h2>
        <PriceFilter />
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label className="block mb-2">Type</label>
            <select className="w-full border rounded-lg px-4 py-2">
              <option>Select...</option>
              <option>Commercial</option>
              <option>Residential</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block mb-2">Location</label>
            <select className="w-full border rounded-lg px-4 py-2">
              <option>Select...</option>
              <option>Mumbai</option>
              <option>Delhi</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-[#22b99a] cursor-pointer px-6 py-2 rounded-lg text-white font-semibold">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
