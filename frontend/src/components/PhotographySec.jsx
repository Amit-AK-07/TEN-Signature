import { motion } from "framer-motion";
import { Link } from "react-router";

function PhotographySec({
  titleParts,
  description,
  ButtonText,
  imagePhotoSec,
  imageAlt,
  photoText,
}) {
  return (
    <section className="mx-auto px-20 max-lg:px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 bg-[#181a20]">
      {/* Left Side Content - animate from left */}
      <motion.div
        className="container"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className="text-[32px] sm:text-4xl font-extrabold leading-tight mb-6 text-[white]">
          {photoText.map((part, index) =>
            part.highlight ? (
              <span key={index} className="text-[#26c4a0]">
                &nbsp;{part.textMain}
                <br />
              </span>
            ) : (
              <span key={index}>{part.text}</span>
            )
          )}
        </h1>
        <p className="text-[16px] font-normal text-white/90 mb-8 leading-relaxed">
          {description}
        </p>
        <Link to="/listings" className="max-sm:flex max-sm:justify-center">
          <button
            type="button"
            className="bg-[#2bb89a] font-semibold text-white text-[15px] rounded-lg px-5   py-3 hover:bg-[#27a386] transition-colors duration-300 cursor-pointer"
          >
            {ButtonText}
          </button>
        </Link>
      </motion.div>

      {/* Right Side Image - animate from right */}
      <motion.div
        className="flex-shrink-0"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <img
          src={imagePhotoSec}
          alt={imageAlt}
          className="lg:w-[400px] w-[300px] max-w-full"
          loading="lazy"
          width="400"
          height="500"
        />
      </motion.div>
    </section>
  );
}

export default PhotographySec;
