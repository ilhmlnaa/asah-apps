import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getActiveNotes, deleteNote, archiveNote } from "../utils/local-data";
import { IoAddCircle } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";

function Homepage() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    const activeNotes = getActiveNotes();
    setNotes(activeNotes);
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
    const activeNotes = getActiveNotes();
    setNotes(activeNotes);
  };

  const onArchiveHandler = (id) => {
    archiveNote(id);
    const activeNotes = getActiveNotes();
    setNotes(activeNotes);
  };

  return (
    <>
      <SearchBar keyword={keyword} onSearch={onSearchHandler} />

      <NotesList
        notes={filteredNotes}
        onDelete={onDeleteHandler}
        onArchive={onArchiveHandler}
        showArchiveButton={true}
        emptyMessage={
          keyword
            ? `Tidak ada catatan dengan kata kunci "${keyword}"`
            : "Tidak ada catatan"
        }
      />

      <div className="homepage__action">
        <Link to="/notes/new" className="action" title="Tambah catatan">
          <IoAddCircle size={24} />
        </Link>
      </div>
    </>
  );
}

export default Homepage;
