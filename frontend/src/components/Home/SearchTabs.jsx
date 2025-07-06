import ServiceSearchForm from "./ServiceSearchForm";
import RealEstateSearchForm from "./RealEstateSearchForm";
import { tabss } from "../../lib/Constant";
import { useNavigate } from "react-router-dom";

export default function SearchTabs({
  selectedTab,
  showAdvancedModal,
  setSelectedTab,
  ...props
}) {
  const navigate = useNavigate();

  const {
    activeTab,
    setActiveTab,
    setSearchQuery,
    setSelectedCity,
    setSelectedCategory,
    selectedCity,
    selectedCategory,
    searchQuery,
  } = props;

  const handleTab = (id) => {
    setActiveTab(id);
    setSearchQuery("");
    setSelectedCity("Mumbai");
    setSelectedCategory("Residential");
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      // Navigate to services page with search query
      navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-[#d9f4f0] rounded-xl w-full animate-up-5 p-3">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 rounded-t-xl max-w-60 bg-white">
        {tabss.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTab(tab.id)}
            className={`flex-1 py-3 px-3 font-semibold rounded-t-xl cursor-pointer ${
              activeTab === tab.id
                ? "text-[#0f1f25] border-b-2 border-black"
                : "text-gray-400 border-b-2 border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conditional Search Forms */}
      {activeTab === "services" ? (
        <ServiceSearchForm
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleServiceSubmit}
        />
      ) : (
        <RealEstateSearchForm
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onOpenAdvanced={props.onOpenAdvanced}
          onSubmit={props.onSubmit} // keep using parent onSubmit for real estate
        />
      )}
    </div>
  );
}