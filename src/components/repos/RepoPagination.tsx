
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { generatePageNumbers } from "./utils";

interface RepoPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const RepoPagination = ({ currentPage, totalPages, onPageChange }: RepoPaginationProps) => {
  if (totalPages <= 1) return null;
  
  const pageNumbers = generatePageNumbers(currentPage, totalPages);
  
  return (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
            </PaginationItem>
          )}
          
          {pageNumbers.map((pageNum, index) => (
            pageNum === null ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={pageNum}>
                <PaginationLink 
                  isActive={pageNum === currentPage}
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            )
          ))}
          
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default RepoPagination;
