import React from 'react';

const SearchFilter = ({ value, onChange, placeholder }) => {
  return (
    <div className="input-group mt-3">
      <span className="input-group-text">Buscar: </span>
      <input value={value} onChange={onChange} placeholder={placeholder} type="text" className="form-control" aria-describedby="basic-addon3 basic-addon4" />
    </div>

  );
};

export default SearchFilter;