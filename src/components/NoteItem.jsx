import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdArchive } from "react-icons/io";
import { MdUnarchive } from "react-icons/md";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils";

function NoteItem({
  note,
  onDelete,
  onArchive,
  onUnarchive,
  showArchiveButton = false,
}) {
  return (
    <div className="note-item">
      <h3 className="note-item__title">
        <Link
          to={`/notes/${note.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {note.title}
        </Link>
      </h3>
      <p className="note-item__createdAt">
        {showFormattedDate(note.createdAt)}
      </p>
      <p className="note-item__body">{note.body}</p>

      <div className="note-item__actions">
        <button
          className="action danger"
          onClick={() => onDelete(note.id)}
          title="Hapus"
        >
          <FaTrashAlt />
        </button>
        {showArchiveButton ? (
          note.archived ? (
            <button
              className="action"
              onClick={() => onUnarchive(note.id)}
              title="Keluarkan dari arsip"
            >
              <MdUnarchive />
            </button>
          ) : (
            <button
              className="action"
              onClick={() => onArchive(note.id)}
              title="Arsipkan"
            >
              <IoMdArchive />
            </button>
          )
        ) : null}
      </div>
    </div>
  );
}

export default NoteItem;
