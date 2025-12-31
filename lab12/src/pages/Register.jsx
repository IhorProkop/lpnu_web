import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import PrimaryButton from "../components/Button/PrimaryButton";
import AuthError from "../components/AuthError/AuthError";
import { registerUser } from "../api/authApi";
import { isAuthed, setAuthEmail } from "../utils/auth";

import "../styles/Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  // Якщо вже залогінений — не пускати на /register
  useEffect(() => {
    if (isAuthed()) navigate("/", { replace: true });
  }, [navigate]);

  const schema = useMemo(() => {
    const usernameRegex = /^[A-Za-z0-9_]+$/;
    // Мінімум 8 символів, хоча б 1 велика, 1 мала, 1 цифра
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    return Yup.object({
      username: Yup.string()
        .required("Username is a required field.")
        .min(3, "Username must be at least 3 characters.")
        .max(20, "Username must be at most 20 characters.")
        .matches(
          usernameRegex,
          "Username must contain only letters, numbers, underscore."
        ),

      email: Yup.string()
        .required("E-mail is a required field.")
        .email("E-mail is incorrect (example: name@gmail.com).")
        .max(60, "E-mail must be at most 60 characters."),

      password: Yup.string()
        .required("Password is a required field.")
        .matches(
          passwordRegex,
          "Password must be 8+ chars and include uppercase, lowercase and a number."
        )
        .max(64, "Password must be at most 64 characters."),

      confirmPassword: Yup.string()
        .required("Retype password is a required field.")
        .oneOf([Yup.ref("password")], "Passwords do not match."),
    });
  }, []);

  async function onSubmit(values, actions) {
    setServerError("");
    actions.setSubmitting(true);

    try {
      const data = await registerUser({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      // store creds (email) in LocalStorage
      setAuthEmail(data.email);

      navigate("/", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Registration failed. Please try again.";
      setServerError(msg);
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <section className="page auth-page">
      <div className="auth-page__container">
        <div className="auth-card">
          <h1 className="auth-card__title">Register the new account</h1>

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
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
                      name="username"
                      type="text"
                      placeholder="Username"
                      className={
                        invalid("username")
                          ? "auth-field__input auth-field__input--invalid"
                          : "auth-field__input"
                      }
                    />
                  </label>

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

                  <label className="auth-field">
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="Retype password"
                      className={
                        invalid("confirmPassword")
                          ? "auth-field__input auth-field__input--invalid"
                          : "auth-field__input"
                      }
                    />
                  </label>

                  {/* Пояснюємо всі помилки чітко (вимога) */}
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
                    <span>Already a member?</span>{" "}
                    <Link className="auth-card__link" to="/login">
                      Sign in
                    </Link>
                  </div>

                  <PrimaryButton
                    type="submit"
                    text="SIGN ME UP"
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
