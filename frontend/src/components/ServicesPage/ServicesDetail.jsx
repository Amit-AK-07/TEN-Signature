import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ServiceHeader from "./ServicesHeader";
import ServiceImageGallery from "./ServicesImageGallery";
import ServiceOverview from "./ServicesOverview";
import ServiceAddOnSidebar from "./ServicesSidebar";
import RelatedService from "./RelatedService";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [serviceData, setServiceData] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://broki-clone-ui.onrender.com/api/service-detail/${serviceId}/`
      )
      .then((response) => {
        setServiceData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load service detail.");
        setLoading(false);
      });
  }, [serviceId]);

  if (loading)
    return <div className="text-center py-10">Loading service details...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!serviceData) return null;

  const { service_detail, service_faq, serviceaddon, related_service } =
    serviceData;

  const addOnsTotal = selectedAddOns.reduce(
    (sum, a) => sum + parseFloat(a.price),
    0
  );
  const basePrice = parseFloat(service_detail.price);
  const tax = Math.floor((basePrice + addOnsTotal) * 0.18);
  const totalPrice = Math.floor(basePrice + addOnsTotal + tax);

  const handleProceed = () => {
    navigate(`/service-booking/${serviceId}`, {
      state: {
        serviceId,
        selectedAddOns,
        addOnsTotal,
        tax,
        totalPrice,
        serviceData: service_detail, // Pass full service details
      },
    });
  };

  const toggleAddOn = (addon) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  return (
    <section className="px-4 py-10 md:py-12 max-w-7xl mx-auto bg-white">
      <ServiceHeader
        serviceId={service_detail.id}
        name={service_detail.name}
        price={service_detail.price}
        category={service_detail.category_name}
        subcategory={service_detail.subcategory_name}
        providerName={service_detail.provider_name}
        providerImage={service_detail.provider_image}
        totalRating={service_detail.total_rating}
        totalReview={service_detail.total_review}
        itemsCovered={service_detail.moq}
      />

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side */}
        <div className="w-full lg:w-[60%] flex flex-col gap-6">
          <ServiceImageGallery images={service_detail.attchments} />
          <ServiceOverview serviceData={service_detail} faqs={service_faq} />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[35%]">
          <div className="bg-white border border-gray-200 p-4 md:p-6 rounded-xl shadow-md lg:sticky top-6">
            <ServiceAddOnSidebar
              addOns={serviceaddon}
              selectedAddOns={selectedAddOns}
              toggleAddOn={toggleAddOn}
              price={basePrice}
              addOnsTotal={addOnsTotal}
              tax={tax}
              totalPrice={totalPrice}
              handleProceed={handleProceed}
            />
          </div>
        </div>
      </div>

      {/* Related Services Section */}
      {related_service && related_service.length > 0 && (
        <div className="mt-12">
          <RelatedService services={serviceData.related_service} />
        </div>
      )}
    </section>
  );
};

export default ServiceDetail;
