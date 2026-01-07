function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} hari yang lalu`;
  }
  if (diffHours > 0) {
    return `${diffHours} jam yang lalu`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} menit yang lalu`;
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} detik yang lalu`;
  }
  return "baru saja";
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
}

function getTheme() {
  return localStorage.getItem("theme") || "dark";
}

function setTheme(theme) {
  localStorage.setItem("theme", theme);
}

export { postedAt, truncateText, getTheme, setTheme };
