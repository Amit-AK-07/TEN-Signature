import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { features } from "../lib/Constant";
import HeroImg from "../assets/images/hero-img.webp";

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

const WhyChooseUs = () => {
  return (
    <motion.main
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
        {/* Left Side Image */}
        <motion.div
          className="w-full max-w-md lg:max-w-lg flex-shrink-0"
          variants={itemVariants}
        >
          <img
            src={HeroImg}
            alt="Smiling woman with arms crossed"
            className="w-full h-auto rounded-md object-cover"
            width={600}
            height={600}
          />
        </motion.div>

        {/* Right Side Content */}
        <motion.div className="flex-1 max-w-xl" variants={itemVariants}>
          <h2 className="text-[20px] md:text-[30px] font-extrabold leading-tight mb-2">
            Why Choose Us
          </h2>
          <p className="text-[15px] leading-relaxed mb-8 max-w-md">
            We offer the full spectrum of services to help individuals choose
            the right food business at the right price.
          </p>

          <motion.ul
            className="space-y-8 max-w-md"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-5"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 flex items-center justify-center w-[70px] h-[70px] bg-[hsla(8,79%,62%,0.07)] rounded-full text-[#ffa800] text-[30px] leading-[80px] text-center transition-all duration-400 ease-in-out hover:bg-[#ffa800] hover:text-white">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <div>
                  <h6 className="font-semibold text-[15px] leading-snug mb-1">
                    {feature.title}
                  </h6>
                  <p className="text-[15px] leading-relaxed max-w-xs">
                    {feature.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default WhyChooseUs;
