import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export const useModal = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    type: "confirm",
    onConfirm: null,
  });

  const openModal = ({ title, message, type = "confirm", onConfirm }) => {
    setModalData({ title, message, type, onConfirm });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData({ title: "", message: "", type: "confirm", onConfirm: null });
  };

  const confirmModal = () => {
    if (modalData.onConfirm) {
      modalData.onConfirm();
    }
    closeModal();
  };

  const showAlert = (title, message) => {
    openModal({ title, message, type: "alert" });
  };

  const showConfirm = (itemName, onConfirm) => {
    openModal({
      title: t("confirmDelete"),
      message: `${t("confirmDeleteMessage")} "${itemName}" ?`,
      type: "confirm",
      onConfirm,
    });
  };

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
    confirmModal,
    showConfirm,
    showAlert,
  };
};
