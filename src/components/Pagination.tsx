import React from 'react';

class PaginationButtons extends React.Component {
  render() {
    return (
      <div className="flex justify-center gap-4 mt-5">
        <button
          type="button"
          className="flex self-center justify-center w-20 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 duration-150 ease-in-out cursor-pointer active:bg-slate-700"
          onClick={() => {}}
        >
          Previous
        </button>
        <button
          type="button"
          className="flex self-center justify-center w-20 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 duration-150 ease-in-out cursor-pointer active:bg-slate-700"
          onClick={() => {}}
        >
          Next
        </button>
      </div>
    );
  }
}

export default PaginationButtons;
