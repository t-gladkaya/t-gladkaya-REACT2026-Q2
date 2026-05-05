import React from 'react';
import Card from './Card';
import type { Character } from './Card';
import PreLoader from './PreLoader';
import ErrorFallback from './ErrorFallback';

interface ResultsSectionProps {
  results: Character[];
  loading: boolean;
  error?: Error | null;
}

class ResultsSection extends React.Component<ResultsSectionProps> {
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
              <PreLoader />
            ) : error ? (
              <ErrorFallback error={error} />
            ) : results.length === 0 ? (
              <div className="text-slate-600">
                Nothing found for this search
              </div>
            ) : (
              <div className="grid justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                {results.map((item) => (
                  <Card key={item.id} data={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ResultsSection;
