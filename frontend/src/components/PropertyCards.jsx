
import { properties } from "../lib/Constant";
import PropertyCard from "./PropertyCard";

const PropertyCards = ({ activeTab }) => {
  const filteredProperties = properties.filter(
    (property) => property.type === activeTab
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-10 gap-y-8">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyCards;
