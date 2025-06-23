import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { servicesData, DEFAULT_SERVICE } from "../../lib/Constant";
import ServiceHeader from "./ServicesHeader";
import ServiceImageGallery from "./ServicesImageGallery";
import ServiceOverview from "./ServicesOverview";
import ServiceAddOnSidebar from "./ServicesSidebar";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const serviceData = servicesData.find((svc) => svc.serviceId === serviceId);

  const { name, price, category, itemsCovered, images, addOns } = {
    ...DEFAULT_SERVICE,
    ...servicesData,
  };

  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const tax = Math.floor((price + addOnsTotal) * 0.18);
  const totalPrice = Math.floor(price + addOnsTotal + tax);

  const handleProceed = () => {
    navigate(`/service-booking/${serviceId}`, {
      state: {
        serviceId,
        selectedAddOns,
        addOnsTotal,
        tax,
        totalPrice,
      },
    });
  };

  const toggleAddOn = (addon) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.title === addon.title)
        ? prev.filter((a) => a.title !== addon.title)
        : [...prev, addon]
    );
  };

  return (
    <section className="px-4 py-16 max-w-7xl mx-auto bg-white relative">
      <ServiceHeader
        serviceId={serviceId}
        name={name}
        price={price}
        category={category}
        itemsCovered={itemsCovered}
      />
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 max-w-full md:max-w-[60%] rounded-lg flex flex-col gap-6">
          <ServiceImageGallery images={images} />
          <ServiceOverview serviceData={serviceData} />
        </div>
        <ServiceAddOnSidebar
          addOns={addOns}
          selectedAddOns={selectedAddOns}
          toggleAddOn={toggleAddOn}
          price={price}
          addOnsTotal={addOnsTotal}
          tax={tax}
          totalPrice={totalPrice}
          handleProceed={handleProceed}
        />
      </div>
    </section>
  );
};

export default ServiceDetail;
