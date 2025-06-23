import ServiceSearchForm from "./ServiceSearchForm";
import RealEstateSearchForm from "./RealEstateSearchForm";
import { tabss } from "../../lib/Constant";

export default function SearchTabs({selectedTab,showAdvancedModal, setSelectedTab, ...props }) {
  const {
    activeTab,
    setActiveTab,
    setSearchQuery,
    setSelectedCity,
    setSelectedCategory,
    selectedCity,
    selectedCategory,
    searchQuery,
    onSubmit,
  } = props;

  const handleTab = (id) => {
    setActiveTab(id);
    setSearchQuery("");
    setSelectedCity("Mumbai");
    setSelectedCategory("Residential");
  };

  return (
    <div className="bg-[#d9f4f0] rounded-xl shadow-md w-full animate-up-5">
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
      {activeTab === "services" ? (
        <ServiceSearchForm
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={onSubmit}
        />
      ) : (
        <RealEstateSearchForm
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          // onOpenAdvanced={showAdvancedModal}
          onOpenAdvanced={props.onOpenAdvanced}
          onSubmit={onSubmit}
        />
      )}
      
    </div>
  );
}
