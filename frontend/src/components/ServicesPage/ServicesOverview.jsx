import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCalendar,
  faUserTie,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { OVERVIEW_FIELDS, SERVICE_FAQS } from "../../lib/Constant";

const ICON_MAP = {
  faHouse,
  faCalendar,
  faUserTie,
};

const ServiceOverview = ({ serviceData }) => {
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <section className="bg-white p-6 rounded-2xl shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {OVERVIEW_FIELDS.map(({ label, value, icon }, i) => {
            const displayValue =
              value ?? serviceData?.[label.toLowerCase()] ?? "—";
            return (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl w-full md:w-1/3 border border-gray-200"
              >
                <FontAwesomeIcon
                  icon={ICON_MAP[icon]}
                  className="text-xl text-[#26c4a0]"
                />
                <div>
                  <p className="font-semibold text-gray-800">{label}</p>
                  <p className="text-gray-600">{displayValue}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Provider Description Section */}
      <section className="bg-white p-6 rounded-2xl shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Provider Description</h2>
        <p className="text-gray-700">
          {serviceData?.description || "No description available."}
        </p>
      </section>

      {/* FAQ Section */}
      <section className="bg-white p-6 rounded-2xl shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2 ">
          {SERVICE_FAQS.map((faq, index) => {
            const isOpen = index === activeFaqIndex;
            return (
              <div
                key={index}
                className={`border rounded-xl p-4 transition-all duration-300  ${
                  isOpen ? "bg-[#26c4a0] border-[#26c4a0]" : "bg-white"
                }`}
              >
                <button
                  className="flex justify-between items-center w-full font-semibold text-left cursor-pointer text-gray-800"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <FontAwesomeIcon
                    icon={isOpen ? faMinus : faPlus}
                    className="ml-2 text-[#26c4a0] text-lg font-bold"
                  />
                </button>
                {isOpen && (
                  <p className="mt-2 text-gray-700 transition-all duration-200 cursor-pointer">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ServiceOverview;
