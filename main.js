// Konstanta untuk localStorage key
const STORAGE_KEY = "BOOKSHELF_APPS";

// Array untuk menyimpan data buku
let books = [];

// DOM Elements
const bookForm = document.getElementById("bookForm");
const bookFormTitle = document.getElementById("bookFormTitle");
const bookFormAuthor = document.getElementById("bookFormAuthor");
const bookFormYear = document.getElementById("bookFormYear");
const bookFormIsComplete = document.getElementById("bookFormIsComplete");
const bookFormSubmit = document.getElementById("bookFormSubmit");
const searchForm = document.getElementById("searchBook");
const searchBookTitle = document.getElementById("searchBookTitle");
const incompleteBookList = document.getElementById("incompleteBookList");
const completeBookList = document.getElementById("completeBookList");
const searchResultsContainer = document.getElementById(
  "searchResultsContainer"
);
const searchResultsTitle = document.getElementById("searchResultsTitle");
const searchResultsList = document.getElementById("searchResultsList");
const clearSearchBtn = document.getElementById("clearSearch");

// Event yang dijalankan ketika DOM sudah siap
document.addEventListener("DOMContentLoaded", function () {
  loadDataFromStorage();
  renderBooks();

  bookForm.addEventListener("submit", addBook);
  searchForm.addEventListener("submit", searchBooks);
  bookFormIsComplete.addEventListener("change", updateSubmitButtonText);
  clearSearchBtn.addEventListener("click", clearSearch);

  updateSubmitButtonText();
});

// Fungsi untuk generate ID unik
function generateId() {
  return Number(new Date());
}

// Fungsi untuk load data dari localStorage
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  if (serializedData !== null) {
    books = JSON.parse(serializedData);
  }
}

// Fungsi untuk save data ke localStorage
function saveDataToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

// Fungsi untuk update teks button submit
function updateSubmitButtonText() {
  const span = bookFormSubmit.querySelector("span");
  if (bookFormIsComplete.checked) {
    span.textContent = "Selesai dibaca";
  } else {
    span.textContent = "Belum selesai dibaca";
  }
}

// Fungsi untuk menambah buku baru
function addBook(event) {
  event.preventDefault();

  const title = bookFormTitle.value.trim();
  const author = bookFormAuthor.value.trim();
  const year = parseInt(bookFormYear.value);
  const isComplete = bookFormIsComplete.checked;

  if (!title || !author || !year) {
    showMessage("Semua field harus diisi!", "error");
    return;
  }

  if (year < 1000 || year > new Date().getFullYear() + 10) {
    showMessage("Tahun tidak valid!", "error");
    return;
  }

  const newBook = {
    id: generateId(),
    title: title,
    author: author,
    year: year,
    isComplete: isComplete,
  };

  books.push(newBook);
  saveDataToStorage();
  renderBooks();
  bookForm.reset();
  updateSubmitButtonText();
  showMessage(`Buku "${title}" berhasil ditambahkan!`, "success");
}

// Fungsi untuk mencari buku
function searchBooks(event) {
  event.preventDefault();
  const searchTitle = searchBookTitle.value.toLowerCase().trim();

  if (searchTitle === "") {
    hideSearchResults();
    renderBooks();
    return;
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTitle)
  );

  showSearchResults(filteredBooks, searchTitle);
  renderBooks();
  showMessage(
    `Ditemukan ${filteredBooks.length} buku dengan kata kunci "${searchTitle}"`,
    "info"
  );
}

// Fungsi untuk render semua buku
function renderBooks(booksToRender = books) {
  const incompleteBooks = booksToRender.filter((book) => !book.isComplete);
  const completeBooks = booksToRender.filter((book) => book.isComplete);
  renderBookList(incompleteBooks, incompleteBookList, false);
  renderBookList(completeBooks, completeBookList, true);
}

