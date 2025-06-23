import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import NearbyListings from "../components/NearbyListings";
import PropertyCards from "../components/PropertyCards";

const ProductDetail = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/property-detail/`, { id });
        setProperty(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : "An error occurred while fetching property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // Conditional rendering states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!property) return <div>No property data found.</div>;

  // Calculate price per sqft
  const pricePerSqft = property.sqft ? 
    Math.round((property.property_for === 0 ? property.current_rental : property.price) / property.sqft) : 
    0;

  // Determine price display based on property type
  const priceDisplay = property.property_for === 0 ? 
    `${property.price_format} /Mon` : property.price_format;

  const pricePerSqftDisplay = `₹${pricePerSqft.toLocaleString()} /sq ft` + 
    (property.property_for === 0 ? '/month' : '');

  return (
    <>
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
        <nav className="text-sm text-gray-500 mb-2">
          Home / Listings / {property.city || 'Unknown City'}
        </nav>
        
        <header className="flex flex-col md:flex-row md:justify-between md:items-start min-h-[200px]">
          {/* Property Title and Info */}
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {property.name || 'Property Name Not Available'}
              </h1>
              <h2 className="text-xl text-gray-700 mb-4">
                {property.address || 'Address Not Available'}
              </h2>
              <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-2">
                <span>{property.city || 'City Not Available'}</span>
                <span className="text-[#26c4a0] font-medium">• {property.property_for === 0 ? "For Rent" : "For Sale"}</span>
                <span>• {property.age_of_property || 'N/A'} Years Old</span>
                <span>• {property.id || 'N/A'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-700 space-x-4">
                <span>🍽️ {property.category || 'N/A'}</span>
                <span>📏 {property.sqft ? `${property.sqft.toLocaleString()} sqft` : 'N/A'}</span>
              </div>
            </div>

            {/* Pricing for smaller screens */}
            <div className="block md:hidden mt-4">
              <div className="text-xl font-bold text-gray-800">{priceDisplay}</div>
              <div className="text-sm text-gray-500">{pricePerSqftDisplay}</div>
            </div>
          </div>

          {/* Pricing for larger screens */}
          <div className="hidden md:block text-right mt-4">
            <div className="text-xl md:text-2xl font-bold text-gray-800">{priceDisplay}</div>
            <div className="text-sm text-gray-500">{pricePerSqftDisplay}</div>
          </div>
        </header>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3 w-full space-y-6">
            {/* Property Images */}
            <section>
              <img src={property.property_image} alt="Main" className="rounded-lg w-full" />
              <div className="flex gap-2 overflow-x-auto mt-2">
                {property.gallery.map((image) => (
                  <img key={image.id} src={image.image_url} alt={`Gallery ${image.id}`} className="rounded-md w-24 h-20 object-cover" />
                ))}
              </div>
            </section>

            {/* Overview Section */}
            <section className="bg-white p-4 rounded-lg shadow flex flex-wrap justify-between">
              <div className="flex flex-col items-center w-1/3">
                <span className="text-sm text-gray-500">Year Built</span>
                <span className="font-semibold">{property.age_of_property || 'N/A'}</span>
              </div>
              <div className="flex flex-col items-center w-1/3">
                <span className="text-sm text-gray-500">Sqft</span>
                <span className="font-semibold">{property.sqft || 'N/A'}</span>
              </div>
              <div className="flex flex-col items-center w-1/3">
                <span className="text-sm text-gray-500">Property Type</span>
                <span className="font-semibold">{property.category || 'N/A'}</span>
              </div>
            </section>

            {/* Property Description */}
            <section className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Property Description</h4>
              <p className="text-sm text-gray-600 mb-4">{property.description || 'Description not available.'}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Property ID:</strong> {property.id || 'N/A'}</div>
                <div><strong>Age of Property:</strong> {property.age_of_property || 'N/A'} years</div>
                <div><strong>Price:</strong> {property.price_format || 'N/A'}</div>
                <div><strong>Property Type:</strong> {property.category || 'N/A'}</div>
                <div><strong>Property Size:</strong> {property.sqft || 'N/A'} sqft</div>
                <div><strong>Property Status:</strong> {property.status ? "Available" : "Not Available"}</div>
                <div><strong>Monthly Sales:</strong> ₹{property.monthly_sale ? property.monthly_sale.toLocaleString() : 'N/A'}</div>
                <div><strong>Current Rental:</strong> ₹{property.current_rental ? property.current_rental.toLocaleString() : 'N/A'}</div>
              </div>
            </section>

            {/* Address Section */}
            <section className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Address</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>City:</strong> {property.city || 'N/A'}</p>
                <p><strong>State:</strong> {property.state || 'N/A'}</p>
                <p><strong>Country:</strong> {property.country || 'N/A'}</p>
              </div>
            </section>

            {/* Map Section */}
            <section className="bg-white p-4 rounded-lg shadow">
              <iframe
                src={`https://maps.google.com/maps?q=${property.latitude || 0},${property.longitude || 0}&z=15&output=embed`}
                className="w-full h-64 rounded-lg"
                title="Map"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </section>

            {/* Features Section */}
            <section className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Features & Amenities</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {property.amenities && property.amenities.length > 0 ? (
                  property.amenities.map((amenity) => (
                    <li key={amenity.id}>{amenity.name}: {amenity.value}</li>
                  ))
                ) : (
                  <li>No amenities available.</li>
                )}
              </ul>
            </section>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/3 w-full space-y-6">
            {/* Site Visit Schedule */}
            <section className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Schedule a Site Visit</h3>
              <div className="flex gap-2 mb-4">
                <button className="flex-1 py-2 bg-gray-100 rounded border border-[#181a20]">In Person</button>
                <button className="flex-1 py-2 bg-gray-100 rounded border border-[#181a20]">Video Chat</button>
              </div>
              <form className="space-y-2">
                <input type="text" placeholder="Time" className="w-full border rounded px-3 py-2" />
                <input type="text" placeholder="Name" className="w-full border rounded px-3 py-2" />
                <input type="text" placeholder="Phone" className="w-full border rounded px-3 py-2" />
                <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
                <textarea placeholder="Enter Your Messages" className="w-full border rounded px-3 py-2"></textarea>
                <button type="submit" className="w-full bg-[#26c4a0] text-white py-2 rounded hover:bg-[#1a9f85] cursor-pointer">
                  Submit a Tour Request
                </button>
              </form>
            </section>

            {/* Contact Information */}
            <section className="bg-white p-4 rounded-lg shadow text-center">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Get More Information</h4>
              <div className="flex items-center justify-center gap-2 mb-2">
                <img src={property.customer?.profile_image || 'https://via.placeholder.com/150'} className="w-10 h-10 bg-gray-200 rounded-full" alt="Customer" />
                <div>
                  <p className="text-sm font-semibold">{property.customer?.display_name || 'N/A'}</p>
                  <p className="text-xs text-gray-500">📞 {property.customer?.contact_number || 'N/A'}</p>
                </div>
              </div>
              <button className="w-full border rounded py-2 mt-2 hover:bg-[#181a20] hover:text-white cursor-pointer transition-all duration-300 ease-in">
                Contact Us
              </button>
            </section>
          </div>
        </div>
      </div>

      <NearbyListings />
      <PropertyCards />
    </>
  );
};

export default ProductDetail;
