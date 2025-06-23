export default function HeroSection({ content, children }) {
  return (
    <section className="relative overflow-hidden bg-[#d9f4f0]">
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-16 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8">
        <div className="w-full xl:w-1/2">
          <h1 className="animate-up-5 text-3xl md:text-4xl font-semibold text-[#0f1f25] leading-tight mb-8">
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
        </div>
        <div className="hidden xl:block relative mt-12 -left-12 h-[36rem] w-[476px]">
          <img
            src={content.imageSrc}
            alt={content.imageAlt}
            className="h-full w-full object-cover rounded-md hidden lg:block"
            loading="lazy"
          />
          <div className="bounce-y absolute left-1/2 -translate-x-1/2 bg-white rounded-xl p-2 shadow-lg text-center transition-transform duration-300 ease-out bottom-5">
            <img
              src={content.subImageSrc}
              alt="Sub Hero Image"
              className="rounded-full w-[17.25rem] h-36 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
