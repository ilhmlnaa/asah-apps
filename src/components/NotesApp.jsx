import React, { useState } from "react";
import { getInitialData } from "../utils";
import NotesList from "./NotesList";
import NotesInput from "./NotesInput";
import NotesSearch from "./NotesSearch";

const NotesApp = () => {
  const [notes, setNotes] = useState(getInitialData());
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const activeNotes = filteredNotes.filter((note) => !note.archived);
  const archivedNotes = filteredNotes.filter((note) => note.archived);

  const onAddNote = ({ title, body }) => {
    const newNote = {
      id: +new Date(),
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString(),
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const onDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const onArchiveNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  const onSearchChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <div className="note-app">
      <header className="note-app__header">
        <h1>Notes</h1>
        <NotesSearch
          searchKeyword={searchKeyword}
          onSearchChange={onSearchChange}
        />
      </header>
      <section className="note-app__body">
        <NotesInput onAddNote={onAddNote} />
        <h2>Catatan Aktif</h2>
        <NotesList
          notes={activeNotes}
          onDelete={onDeleteNote}
          onArchive={onArchiveNote}
          emptyMessage="Tidak ada catatan"
        />
        <h2>Arsip</h2>
        <NotesList
          notes={archivedNotes}
          onDelete={onDeleteNote}
          onArchive={onArchiveNote}
          emptyMessage="Tidak ada catatan"
          isArchived={true}
        />
      </section>
      <footer className="note-app__footer">
        <p>&copy; 2025 Ilham Maulana - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default NotesApp;
