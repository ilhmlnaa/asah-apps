import React from "react";
import NoteItem from "./NoteItem";

const NotesList = ({
  notes,
  onDelete,
  onArchive,
  emptyMessage,
  isArchived = false,
}) => {
  if (notes.length === 0) {
    return (
      <div className="notes-list">
        <p className="notes-list__empty-message">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchive={onArchive}
          isArchived={isArchived}
        />
      ))}
    </div>
  );
};

export default NotesList;
