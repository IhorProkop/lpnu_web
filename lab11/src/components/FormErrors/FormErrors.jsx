import { useEffect, useMemo, useState } from "react";
import { useFormikContext } from "formik";

const LABELS = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  phone: "Phone",
  address: "Address",
};

export default function FormErrors() {
  const { errors, submitCount } = useFormikContext();
  const [open, setOpen] = useState(false);

  const errorEntries = useMemo(() => Object.entries(errors || {}), [errors]);
  const hasErrors = errorEntries.length > 0;

  useEffect(() => {
    if (submitCount > 0 && hasErrors) setOpen(true);
    if (!hasErrors) setOpen(false);
  }, [submitCount, hasErrors]);

  if (!open || !hasErrors) return null;

  return (
    <div className="form-errors" role="alert" aria-live="polite">
      <div className="form-errors__row">
        <p className="form-errors__title">
          <strong>Oh snap!</strong> Change a few things up and try submitting
          again.
        </p>

        <button
          type="button"
          className="form-errors__close"
          aria-label="Close error message"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
      </div>

      <ul className="form-errors__list">
        {errorEntries.map(([field, message]) => (
          <li key={field} className="form-errors__item">
            <strong>{LABELS[field] || field}:</strong> {String(message)}
          </li>
        ))}
      </ul>
    </div>
  );
}
