import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSlidersH } from "@fortawesome/free-solid-svg-icons";

export default function RealEstateSearchForm({
  selectedCity,
  setSelectedCity,
  selectedCategory,
  setSelectedCategory,
  onOpenAdvanced,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-wrap lg:flex-nowrap items-center gap-4 p-6  rounded-b-xl bg-white"
    >
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="flex-1 bg-[#f7f7f7] rounded-xl py-3 px-4 text-gray-500 text-sm"
      >
        {["Mumbai", "Delhi", "Pune"].map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="flex-1 bg-[#f7f7f7] rounded-xl py-3 px-4 text-gray-500 text-sm"
      >
        {["Residential", "Commercial", "Rent"].map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <div
        className="flex items-center space-x-4"
        onClick={() => setShowAdvancedModal(true)}
      >
        <button
          type="button"
          className="text-gray-700 flex items-center cursor-pointer"
          onClick={() => onOpenAdvanced()}
        >
          <FontAwesomeIcon icon={faSlidersH} />{" "}
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
