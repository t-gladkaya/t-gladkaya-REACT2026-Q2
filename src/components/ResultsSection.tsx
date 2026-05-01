import React from 'react';

class ResultsSection extends React.Component {
  render() {
    return (
      <div className="flex-1 rounded-4xl bg-slate-100 p-8 shadow-sm">
        <div className="h-full flex flex-col items-center gap-5">
          <div>
            <img src="/star-icon.png" alt="star-icon" className="w-10" />
          </div>
          <div>Results will be displayed here</div>
        </div>
      </div>
    );
  }
}

export default ResultsSection;
