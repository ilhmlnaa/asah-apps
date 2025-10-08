import React from "react";

const NotesSearch = ({ searchKeyword, onSearchChange }) => {
  const onSearchChangeHandler = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="note-search">
      <input
        className="note-search__input"
        type="text"
        placeholder="Cari catatan ..."
        value={searchKeyword}
        onChange={onSearchChangeHandler}
      />
    </div>
  );
};

export default NotesSearch;