// Fungsi untuk render list buku
function renderBookList(bookList, container, isComplete) {
  container.innerHTML = "";

  if (bookList.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = isComplete
      ? "Belum ada buku yang selesai dibaca"
      : "Belum ada buku yang belum selesai dibaca";
    container.appendChild(emptyState);
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "book-container";

  bookList.forEach((book) => {
    const bookElement = createBookElement(book);
    wrapper.appendChild(bookElement);
  });

  container.appendChild(wrapper);
}

// Fungsi untuk membuat elemen buku
function createBookElement(book) {
  const bookDiv = document.createElement("div");
  bookDiv.setAttribute("data-bookid", book.id);
  bookDiv.setAttribute("data-testid", "bookItem");

  const title = document.createElement("h3");
  title.setAttribute("data-testid", "bookItemTitle");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.setAttribute("data-testid", "bookItemAuthor");
  author.textContent = `Penulis: ${book.author}`;

  const year = document.createElement("p");
  year.setAttribute("data-testid", "bookItemYear");
  year.textContent = `Tahun: ${book.year}`;

  const buttonContainer = document.createElement("div");

  const toggleButton = document.createElement("button");
  toggleButton.setAttribute("data-testid", "bookItemIsCompleteButton");
  toggleButton.textContent = book.isComplete
    ? "Belum selesai dibaca"
    : "Selesai dibaca";
  toggleButton.addEventListener("click", () => toggleBookStatus(book.id));

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
  deleteButton.textContent = "Hapus Buku";
  deleteButton.addEventListener("click", () => deleteBook(book.id));

  const editButton = document.createElement("button");
  editButton.setAttribute("data-testid", "bookItemEditButton");
  editButton.textContent = "Edit Buku";
  editButton.addEventListener("click", () => editBook(book.id));

  buttonContainer.appendChild(toggleButton);
  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(editButton);

  bookDiv.appendChild(title);
  bookDiv.appendChild(author);
  bookDiv.appendChild(year);
  bookDiv.appendChild(buttonContainer);

  return bookDiv;
}

// Fungsi untuk toggle status buku (selesai/belum selesai dibaca)
function toggleBookStatus(bookId) {
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex].isComplete = !books[bookIndex].isComplete;
    saveDataToStorage();
    renderBooks();
    const book = books[bookIndex];
    const status = book.isComplete ? "selesai dibaca" : "belum selesai dibaca";
    showMessage(
      `Buku "${book.title}" dipindahkan ke rak ${status}!`,
      "success"
    );
  }
}

// Fungsi untuk hapus buku
function deleteBook(bookId) {
  const book = books.find((book) => book.id === bookId);
  if (!book) return;
  createDeleteModal(book);
}

// Fungsi untuk edit buku
function editBook(bookId) {
  const book = books.find((book) => book.id === bookId);
  if (!book) return;
  createEditModal(book);
}

