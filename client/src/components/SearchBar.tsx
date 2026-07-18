import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  return (
    <form
      className="flex gap-x-2 mb-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(query);
      }}
    >
      <input
        type="text"
        placeholder="Search videos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-zinc-800 px-2 py-1 outline-none focus:outline-sky-500 text-slate-300 flex-1"
      />
      <button
        type="submit"
        className="bg-sky-500 hover:bg-sky-400 px-4 py-1 rounded-sm"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
