import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getArchivedNotes,
  deleteNote,
  unarchiveNote,
} from "../utils/network-data";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { useLanguage } from "../contexts/LanguageContext";
import { useToast } from "../contexts/ToastContext";
import { useModal } from "../hooks/useModal";

function ArchivedPage() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const { t } = useLanguage();
  const { showSuccess, showError } = useToast();
  const modal = useModal();

  const fetchArchivedNotes = async () => {
    setLoading(true);
    try {
      const { error, data } = await getArchivedNotes();
      if (!error) {
        setNotes(data);
      }
    } catch (error) {
      console.error("Error fetching archived notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${t("archivedPage")} - ${t("appName")}`;
  }, [t]);

  useEffect(() => {
    fetchArchivedNotes();
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
      if (!noteToDelete) return;

      try {
        const { error } = await deleteNote(id);
        if (!error) {
          showSuccess(t("noteDeleted"));
          fetchArchivedNotes();
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

  const onUnarchiveHandler = async (id) => {
    try {
      const { error } = await unarchiveNote(id);
      if (!error) {
        showSuccess(t("noteUnarchived"));
        fetchArchivedNotes();
      } else {
        showError(t("noteUnarchivedFailed"));
      }
    } catch (error) {
      console.error("Error unarchiving note:", error);
      showError(t("noteUnarchivedFailed"));
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2>{t("archivedNotes")}</h2>
      <SearchBar keyword={keyword} onSearch={onSearchHandler} />

      <NotesList
        notes={filteredNotes}
        onDelete={onDeleteHandler}
        onUnarchive={onUnarchiveHandler}
        showArchiveButton={true}
        emptyMessage={keyword ? `${t("noNotes")} "${keyword}"` : t("noNotes")}
      />

      <Modal
        isOpen={modal.isOpen}
        onClose={modal.closeModal}
        onConfirm={modal.confirmModal}
        title={modal.modalData.title}
        message={modal.modalData.message}
        type={modal.modalData.type}
      />
    </div>
  );
}

export default ArchivedPage;
