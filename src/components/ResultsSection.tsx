import React from 'react';
import Card from './Card';
import type { Planet } from './Card';
import PaginationButtons from './Pagination';

interface PlanetResults {
  count: number;
  results: Planet[];
}

interface ResultsSectionProps {
  results: Planet[];
  loading: boolean;
  error?: string | null;
}

class ResultsSection extends React.Component<
  ResultsSectionProps,
  PlanetResults
> {
  render() {
    const { results, loading, error } = this.props;

    return (
      <div className="flex-1 rounded-4xl bg-slate-100 p-8 shadow-sm">
        <div className="h-full flex flex-col items-center gap-5">
          <div>
            <img src="/star-icon.png" alt="star-icon" className="w-10" />
          </div>
          <div className="w-full">
            {loading ? (
              <div className="text-slate-600">Loading...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : results.length === 0 ? (
              <div className="text-slate-600">
                Results will be displayed here.
              </div>
            ) : (
              <div className="grid justify-items-center gap-5 md:grid-cols-3">
                {results.slice(0, 9).map((item) => (
                  <Card key={item.url} data={item} />
                ))}
              </div>
            )}
          </div>
          <PaginationButtons />
        </div>
      </div>
    );
  }
}

export default ResultsSection;
