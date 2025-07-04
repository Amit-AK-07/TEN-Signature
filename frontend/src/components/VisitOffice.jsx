import { motion } from "framer-motion";
import ContactHelp from "./ContactHelp";

const officeData = [
  {
    city: "New Delhi",
    address: "Rattan Jyoti Building, G-1/18, 18, Rajendra Place, New Delhi",
    phone: "+91 836 8037 029",
    mapLink: "https://maps.google.com",
    icon: "https://www.broki.in/images/Delhi.svg",
  },
  {
    city: "Noida",
    address: "IIM Lucknow EIC, Block B, Industrial Area, Sector 62, Noida",
    phone: "+91 964 3531 845",
    mapLink: "https://maps.google.com",
    icon: "https://www.broki.in/images/Noida.svg",
  },
];

const VisitOffice = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-12 text-center font-[poppins] ">
      <motion.h2
        className="text-[30px] md:text-3xl font-bold mb-2 text-[#181a20]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Visit Our Office
      </motion.h2>

      <motion.p
        className="text-[#181a20] text-[14px] mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Interested in learning more about what we do? Swing by our spot!
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {officeData.map((office, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <img
              src={office.icon}
              alt={`${office.city} icon`}
              className="mx-auto mb-4 w-12 h-12"
            />
            <h3 className="text-[20px] font-semibold text-[#181a20]">
              {office.city}
            </h3>
            <p className="text-sm text-[#181a20] mt-2">{office.address}</p>
            <p className="text-[15px] font-semibold mt-1 text-[#181a20]">
              {office.phone}
            </p>
            <a
              href={office.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#181a20] font-[system-ui] hover:text-[#26c4a0] mt-1 inline-block hover:underline"
            >
              Open Google Map
            </a>
          </motion.div>
        ))}
      </div>

      {/* Contact Box */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <ContactHelp />
      </motion.div>
    </div>
  );
};

export default VisitOffice;
