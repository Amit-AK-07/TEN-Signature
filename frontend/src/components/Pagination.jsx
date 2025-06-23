const Pagination = ({ totalPages, currentPage, onPageChange }) => (
  <div className="mt-10 flex flex-col items-center justify-center">
    <div className="flex space-x-2">
      <button
        className="w-8 h-8 flex items-center justify-center bg-white border rounded-full shadow"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ❮
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`w-8 h-8 flex items-center justify-center border rounded-full text-sm font-medium ${
            currentPage === i + 1
              ? "bg-[#26c4a0] text-white"
              : "bg-white text-gray-800"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="w-8 h-8 flex items-center justify-center bg-white border rounded-full shadow"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ❯
      </button>
    </div>
    <p className="text-sm text-gray-600 mt-2">
      Page {currentPage} of {totalPages}
    </p>
  </div>
);

export default Pagination;
