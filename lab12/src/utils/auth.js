const AUTH_KEY = "authEmail";

export function getAuthEmail() {
  return localStorage.getItem(AUTH_KEY) || "";
}

export function setAuthEmail(email) {
  localStorage.setItem(AUTH_KEY, email);
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthed() {
  const email = getAuthEmail();
  return Boolean(email && email.includes("@"));
}
