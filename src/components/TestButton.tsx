import React from 'react';

class TestButton extends React.Component {
  render() {
    return (
      <button
        type="button"
        className="flex self-center justify-center w-40 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 duration-150 ease-in-out cursor-pointer active:bg-slate-700"
        onClick={() => {}}
      >
        Test Button
      </button>
    );
  }
}

export default TestButton;
