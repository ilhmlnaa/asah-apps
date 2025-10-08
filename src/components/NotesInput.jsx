import React, { useState } from "react";

const NotesInput = ({ onAddNote }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const maxTitleLength = 50;

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (title.trim() === "" || body.trim() === "") {
      alert("Judul dan catatan tidak boleh kosong!");
      return;
    }

    onAddNote({ title, body });
    setTitle("");
    setBody("");
  };

  const onTitleChangeHandler = (event) => {
    const newTitle = event.target.value;
    if (newTitle.length <= maxTitleLength) {
      setTitle(newTitle);
    }
  };

  const onBodyChangeHandler = (event) => {
    setBody(event.target.value);
  };

  const remainingChars = maxTitleLength - title.length;

  return (
    <div className="note-input">
      <h2>Buat catatan</h2>
      <form className="note-input__body" onSubmit={onSubmitHandler}>
        <div className="note-input__title-container">
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={title}
            onChange={onTitleChangeHandler}
          />
          <p className="note-input__title__char-limit">
            Sisa karakter: {remainingChars}
          </p>
        </div>
        <textarea
          className="note-input__body"
          type="text"
          placeholder="Tuliskan catatanmu di sini ..."
          value={body}
          onChange={onBodyChangeHandler}
        />
        <button type="submit">Buat</button>
      </form>
    </div>
  );
};

export default NotesInput;
