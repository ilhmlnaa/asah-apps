import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getArchivedNotes,
  deleteNote,
  unarchiveNote,
} from "../utils/local-data";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";

function ArchivedPage() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    const archivedNotes = getArchivedNotes();
    setNotes(archivedNotes);
  }, []);

  useEffect(() => {
    if (keyword.trim() === "") {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [notes, keyword]);

  const onSearchHandler = (keyword) => {
    setSearchParams(keyword ? { keyword } : {});
  };

  const onDeleteHandler = (id) => {
    deleteNote(id);
    const archivedNotes = getArchivedNotes();
    setNotes(archivedNotes);
  };

  const onUnarchiveHandler = (id) => {
    unarchiveNote(id);
    const archivedNotes = getArchivedNotes();
    setNotes(archivedNotes);
  };

  return (
    <div>
      <h2>Catatan Arsip</h2>
      <SearchBar keyword={keyword} onSearch={onSearchHandler} />

      <NotesList
        notes={filteredNotes}
        onDelete={onDeleteHandler}
        onUnarchive={onUnarchiveHandler}
        showArchiveButton={true}
        emptyMessage={
          keyword
            ? `Tidak ada catatan arsip dengan kata kunci "${keyword}"`
            : "Arsip kosong"
        }
      />
    </div>
  );
}

export default ArchivedPage;
