import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import ContactHelp from "../components/ContactHelp";

const founders = [
  {
    name: "Jatin Anand",
    role: "Founder - CEO",
    img: "https://www.broki.in/images/team/jatin_image.jpeg",
    description:
      "Jatin, our Founder, is a seasoned entrepreneur with over 5 years in hospitality and 3 years in finance. He owns multiple restaurants and food brands like The Flashback, Burgelicious, and The Shawarma King. Jatin aims to share his extensive food market expertise with Broki’s users.",
    socials: {
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    name: "Akash Malhotra",
    role: "Founder - CTO",
    img: "https://www.broki.in/images/team/akash_image.jpeg",
    description:
      "Akash, with 11 years of industry experience, leads all technical implementations at Broki. An MBA graduate from IIM Lucknow, he excels in bridging technical and business needs. Known for his strategic vision and innovative solutions, Akash is a pivotal figure in driving technological advancements.",
    socials: {
      linkedin: "#",
      facebook: "#",
    },
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const OurTeam = () => {
  return (
    <>
      <motion.div
        className="py-12 px-4 md:px-8 bg-white text-center font-[poppins]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl font-bold mb-10 text-gray-900"
        >
          Meet Our Founders
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          {founders.map((founder, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow p-6 w-full md:w-1/2 lg:w-1/3 mx-auto"
            >
              <div className="overflow-hidden rounded-full mb-4">
                <img
                  src={founder.img}
                  alt={founder.name}
                  className="rounded-full w-32 h-32 object-cover border m-auto"
                />
              </div>

              {/* Founder Name - Poppins */}
              <h3 className="text-[24px] font-semibold text-gray-900 mb-1 font-[poppins]">
                {founder.name}
              </h3>

              {/* Founder Role - System UI */}
              <p className="text-[14px] text-gray-600 mb-2 font-[system-ui]">
                {founder.role}
              </p>

              {/* Founder Description - System UI */}
              <p className="text-sm text-gray-700 mb-4 leading-relaxed font-[system-ui]">
                {founder.description}
              </p>

              <div className="flex justify-center space-x-4">
                <a
                  href={founder.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                  href={founder.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-800"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <ContactHelp />
    </>
  );
};

export default OurTeam;
