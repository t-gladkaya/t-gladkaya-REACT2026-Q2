import React from 'react';

interface SearchLineProps {
  value?: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

class SearchLine extends React.Component<SearchLineProps> {
  render() {
    const input = this.props.value;

    return (
      <div className="flex justify-end items-center gap-4 m-4">
        <input
          type="text"
          placeholder="Start typing to find..."
          value={input}
          onChange={(e) => this.props.onChange(e.target.value)}
          className="w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-slate-400"
        />
        <button
          type="button"
          className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 duration-150 ease-in-out cursor-pointer active:bg-slate-700"
          onClick={() => this.props.onSearch()}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchLine;