// Fungsi untuk membuat modal edit
function createEditModal(book) {
  const existingModal = document.getElementById("editModal");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.id = "editModal";
  modal.className = "modal";
  modal.style.display = "block";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const header = document.createElement("h2");
  header.textContent = "Edit Buku";
  header.style.marginBottom = "1.5rem";

  const closeBtn = document.createElement("span");
  closeBtn.className = "close";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => {
    modal.remove();
  });

  // Form edit
  const editForm = document.createElement("form");
  editForm.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <label for="editTitle">Judul</label>
            <input type="text" id="editTitle" value="${book.title}" required>
        </div>
        <div style="margin-bottom: 1rem;">
            <label for="editAuthor">Penulis</label>
            <input type="text" id="editAuthor" value="${book.author}" required>
        </div>
        <div style="margin-bottom: 1rem;">
            <label for="editYear">Tahun</label>
            <input type="number" id="editYear" value="${book.year}" required>
        </div>
        <div style="margin-bottom: 1.5rem;">
            <label for="editIsComplete">
                <input type="checkbox" id="editIsComplete" ${
                  book.isComplete ? "checked" : ""
                }>
                Selesai dibaca
            </label>
        </div>
        <div style="display: flex; gap: 1rem;">
            <button type="submit" style="flex: 1;">Simpan Perubahan</button>
            <button type="button" id="cancelEdit" style="flex: 1; background: #6b7280;">Batal</button>
        </div>
    `;

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("editTitle").value.trim();
    const author = document.getElementById("editAuthor").value.trim();
    const year = parseInt(document.getElementById("editYear").value);
    const isComplete = document.getElementById("editIsComplete").checked;

    if (!title || !author || !year) {
      showMessage("Semua field harus diisi!", "error");
      return;
    }

    if (year < 1000 || year > new Date().getFullYear() + 10) {
      showMessage("Tahun tidak valid!", "error");
      return;
    }

    const bookIndex = books.findIndex((b) => b.id === book.id);
    if (bookIndex !== -1) {
      books[bookIndex] = {
        ...books[bookIndex],
        title: title,
        author: author,
        year: year,
        isComplete: isComplete,
      };

      saveDataToStorage();
      renderBooks();
      modal.remove();
      showMessage(`Buku "${title}" berhasil diperbarui!`, "success");
    }
  });

  editForm.querySelector("#cancelEdit").addEventListener("click", () => {
    modal.remove();
  });

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(header);
  modalContent.appendChild(editForm);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);
  document.getElementById("editTitle").focus();

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Fungsi untuk membuat modal delete
function createDeleteModal(book) {
  const existingModal = document.getElementById("deleteModal");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.id = "deleteModal";
  modal.className = "modal";
  modal.style.display = "block";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.style.textAlign = "center";

  const header = document.createElement("h2");
  header.textContent = "Hapus Buku";
  header.style.marginBottom = "1.5rem";
  header.style.color = "#e53e3e";

  const closeBtn = document.createElement("span");
  closeBtn.className = "close";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => {
    modal.remove();
  });

  const warningIcon = document.createElement("div");
  warningIcon.innerHTML = "⚠️";
  warningIcon.style.fontSize = "4rem";
  warningIcon.style.marginBottom = "1rem";

  const message = document.createElement("p");
  message.innerHTML = `Apakah Anda yakin ingin menghapus buku<br><strong>"${book.title}"</strong>?`;
  message.style.marginBottom = "1.5rem";
  message.style.fontSize = "1.1rem";
  message.style.color = "#4a5568";

  const subMessage = document.createElement("p");
  subMessage.textContent = "Tindakan ini tidak dapat dibatalkan.";
  subMessage.style.marginBottom = "2rem";
  subMessage.style.fontSize = "0.9rem";
  subMessage.style.color = "#718096";
  subMessage.style.fontStyle = "italic";

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "1rem";
  buttonContainer.style.justifyContent = "center";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Hapus Buku";
  deleteButton.style.background =
    "linear-gradient(135deg, #f56565 0%, #e53e3e 100%)";
  deleteButton.style.color = "white";
  deleteButton.style.border = "none";
  deleteButton.style.padding = "0.75rem 1.5rem";
  deleteButton.style.borderRadius = "8px";
  deleteButton.style.cursor = "pointer";
  deleteButton.style.fontWeight = "500";
  deleteButton.style.minWidth = "120px";

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Batal";
  cancelButton.style.background =
    "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)";
  cancelButton.style.color = "white";
  cancelButton.style.border = "none";
  cancelButton.style.padding = "0.75rem 1.5rem";
  cancelButton.style.borderRadius = "8px";
  cancelButton.style.cursor = "pointer";
  cancelButton.style.fontWeight = "500";
  cancelButton.style.minWidth = "120px";

  deleteButton.addEventListener("click", () => {
    const bookIndex = books.findIndex((b) => b.id === book.id);
    if (bookIndex !== -1) {
      books.splice(bookIndex, 1);
      saveDataToStorage();
      renderBooks();
      modal.remove();
      showMessage(`Buku "${book.title}" berhasil dihapus!`, "success");
    }
  });

  cancelButton.addEventListener("click", () => {
    modal.remove();
  });

  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(deleteButton);

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(header);
  modalContent.appendChild(warningIcon);
  modalContent.appendChild(message);
  modalContent.appendChild(subMessage);
  modalContent.appendChild(buttonContainer);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);
  cancelButton.focus();

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Fungsi untuk menampilkan pesan
function showMessage(message, type = "info") {
  const existingMessage = document.querySelector(".message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = message;

  let backgroundColor;
  switch (type) {
    case "success":
      backgroundColor = "linear-gradient(135deg, #48bb78 0%, #38a169 100%)";
      break;
    case "error":
      backgroundColor = "linear-gradient(135deg, #f56565 0%, #e53e3e 100%)";
      break;
    case "info":
    default:
      backgroundColor = "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
      break;
  }

  messageElement.style.cssText = `
        background: ${backgroundColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        margin: 1rem auto;
        max-width: 1200px;
        text-align: center;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        z-index: 1001;
    `;

  document.body.appendChild(messageElement);

  setTimeout(() => {
    messageElement.style.opacity = "1";
    messageElement.style.transform = "translateX(-50%) translateY(0)";
  }, 100);

  setTimeout(() => {
    messageElement.style.opacity = "0";
    messageElement.style.transform = "translateX(-50%) translateY(-20px)";
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 300);
  }, 3000);
}

// Fungsi untuk menampilkan hasil pencarian
function showSearchResults(filteredBooks, searchKeyword) {
  searchResultsContainer.style.display = "block";
  searchResultsTitle.textContent = `Hasil Pencarian "${searchKeyword}" (${filteredBooks.length} buku ditemukan)`;
  searchResultsList.innerHTML = "";
  if (filteredBooks.length === 0) {
    const noResults = document.createElement("div");
    noResults.className = "empty-state";
    noResults.innerHTML = `
      <p style="color: #718096; font-style: italic; text-align: center; padding: 2rem;">
        📚 Tidak ada buku yang ditemukan dengan kata kunci "${searchKeyword}"
      </p>
    `;
    searchResultsList.appendChild(noResults);
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "book-container";
  wrapper.style.marginTop = "1rem";

  filteredBooks.forEach((book) => {
    const bookElement = createBookElement(book);
    bookElement.style.borderLeft = "4px solid #4facfe";
    bookElement.style.backgroundColor = "#f0f9ff";
    wrapper.appendChild(bookElement);
  });

  searchResultsList.appendChild(wrapper);
}

function hideSearchResults() {
  searchResultsContainer.style.display = "none";
  searchResultsList.innerHTML = "";
}

function clearSearch() {
  searchBookTitle.value = "";
  hideSearchResults();
  renderBooks();
  showMessage("Hasil Pencarian Dikosongkan!", "info");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const editModal = document.getElementById("editModal");
    const deleteModal = document.getElementById("deleteModal");
    if (editModal) {
      editModal.remove();
    }
    if (deleteModal) {
      deleteModal.remove();
    }
  }
});

document.dispatchEvent(new CustomEvent("bookshelfAppReady"));
console.log("Bookshelf App berhasil dimuat!");
