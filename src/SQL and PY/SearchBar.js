import React from 'react';

const SearchBar = ({ setSearchTerm }) => {
  const [searchTerm, setSearch] = React.useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchBar;