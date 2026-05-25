import Card from './Card';
import type { Character } from './Card';
import PreLoader from './PreLoader';
import ErrorFallback from './ErrorFallback';

interface ResultsSectionProps {
  results: Character[];
  loading: boolean;
  currentPage: number;
  error?: Error | null;
}

const ResultsSection = (props: ResultsSectionProps) => {
  const { results, loading, currentPage, error } = props;

  return (
    <div className="flex-1 rounded-4xl bg-slate-100 p-8 shadow-sm transition-colors duration-300 dark:bg-slate-900">
      <div className="h-full flex flex-col items-center gap-5">
        <div>
          <img src="/star-icon.png" alt="star-icon" className="w-10" />
        </div>
        <div className="w-full">
          {loading ? (
            <PreLoader />
          ) : error ? (
            <ErrorFallback error={error} />
          ) : results.length === 0 ? (
            <div className="text-slate-600 dark:text-slate-300">
              Nothing found for this search
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] justify-items-center gap-5">
              {results.map((item) => (
                <Card
                  key={item.id}
                  data={item}
                  detailsHref={`/page/${currentPage}/details/${item.id}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
