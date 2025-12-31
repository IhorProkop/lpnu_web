import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import PrimaryButton from "../components/Button/PrimaryButton";
import AuthError from "../components/AuthError/AuthError";
import { loginUser } from "../api/authApi";
import { isAuthed, setAuthEmail } from "../utils/auth";

import "../styles/Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState("");

  // якщо прийшли з ProtectedRoute — можна повернути туди
  const from = location.state?.from || "/";

  // Якщо вже залогінений — не пускати на /login
  useEffect(() => {
    if (isAuthed()) navigate("/", { replace: true });
  }, [navigate]);

  const schema = useMemo(() => {
    // мінімум 6, щоб не було пустого/дуже слабкого (mock)
    return Yup.object({
      email: Yup.string()
        .required("E-mail is a required field.")
        .email("E-mail is incorrect (example: name@gmail.com).")
        .max(60, "E-mail must be at most 60 characters."),

      password: Yup.string()
        .required("Password is a required field.")
        .min(6, "Password must be at least 6 characters.")
        .max(64, "Password must be at most 64 characters."),
    });
  }, []);

  async function onSubmit(values, actions) {
    setServerError("");
    actions.setSubmitting(true);

    try {
      const data = await loginUser({
        email: values.email,
        password: values.password,
      });

      setAuthEmail(data.email);

      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Login failed. Please try again.";
      setServerError(msg);
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <section className="page auth-page">
      <div className="auth-page__container">
        <div className="auth-card">
          <h1 className="auth-card__title">Submit the form to sign in</h1>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={schema}
            onSubmit={onSubmit}
            validateOnBlur={true}
            validateOnChange={false}
          >
            {({ errors, submitCount, isSubmitting }) => {
              const show = submitCount > 0;
              const invalid = (name) => show && Boolean(errors[name]);

              return (
                <Form className="auth-form" noValidate>
                  <label className="auth-field">
                    <Field
                      name="email"
                      type="email"
                      placeholder="E-mail"
                      className={
                        invalid("email")
                          ? "auth-field__input auth-field__input--invalid"
                          : "auth-field__input"
                      }
                    />
                  </label>

                  <label className="auth-field">
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className={
                        invalid("password")
                          ? "auth-field__input auth-field__input--invalid"
                          : "auth-field__input"
                      }
                    />
                  </label>

                  {show && Object.keys(errors).length > 0 && (
                    <div className="auth-errors" role="alert">
                      <ul className="auth-errors__list">
                        {Object.entries(errors).map(([k, v]) => (
                          <li key={k} className="auth-errors__item">
                            {String(v)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <AuthError
                    message={serverError}
                    onClose={() => setServerError("")}
                  />

                  <div className="auth-card__hint">
                    <span>Not a member?</span>{" "}
                    <Link className="auth-card__link" to="/register">
                      Sign up
                    </Link>
                  </div>

                  <PrimaryButton
                    type="submit"
                    text="LOGIN ME"
                    className="auth-btn"
                    disabled={isSubmitting}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </section>
  );
}
