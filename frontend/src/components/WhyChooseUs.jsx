import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { features } from "../lib/Constant";
import HeroImg from "../assets/images/hero-img.webp";

const WhyChooseUs = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
        {/* Left Side Image */}
        <div className="w-full max-w-md lg:max-w-lg flex-shrink-0">
          <img
            src={HeroImg}
            alt="Smiling woman with arms crossed"
            className="w-full h-auto rounded-md object-cover"
            width={600}
            height={600}
          />
        </div>

        {/* Right Side Content */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-2xl font-extrabold leading-tight mb-2">
            Why Choose Us
          </h2>
          <p className="text-sm leading-relaxed mb-8 max-w-md">
            We offer the full spectrum of services to help individuals choose
            the right food business at the right price.
          </p>

          <ul className="space-y-8 max-w-md">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-5">
                <div className="flex-shrink-0 flex items-center justify-center w-[70px] h-[70px] bg-[hsla(8,79%,62%,0.07)] rounded-full text-[#ffa800] text-[30px] leading-[80px] text-center transition-all duration-400 ease-in-out hover:bg-[#ffa800] hover:text-white">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <div>
                  <h6 className="font-semibold text-lg leading-snug mb-1">
                    {feature.title}
                  </h6>
                  <p className="text-xs leading-relaxed max-w-xs">
                    {feature.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default WhyChooseUs;
