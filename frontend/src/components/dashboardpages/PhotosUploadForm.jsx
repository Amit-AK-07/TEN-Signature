import React, { useState, useRef } from "react";

export default function PhotosUploadForm() {
  const [images, setImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [address, setAddress] = useState("");
  const fileInputRef = useRef(null); // reference to hidden input

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages(imagePreviews);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click(); // trigger file input click
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ images, videoUrl, address });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-4 md:p-8 rounded shadow space-y-6"
    >
      <h2 className="text-xl font-semibold">Upload photos of your property</h2>

      {/* Upload box */}
      <div
        className="border-2 rounded-md p-10 text-center hover:bg-gray-50 transition"
        onClick={handleBrowseClick}
      >
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <p className="font-medium">Upload/Drag photos of your property</p>
          <p className="text-sm text-gray-500">
            Photos must be JPEG or PNG format and at least 2048x768. First photo
            will be cover photo.
          </p>
          <button
            type="button"
            onClick={handleBrowseClick}
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Browse Files
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/jpeg, image/png"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Image previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img.url}
                alt={`Uploaded ${index + 1}`}
                className="rounded border w-full h-32 object-cover"
              />
              {index === 0 && (
                <span className="absolute top-1 left-1 bg-black text-white text-xs px-2 py-1 rounded">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Video URL */}
      <div>
        <label className="block font-medium mb-1">Video URL</label>
        <input
          type="url"
          placeholder="e.g. https://youtu.be/7hH0LQqhD2I"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block font-medium mb-1">Address</label>
        <input
          type="text"
          placeholder="Enter your location. Based on location, map will be updated below"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3"
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
      >
        Submit
      </button>
    </form>
  );
}
