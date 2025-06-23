import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalItems);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex flex-col items-center mt-8 space-y-2">
      <div className="flex items-center space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <ChevronLeft size={16} />
        </button>
        <span className="font-semibold">{currentPage}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <p className="text-sm text-gray-600">
        {startItem}-{endItem} of {totalItems} available
      </p>
    </div>
  );
};

export default Pagination;
