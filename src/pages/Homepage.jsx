import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getActiveNotes, deleteNote, archiveNote } from "../utils/network-data";
import { IoAddCircle } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { useLanguage } from "../contexts/LanguageContext";
import { useToast } from "../contexts/ToastContext";
import { useModal } from "../hooks/useModal";

function Homepage() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const { t } = useLanguage();
  const { showSuccess, showError } = useToast();
  const modal = useModal();

  useEffect(() => {
    document.title = `${t("home")} - ${t("appName")}`;
  }, [t]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const { error, data } = await getActiveNotes();
      if (!error) {
        setNotes(data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (keyword.trim() === "") {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(keyword.toLowerCase()) ||
          note.body.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [notes, keyword]);

  const onSearchHandler = (keyword) => {
    setSearchParams(keyword ? { keyword } : {});
  };

  const onDeleteHandler = (id) => {
    const note = notes.find((n) => n.id === id);

    const confirmDelete = async () => {
      if (!id) return;

      try {
        const { error } = await deleteNote(id);
        if (!error) {
          showSuccess(t("noteDeleted"));
          fetchNotes();
        } else {
          showError(t("noteDeletedFailed"));
        }
      } catch (error) {
        console.error("Error deleting note:", error);
        showError(t("noteDeletedFailed"));
      }
    };

    modal.showConfirm(note?.title, confirmDelete);
  };

  const onArchiveHandler = async (id) => {
    try {
      const { error } = await archiveNote(id);
      if (!error) {
        showSuccess(t("noteArchived"));
        fetchNotes();
      } else {
        showError(t("noteArchivedFailed"));
      }
    } catch (error) {
      console.error("Error archiving note:", error);
      showError(t("noteArchivedFailed"));
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <SearchBar keyword={keyword} onSearch={onSearchHandler} />

      <NotesList
        notes={filteredNotes}
        onDelete={onDeleteHandler}
        onArchive={onArchiveHandler}
        showArchiveButton={true}
        emptyMessage={keyword ? `${t("noNotes")} "${keyword}"` : t("noNotes")}
      />

      <div className="homepage__action">
        <Link to="/notes/new" className="action" title={t("addNote")}>
          <IoAddCircle size={24} />
        </Link>
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={modal.closeModal}
        onConfirm={modal.confirmModal}
        title={modal.modalData.title}
        message={modal.modalData.message}
        type="confirm"
      />
    </>
  );
}

export default Homepage;
