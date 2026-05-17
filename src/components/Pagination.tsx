import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getVisiblePages = (currentPage: number, totalPages: number) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const middleStart = Math.max(2, Math.min(currentPage - 1, totalPages - 3));
  const middlePages = [middleStart, middleStart + 1, middleStart + 2];
  const pages = new Set([1, ...middlePages, totalPages]);

  return Array.from(pages).sort(
    (firstPage, secondPage) => firstPage - secondPage
  );
};

const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPages, onPageChange } = props;
  const hasPages = totalPages > 1;

  if (!hasPages) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 py-2">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-slate-800 active:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Go to previous page"
      >
        <img src="/prev.png" alt="prev page" className="w-5" />
      </button>

      {visiblePages.map((page, index) => {
        const previousPage = visiblePages[index - 1];
        const hasGap = previousPage && page - previousPage > 1;
        const isActive = page === currentPage;

        return (
          <React.Fragment key={page}>
            {hasGap && (
              <span
                key={`gap-${page}`}
                className="flex h-10 min-w-6 items-center justify-center text-sm font-semibold text-slate-400"
              >
                ...
              </span>
            )}
            <button
              type="button"
              className={`h-10 min-w-10 rounded-lg px-3 text-sm font-semibold transition duration-150 ease-in-out ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100 active:bg-slate-200'
              }`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </React.Fragment>
        );
      })}

      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-slate-800 active:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Go to next page"
      >
        <img src="/next.png" alt="next page" className="w-5" />
      </button>
    </div>
  );
};

export default Pagination;
