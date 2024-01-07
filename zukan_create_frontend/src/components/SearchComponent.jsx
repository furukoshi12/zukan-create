import React, { useState } from 'react'

export const SearchComponent = ({setSearchTerm}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) =>{
    setInputValue(e.target.value);
  }

  const handleSearchClick = () => {
    setSearchTerm(inputValue);
  };

  return (
    <>
      <input
        type='text'
        placeholder='Search...'
        value={inputValue}
        onChange={handleInputChange}
        />
        <button onClick={handleSearchClick}>Search</button>
    </>
  );
};
