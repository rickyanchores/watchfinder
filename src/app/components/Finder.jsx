'use client';

import React, { useState } from 'react';

const Finder = ({ searchItem }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    searchItem(query);
  };

  return (
    <div className='Finder bg-zinc-900 p-4 rounded-xl mt-2 grid grid-cols-2 gap-2'>
      <input
        className='bg-zinc-800 p-2 text-white rounded'
        type="text"
        placeholder='Find item...'
        value={query}
        onChange={handleInputChange}
      />
      <button
        className='bg-orange-600 text-white p-2 rounded'
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>
  );
}

export default Finder;
