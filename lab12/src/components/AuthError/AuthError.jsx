export default function AuthError({ message = "", onClose }) {
  if (!message) return null;

  return (
    <div className="auth-error" role="alert" aria-live="polite">
      <p className="auth-error__text">{message}</p>

      <button
        type="button"
        className="auth-error__close"
        aria-label="Close"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}
