import React, { useState, useMemo, useCallback, useContext } from "react";
import ReactHookComp from "./ReactHookComp";
import { AppContext } from "./AppContext";

// Debounce utility
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

export default function ReactHooks() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { user, setUser } = useContext(AppContext);

  const items = ["Shivam", "Rohit", "Anchal", "Amit", "Anirudh"];

  // Debounce the search input
  const updateSearch = useCallback(
    debounce((value) => {
      setDebouncedSearch(value);
    }, 500),
    []
  );

  // 🚀 search input changes → updateSearch called
  const handleSearch = (e) => {
    setSearch(e.target.value);
    updateSearch(e.target.value);
  };

  // 🚀 useMemo runs only when debouncedSearch changes
  const filteredItems = useMemo(() => {
    return items.filter((i) =>
      i.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch]);

  // Same stable callback
  const handleSelect = useCallback((item) => {
    alert(item);
  }, []);

  return (
    <div>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="user"
      />

      <h1>User: {user}</h1>

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="search"
      />

      {filteredItems.map((item, index = 0) => {
        return <ReactHookComp key={index + 1} item={item} onSelect={handleSelect} />;
      })}
    </div>
  );
}
