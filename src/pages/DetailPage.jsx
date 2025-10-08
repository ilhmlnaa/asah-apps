import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/local-data";
import { showFormattedDate } from "../utils";
import { FaBackspace } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdArchive } from "react-icons/io";
import { MdUnarchive } from "react-icons/md";

function DetailPage() {
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const noteData = getNote(id);
    if (noteData) {
      setNote(noteData);
    } else {
      navigate("/404", { replace: true });
    }
  }, [id, navigate]);

  const onDeleteHandler = () => {
    deleteNote(id);
    navigate("/");
  };

  const onArchiveHandler = () => {
    archiveNote(id);
    navigate("/");
  };

  const onUnarchiveHandler = () => {
    unarchiveNote(id);
    navigate("/archived");
  };

  if (!note) {
    return <div className="loading">Memuat catatan...</div>;
  }

  return (
    <div className="detail-page">
      <h1 className="detail-page__title">{note.title}</h1>
      <p className="detail-page__createdAt">
        {showFormattedDate(note.createdAt)}
      </p>
      <div className="detail-page__body">{note.body}</div>

      <div className="detail-page__actions">
        <button className="btn btn-danger" onClick={onDeleteHandler}>
          <FaTrashAlt size={24} /> Hapus
        </button>

        {note.archived ? (
          <button className="btn btn-primary" onClick={onUnarchiveHandler}>
            <MdUnarchive size={24} /> Keluarkan dari Arsip
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={onArchiveHandler}>
            <IoMdArchive size={24} /> Arsipkan
          </button>
        )}

        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <FaBackspace size={24} /> Kembali
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
