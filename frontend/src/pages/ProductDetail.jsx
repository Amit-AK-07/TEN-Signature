import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPropertyDetail } from "../apiAction/properties/Index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NearbyListings from "../components/NearbyListings";

import {
  faCalendarAlt,
  faRulerCombined,
  faHouseUser,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [visitType, setVisitType] = useState("In Person");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const response = await fetchPropertyDetail(id);
        setProperty(response);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    
    loadProperty();
  }, [id]);

  if (!property) {
    return <div className="text-center p-8">Loading property details...</div>;
  }

  return (
    <>
      {/* Main Container */}
      <div className="max-w-[1300px] mx-auto px-2 pt-8 pb-0 font-sans">
        {/* Breadcrumb */}
        <nav
          className="text-sm text-gray-500 ml-5 mb-2"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center">
            <li>
              <Link to="/" className="hover:text-green-600 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link
                to="/listings"
                className="hover:text-green-600 hover:underline"
              >
                Listing
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li aria-current="page" className="text-gray-700 font-semibold">
              {property.city}
            </li>
          </ol>
        </nav>

        {/* Title & Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {property.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm mt-2 text-gray-600">
              <span>{property.city}</span>
              <span className="border-l h-4"></span>
              <span className="text-green-500 font-medium">● For Sale</span>
              <span className="border-l h-4 mx-1"></span>
              <span className="text-green-500 font-medium">
                ● {property.age_of_property} Years Old
              </span>
              <span className="border-l h-4 mx-1"></span>
              <span className="flex items-center gap-1">ID: {property.id}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <h2 className="text-2xl font-semibold text-gray-800">
              {property.price_format}
            </h2>
            {property.price && property.sqft && property.sqft > 0 && (
              <p className="text-xs text-gray-600 font-medium">
                ₹{Math.round(property.price / property.sqft).toLocaleString()} /
                sqft
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-start flex-col lg:flex-row">
          {/* Left Column */}
          <div className="w-full lg:w-2/3 px-4">
            {/* Image with Thumbnails */}
            <div className="rounded-xl border border-gray-200 mb-6 p-4 sm:p-6 mt-0 bg-white">
              <img
                src={selectedImage || property.property_image}
                alt={property.name}
                className="w-full h-[250px] sm:h-[400px] object-cover rounded-lg mb-5"
              />
              <div className="flex gap-3 overflow-x-auto">
                {[
                  property.property_image,
                  ...property.gallery.map((img) => img.image_url),
                ].map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`thumb-${index}`}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`min-w-[70px] min-h-[50px] w-[50px] h-[50px] sm:w-[90px] sm:h-[10px] rounded-lg object-cover cursor-pointer border ${
                      selectedImage === imgUrl
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white p-6 rounded-xl shadow mb-6">
              <h3 className="text-lg font-semibold mb-4">Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-lg">
                  <div className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-xl bg-gray-100">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-black"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-md text-gray-800">
                      Year Built
                    </p>
                    <p className="text-sm text-gray-600">
                      {property.age_of_property
                        ? new Date().getFullYear() - property.age_of_property
                        : "Not Present"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg">
                  <div className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-xl bg-gray-100">
                    <FontAwesomeIcon
                      icon={faRulerCombined}
                      className="text-black"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-md text-gray-800">Sqft</p>
                    <p className="text-sm text-gray-600">
                      {property.sqft || "Not Present"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg">
                  <div className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-xl bg-gray-100">
                    <FontAwesomeIcon
                      icon={faHouseUser}
                      className="text-black"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-md text-gray-800">
                      Property Type
                    </p>
                    <p className="text-sm text-gray-600">
                      {property.category || "Not Present"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-5">
                Property Description
              </h2>
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">Address</h2>
              <div className="text-sm text-gray-800 space-y-2">
                <p>
                  <strong>City:</strong> {property.city}
                </p>
                <p>
                  <strong>State:</strong> {property.state}
                </p>
                <p>
                  <strong>Country:</strong> {property.country}
                </p>
                <p>
                  <strong>Full Address:</strong> {property.address}
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="mt-6 rounded-xl overflow-hidden">
              <iframe
                title="Map"
                src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                className="w-full h-[300px] rounded-xl border-none"
                loading="lazy"
              ></iframe>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-sm p-6 w-full mx-auto mt-6">
              <h2 className="text-lg font-semibold mb-4">
                Features & Amenities
              </h2>
              {property.amenities.length > 0 ? (
                property.amenities.map((amenity, index) => (
                  <div key={index} className="mb-2">
                    <h3 className="font-semibold mb-1">{amenity.name}</h3>
                    <p className="text-sm text-gray-800">{amenity.value}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No amenities listed.</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3 lg:pl-6 mt-10 lg:mt-0 px-4">
            {/* Visit Form */}
            <div className="bg-white border border-gray-200 p-6 mt-7 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-4">
                Schedule a site visit
              </h3>
              <h4 className="text-sm mb-5">Let us know your details</h4>

              <div className="flex gap-4 mb-4">
                {["In Person", "Video Chat"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setVisitType(type)}
                    className={`w-1/2 px-0 py-2 font-semibold rounded-xl border ${
                      visitType === type
                        ? "bg-gray-50 text-black border-black"
                        : "bg-white text-black-100 border-gray-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <form className="space-y-4 mb-4">
                <input
                  placeholder="Time"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
                <input
                  placeholder="Name"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
                <input
                  placeholder="Phone"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
                <input
                  placeholder="Email"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
                <textarea
                  placeholder="Enter Your Message"
                  className="w-full border border-gray-300 p-3 rounded-lg h-24"
                />
                <button
                  type="submit"
                  className="bg-[#26c4a0] text-white w-full py-3 rounded-lg hover:bg-[#1a9f85]"
                >
                  Submit a Tour Request ↗
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="mt-6 p-6 border border-gray-200 shadow rounded-xl bg-white w-full">
              <h2 className="text-lg font-semibold mb-4">
                Get More Information
              </h2>
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={property.customer.profile_image}
                  alt="Sales"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-lg mb-1">
                    {property.customer.display_name}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-1">
                    <FontAwesomeIcon icon={faPhone} className="text-black" />{" "}
                    {property.customer.contact_number}
                  </p>
                </div>
              </div>
              <button className="w-full border border-black rounded-xl py-4 text-sm font-medium flex items-center justify-center gap-1 hover:bg-gray-50">
                Contact Us ↗
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Listings - Outside container for full width */}
      <NearbyListings
        mode="detail"
        city={property.city}
        excludeId={property.id}
      />
    </>
  );
}
