import { useState, useEffect, useMemo } from "react";
import { defaultFilters } from "../lib/Constant";
import { fetchProperties, fetchCities, fetchCategories } from "../apiAction/properties/Index";
import FilterSidebar from "../components/FilterSidebar";
import ListingCard from "../components/ListingCard";
import Pagination from "../components/Pagination";
import { motion } from "framer-motion";

const Listing = () => {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Newest");
  const [viewType, setViewType] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const listingsPerPage = 6;

  // Fetch cities and categories on mount
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [citiesData, categoriesData] = await Promise.all([
          fetchCities(),
          fetchCategories()
        ]);
        
        // Handle different possible response structures
        let processedCities = [];
        let processedCategories = [];
        
        // Process cities data - your API returns paginated response with results array
        if (citiesData && citiesData.results && Array.isArray(citiesData.results)) {
          // Handle paginated response (your API structure)
          processedCities = citiesData.results;
        } else if (Array.isArray(citiesData)) {
          // Handle direct array response
          processedCities = citiesData;
        } else if (citiesData && citiesData.data && Array.isArray(citiesData.data)) {
          // Handle wrapped response
          processedCities = citiesData.data;
        }
        
        // Process categories data - your API returns paginated response with results array
        if (categoriesData && categoriesData.results && Array.isArray(categoriesData.results)) {
          // Handle paginated response (your API structure)
          processedCategories = categoriesData.results;
        } else if (Array.isArray(categoriesData)) {
          // Handle direct array response
          processedCategories = categoriesData;
        } else if (categoriesData && categoriesData.data && Array.isArray(categoriesData.data)) {
          // Handle wrapped response
          processedCategories = categoriesData.data;
        }
        
        setCities(processedCities);
        setCategories(processedCategories);
        
      } catch (err) {
        setCities([]);
        setCategories([]);
        setError("Failed to load filter options. Please refresh the page.");
      }
    };
    
    fetchFilterData();
  }, []);

  // Fetch properties whenever filters, page, or sort changes
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const params = {
          page: currentPage,
          page_size: listingsPerPage,
        };

        // Add filters with better error handling
        if (filters.location && filters.location !== "All Locations") {
          const selectedCity = cities.find(city => {
            // Handle different possible city object structures
            return city.name === filters.location || 
                   city.city === filters.location || 
                   city.title === filters.location;
          });
          if (selectedCity) {
            params.city = selectedCity.id;
          }
        }

        if (filters.category && filters.category !== "All Categories") {
          const selectedCategory = categories.find(cat => {
            // Handle different possible category object structures
            return cat.name === filters.category || 
                   cat.category === filters.category || 
                   cat.title === filters.category;
          });
          if (selectedCategory) {
            params.category = selectedCategory.id;
          }
        }

        // Add property_for filter
        if (filters.property_for && filters.property_for !== "All") {
          params.property_for = filters.property_for === "Sale" ? 1 : 0;
        }

        // Add price filters with better validation
        if (filters.minPrice && filters.minPrice !== "No Min" && filters.minPrice !== "") {
          const minPrice = typeof filters.minPrice === 'string' 
            ? parseInt(filters.minPrice.replace(/[^\d]/g, "")) 
            : parseInt(filters.minPrice);
          if (!isNaN(minPrice) && minPrice > 0) {
            params.price_min = minPrice;
          }
        }
        
        if (filters.maxPrice && filters.maxPrice !== "No Max" && filters.maxPrice !== "") {
          const maxPrice = typeof filters.maxPrice === 'string' 
            ? parseInt(filters.maxPrice.replace(/[^\d]/g, "")) 
            : parseInt(filters.maxPrice);
          if (!isNaN(maxPrice) && maxPrice > 0) {
            params.price_max = maxPrice;
          }
        }

        // Add sorting
        if (sortBy === "Price Low") {
          params.ordering = "price";
        } else if (sortBy === "Price High") {
          params.ordering = "-price";
        } else if (sortBy === "Newest") {
          params.ordering = "-id";
        }

        const response = await fetchProperties(params);
        
        if (response && response.results) {
          // Django REST framework pagination response
          setListings(response.results);
          setTotalCount(response.count);
          setTotalPages(Math.ceil(response.count / listingsPerPage));
        } else if (Array.isArray(response)) {
          // Direct array response
          setListings(response);
          setTotalCount(response.length);
          setTotalPages(Math.ceil(response.length / listingsPerPage));
        } else {
          // Handle unexpected response structure
          setListings([]);
          setTotalCount(0);
          setTotalPages(0);
        }
      } catch (err) {
        setError("Failed to load listings. Please try again.");
        setListings([]);
        setTotalCount(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch listings if we have cities and categories data (for filtering)
    // or if no location/category filters are applied
    if (cities.length > 0 || categories.length > 0 || 
        (filters.location === "All Locations" && filters.category === "All Categories")) {
      fetchListings();
    }
  }, [filters, currentPage, sortBy, cities, categories]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  };

  // Transform API data to match ListingCard expectations
  const transformedListings = useMemo(() => {
    if (!Array.isArray(listings)) {
      return [];
    }
    
    const transformed = listings.map(property => {
      // Handle different possible property object structures
      const cityName = property.city?.name || property.city || property.location || 'Unknown';
      const propertyImage = property.property_image || property.image || property.img || '';
      const priceFormat = property.price_format || (property.price ? `₹${property.price}` : 'Price not available');
      
      return {
        id: property.id,
        price: priceFormat,
        name: property.name || property.title || 'Unnamed Property',
        title: property.name || property.title || 'Unnamed Property',
        location: cityName,
        size: property.sqft ? `${property.sqft} sqft` : 'Size not available',
        sqft: property.sqft || 0,
        image: propertyImage,
        img: propertyImage, // Keep both for compatibility
        featured: property.premium_property || property.featured || false,
        type: property.property_for === 0 ? "For Rent" : "For Sale",
        // Add any other fields your ListingCard component expects
        address: property.address || '',
        property_for: property.property_for,
        description: property.description || '',
      };
    });
    
    return transformed;
  }, [listings]);

  const indexOfFirst = (currentPage - 1) * listingsPerPage;
  const indexOfLast = Math.min(indexOfFirst + listingsPerPage, totalCount);
  
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="pt-2 sm:p-6 bg-white min-h-screen font-sans">
        <section>
          <div className="px-4 sm:px-6 max-w-[1200px] mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-gray-900">
              Find the best listing for your brand
            </h1>
            <p className="text-sm text-gray-500 mb-6">Home / Listings</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 max-w-[1200px] mx-auto">
            {/* Sidebar */}
            <aside className="w-full lg:w-[370px]">
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onReset={resetFilters}
                cities={cities}
                categories={categories}
              />
            </aside>

            {/* Listings */}
            <section className="flex-1 w-full">
              {/* Top bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <p className="text-sm text-gray-500">
                  {loading ? "Loading..." : `Showing ${indexOfFirst + 1}–${indexOfLast} of ${totalCount} results`}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <label className="text-sm text-gray-600">Sort by</label>
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option>Newest</option>
                    <option>Price High</option>
                    <option>Price Low</option>
                  </select>

                  <button
                    className={`text-sm px-2 py-1 rounded ${
                      viewType === "grid"
                        ? "underline text-gray-900"
                        : "text-gray-500"
                    }`}
                    onClick={() => setViewType("grid")}
                  >
                    Grid
                  </button>
                  <button
                    className={`text-sm px-2 py-1 rounded ${
                      viewType === "list"
                        ? "underline text-gray-900"
                        : "text-gray-500"
                    }`}
                    onClick={() => setViewType("list")}
                  >
                    List
                  </button>
                </div>
              </div>

              {/* Cards */}
              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-500">Loading properties...</div>
                  </div>
                ) : error ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-red-500">{error}</div>
                  </div>
                ) : transformedListings.length === 0 ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-500">No properties found matching your criteria.</div>
                  </div>
                ) : (
                  <>
                    <div
                      className={`grid gap-6 mt-6 ${
                        viewType === "grid"
                          ? "grid-cols-1 sm:grid-cols-2"
                          : "grid-cols-1"
                      }`}
                    >
                      {transformedListings.map((item) => (
                        <div key={item.id} className="w-full">
                          <ListingCard
                            property={item}
                            viewType={viewType}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.section>

              {/* Pagination */}
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </section>
          </div>
        </section>
      </div>
    </motion.section>
  );
};

export default Listing;