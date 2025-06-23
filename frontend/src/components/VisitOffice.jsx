import React from "react";
import ContactHelp from "./ContactHelp"; // Assuming you have a ContactHelp component
const officeData = [
  {
    city: "New Delhi",
    address: "Rattan Jyoti Building, G-1/18, 18, Rajendra Place, New Delhi",
    phone: "+91 836 8037 029",
    mapLink: "https://maps.google.com",
    icon: "		https://www.broki.in/images/Delhi.svg", 
  },
  {
    city: "Noida",
    address: "IIM Lucknow EIC, Block B, Industrial Area, Sector 62, Noida",
    phone: "+91 964 3531 845",
    mapLink: "https://maps.google.com",
    icon: "	https://www.broki.in/images/Noida.svg",
  },
];

const VisitOffice = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
        Visit Our Office
      </h2>
      <p className="text-gray-500 text-sm mb-12">
        Interested in learning more about what we do? Swing by our spot!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {officeData.map((office, idx) => (
          <div key={idx} className="text-center">
            <img
              src={office.icon}
              alt={`${office.city} icon`}
              className="mx-auto mb-4 w-12 h-12"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {office.city}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{office.address}</p>
            <p className="text-sm font-semibold mt-1 text-gray-800">
              {office.phone}
            </p>
            <a
              href={office.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 mt-1 inline-block hover:underline"
            >
              Open Google Map
            </a>
          </div>
        ))}
      </div>

      {/* Contact Box */}
    <ContactHelp/>
    </div>
  );
};

export default VisitOffice;
