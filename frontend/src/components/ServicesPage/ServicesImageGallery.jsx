const ServiceImageGallery = ({ images }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <img
      src={images?.[0] || "https://via.placeholder.com/600x400"}
      alt="Main"
      className="w-full h-[400px] object-cover rounded-xl"
    />
    <div className="flex gap-3 mt-4 overflow-x-auto">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Thumbnail ${idx}`}
          className="w-24 h-16 object-cover rounded-xl border border-gray-300"
        />
      ))}
    </div>
  </div>
);

export default ServiceImageGallery;
