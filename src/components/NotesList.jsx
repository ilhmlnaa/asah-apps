import NoteItem from "./NoteItem";

function NotesList({
  notes,
  onDelete,
  onArchive,
  onUnarchive,
  showArchiveButton = false,
  emptyMessage = "Tidak ada catatan",
}) {
  if (notes.length === 0) {
    return (
      <div className="notes-list-empty">
        <p>{emptyMessage}</p>
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
          onUnarchive={onUnarchive}
          showArchiveButton={showArchiveButton}
        />
      ))}
    </div>
  );
}

export default NotesList;
