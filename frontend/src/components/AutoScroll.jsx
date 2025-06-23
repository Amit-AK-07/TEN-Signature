import Marquee from "react-fast-marquee";
import { logos } from "../lib/Constant";

const AutoScroll = () => {
  return (
    <section className="bg-white py-10 px-4 sm:px-8 md:px-16">
      <h2 className="text-center text-xl md:text-2xl font-semibold text-[#0f1f25] mb-8">
        Trusted by the world's best
      </h2>

      <Marquee
        direction="left"
        speed={40}
        gradient={false}
        className="overflow-hidden"
      >
        {logos.map((logo, idx) => (
          <div
            key={idx}
            className="mx-5 flex items-center justify-center min-w-[100px]"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="object-contain"
              loading="lazy"
              width={124}
              height={40}
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default AutoScroll;
