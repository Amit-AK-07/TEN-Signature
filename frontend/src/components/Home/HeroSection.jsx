import { motion } from "framer-motion";

export default function HeroSection({ content, children }) {
  return (
    <section className="relative overflow-hidden bg-[#d9f4f0]">
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-16 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8">
        {/* Left Content with Animated Title */}
        <motion.div
          className="w-full xl:w-1/2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-[30px] md:text-[40px] font-semibold font-sans text-[#0f0f25] leading-tight mb-8">
            {content.titleParts.map((p, idx) =>
              p.highlight ? (
                <span key={idx}>
                  <br />
                  {p.text}
                </span>
              ) : (
                <span key={idx}>{p.text}</span>
              )
            )}
          </h1>
          {children}
        </motion.div>

        {/* Right Image Section with Bounce Animation */}
        <motion.div
          className="hidden xl:block relative mt-12 -left-12 h-[36rem] w-[476px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <img
            src={content.imageSrc}
            alt={content.imageAlt}
            className="h-full w-full object-cover rounded-md hidden lg:block"
            loading="lazy"
          />
          <motion.div
            className="bounce-y absolute left-1/2 -translate-x-1/2 bg-white rounded-xl p-2 shadow-lg text-center transition-transform duration-300 ease-out bottom-5"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <img
              src={content.subImageSrc}
              alt="Sub Hero Image"
              className="rounded-full w-[17.25rem] h-36 object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
