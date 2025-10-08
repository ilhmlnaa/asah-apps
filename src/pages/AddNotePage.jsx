import React, { useState } from "react";
import { FaSave, FaBackspace } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/local-data";

function AddNotePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "" || body.trim() === "") {
      alert("Judul dan isi catatan tidak boleh kosong!");
      return;
    }

    addNote({ title, body });
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Tambah Catatan Baru</h2>

      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="title">Judul Catatan</label>
          <input
            type="text"
            id="title"
            className="form-input"
            placeholder="Masukkan judul catatan..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="50"
          />
          <small style={{ color: "var(--on-background-grey)" }}>
            {title.length}/50 karakter
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="body">Isi Catatan</label>
          <textarea
            id="body"
            className="form-input form-textarea"
            placeholder="Tulis isi catatan di sini..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <FaSave size={24} /> Simpan Catatan
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            <FaBackspace size={24} /> Kembali
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNotePage;
