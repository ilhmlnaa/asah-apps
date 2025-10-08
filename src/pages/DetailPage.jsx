import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getNote,
  deleteNote as apiDeleteNote,
  archiveNote as apiArchiveNote,
  unarchiveNote as apiUnarchiveNote,
} from "../utils/network-data";
import { showFormattedDate } from "../utils";
import { FaBackspace } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdArchive } from "react-icons/io";
import { MdUnarchive } from "react-icons/md";
import { useLanguage } from "../contexts/LanguageContext";
import { useToast } from "../contexts/ToastContext";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

function DetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    document.title = `${t("detailPage")} - ${t("appName")}`;
  }, [t]);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        const { error, data } = await getNote(id);
        if (!error) {
          setNote(data);
        } else {
          navigate("/404", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching note:", error);
        navigate("/404", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const onDeleteHandler = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const { error } = await apiDeleteNote(id);
      if (!error) {
        showSuccess(t("noteDeleted") || "Catatan berhasil dihapus");
        navigate("/");
      } else {
        showError("Gagal menghapus catatan");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      showError("Terjadi kesalahan saat menghapus catatan");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const onArchiveHandler = async () => {
    try {
      const { error } = await apiArchiveNote(id);
      if (!error) {
        showSuccess(t("noteArchived"));
        navigate("/");
      } else {
        showError(t("noteArchivedFailed"));
      }
    } catch (error) {
      console.error("Error archiving note:", error);
      showError(t("noteArchivedFailed"));
    }
  };

  const onUnarchiveHandler = async () => {
    try {
      const { error } = await apiUnarchiveNote(id);
      if (!error) {
        showSuccess(t("noteUnarchived"));
        navigate("/archived");
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

  if (!note) {
    return <div className="loading">{t("loading")}</div>;
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
          <FaTrashAlt size={24} /> {t("delete")}
        </button>

        {note.archived ? (
          <button className="btn btn-primary" onClick={onUnarchiveHandler}>
            <MdUnarchive size={24} /> {t("unarchive")}
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={onArchiveHandler}>
            <IoMdArchive size={24} /> {t("archive")}
          </button>
        )}

        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <FaBackspace size={24} /> {t("cancel")}
        </button>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title={t("confirmDelete")}
        message={note ? `${t("confirmDeleteMessage")} "${note.title}"?` : ""}
        type="confirm"
      />
    </div>
  );
}

export default DetailPage;
