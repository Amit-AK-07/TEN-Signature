import React from "react";
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
    <section className=" mx-auto px-20 max-lg:px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 bg-[#181a20]">
      {/* Left Side Content */}
      <div className="container ">
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-6 text-[white]">
          {photoText.map((part, index) =>
            part.highlight ? (
              <>
                &nbsp;
                <span key={index} className="text-[#26c4a0]">
                  {part.textMain}
                  <br />
                </span>
              </>
            ) : (
              <>
                <span key={index} className="">
                  {part.text}
                </span>
              </>
            )
          )}
        </h1>
        <p className="text-base sm:text-lg font-normal text-white/90 mb-8 leading-relaxed">
          {description}
        </p>
        <Link to="/listings" className="max-sm:flex max-sm:justify-center">
          <button
            type="button"
            className="bg-[#2bb89a] font-semibold text-white rounded-lg px-6 py-3 hover:bg-[#27a386] transition-colors duration-300 cursor-pointer"
          >
            {ButtonText}
          </button>
        </Link>
      </div>
      <div className="flex-shrink-0">
        <img
          src={imagePhotoSec}
          alt={imageAlt}
          className="lg:w-[400px] w-[300px] max-w-full"
          loading="lazy"
          width="400"
          height="500"
        />
      </div>
    </section>
  );
}

export default PhotographySec;
