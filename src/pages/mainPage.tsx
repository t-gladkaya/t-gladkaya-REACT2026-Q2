import React from 'react';
import SearchLine from '../components/searchLine';
import ResultsSection from '../components/resultsSection';

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-295 flex-col gap-8 px-6 py-8">
        <SearchLine />
        <ResultsSection />
      </div>
    </div>
  );
};

export default MainPage;
