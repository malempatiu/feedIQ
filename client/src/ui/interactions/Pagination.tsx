import { ChevronLeft, ChevronRight } from "react-feather";
import { Button } from "./Button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='w-full flex items-center justify-center py-6'>
      <div className='flex items-center gap-4 bg-white shadow-md rounded-2xl px-6 py-3'>
        <Button variant='text' onClick={handlePrevious} disabled={currentPage === 0}>
          <ChevronLeft />
          Previous
        </Button>

        <span className='text-base font-medium'>
          Page <span className='text-xl font-semibold'>{currentPage + 1}</span> of{" "}
          {totalPages}
        </span>

        <Button
          variant='text'
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export { Pagination };
