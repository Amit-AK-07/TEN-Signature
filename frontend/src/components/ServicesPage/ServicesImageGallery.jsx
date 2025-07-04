const ServiceImageGallery = ({ images }) => {
  const displayImages =
    images && images.length > 0
      ? images
      : ["https://via.placeholder.com/600x400"]; // Default fallback image

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-200">
      {/* Main Image */}
      <div className="w-full rounded-xl overflow-hidden">
        <img
          src={displayImages[0]}
          alt="Main"
          className="w-full object-cover rounded-xl aspect-square sm:aspect-[3/2]" // square on mobile, 3:2 on desktop
        />
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {displayImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Thumbnail ${idx + 1}`}
              className="w-20 h-12 sm:w-20 sm:h-20 object-cover rounded-xl border border-gray-300 flex-shrink-0"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceImageGallery;
