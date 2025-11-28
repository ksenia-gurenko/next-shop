// components/Pagination.tsx
import { useProductStore } from '@/store/productStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalItems: number;
}

export default function Pagination({ totalItems }: PaginationProps) {
  const { currentPage, itemsPerPage, setCurrentPage } = useProductStore();
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}