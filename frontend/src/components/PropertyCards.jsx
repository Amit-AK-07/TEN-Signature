import { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import { BASE_URL } from "../lib/config";

const PropertyCards = ({
  activeTab,
  city,
  excludeId,
  url = "/filter-property-list/",
}) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const params = {};

        if (city) params.city = city;
        if (excludeId) params.exclude_id = excludeId;

        const res = await axios.get(
          `${BASE_URL}${url}`,
          { params }
        );

        const mappedListings = res.data.results.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price_format,
          location: item.city?.name || "Unknown",
          image: item.property_image || "https://via.placeholder.com/300",
          sqft: item.sqft,
          type: item.price_duration === "monthly" ? "For Rent" : "For Sale", // ✅ Type mapping
        }));

        setListings(mappedListings);
      } catch (error) {
        console.error("Error fetching property listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [activeTab, city, excludeId, url]);

  const filteredProperties = activeTab
    ? listings.filter(
        (property) =>
          property.type &&
          property.type.toLowerCase() === activeTab.toLowerCase()
      )
    : listings;

  const displayedProperties = filteredProperties.slice(0, 4); // ✅ Limit to 4 cards

  if (loading) return <p className="text-center py-4">Loading properties...</p>;

  if (displayedProperties.length === 0)
    return <p className="text-center py-4">No properties found.</p>;

  return (
    <section className="max-w-[1300px] mx-auto pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default PropertyCards;
