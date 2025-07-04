import { motion } from "framer-motion";
import { appImages } from "../lib/Constant";
import DownloadButton from "./DownloadButton";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";

function DownloadSec() {
  return (
    <section className="w-full bg-[#d9f4f0] px-6 sm:px-10 md:px-16 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-12">
        {/* Image */}
        <motion.div
          className="hidden sm:block md:hidden lg:block flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px]"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={appImages[0].src}
            alt={appImages[0].alt}
            width={appImages[0].width}
            height={appImages[0].height}
            className={appImages[0].className}
            loading="lazy"
          />
        </motion.div>

        {/* Text and Buttons */}
        <motion.div
          className="w-full max-w-xl text-center md:text-left px-4 md:px-0"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button
            type="button"
            className="mb-4 bg-white text-black text-sm rounded-full px-5 py-2"
          >
            Download Now
          </button>
          <h2 className="text-[20px] md:text-[30px] font-extrabold text-[#0c2340] mb-4 leading-tight">
            Download the App
          </h2>
          <p className="text-[#0c2340] text-[14px] mb-10 leading-relaxed max-w-md mx-auto md:mx-0">
            Get access to top FnB services, commercial real estate deals, and
            exclusive offers – all in one place! Download now and streamline
            your business with Broki.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:justify-center md:justify-start font-[system-ui]">
            <DownloadButton
              href="https://www.apple.com/app-store/"
              icon={faApple}
              smallText="Download on the"
              boldText="Apple Store"
            />
            <DownloadButton
              href="https://play.google.com/store"
              icon={faGooglePlay}
              smallText="Get it on"
              boldText="Google Play"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default DownloadSec;
