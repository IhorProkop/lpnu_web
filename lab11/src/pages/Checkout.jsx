import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import PrimaryButton from "../components/Button/PrimaryButton";
import FormErrors from "../components/FormErrors/FormErrors";
import { clearCart } from "../store/cartActions";

import "../styles/Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  if (!items || items.length === 0) {
    return (
      <section className="page checkout-page">
        <div className="checkout-page__container">
          <h1 className="checkout-page__title">Checkout</h1>
          <p className="checkout-page__empty">
            Your cart is empty. Please add products before checkout.
          </p>
          <PrimaryButton
            text="Go to Catalog"
            onClick={() => navigate("/catalog")}
          />
        </div>
      </section>
    );
  }

  const validationSchema = useMemo(() => {
    const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄє' -]+$/;
    const addressRegex = /^[A-Za-zА-Яа-яІіЇїЄє0-9\s.,'#-]+$/;

    return Yup.object({
      firstName: Yup.string()
        .required("First name is a required field.")
        .min(2, "First name must be at least 2 characters.")
        .max(30, "First name must be at most 30 characters.")
        .matches(
          nameRegex,
          "First name must contain only letters (no special characters)."
        ),

      lastName: Yup.string()
        .required("Last name is a required field.")
        .min(2, "Last name must be at least 2 characters.")
        .max(30, "Last name must be at most 30 characters.")
        .matches(
          nameRegex,
          "Last name must contain only letters (no special characters)."
        ),

      email: Yup.string()
        .required("Email is a required field.")
        .email("Email is incorrect (example: name@gmail.com).")
        .max(60, "Email must be at most 60 characters."),

      phone: Yup.number()
        .typeError("Phone must contain only numbers.")
        .integer("Phone must be an integer number (no dots/commas).")
        .positive("Phone must be a positive number.")
        .required("Phone is a required field.")
        .test("len", "Phone must be between 9 and 15 digits.", (val) => {
          if (val === undefined || val === null) return false;
          const digits = String(val);
          return digits.length >= 9 && digits.length <= 15;
        }),

      address: Yup.string()
        .required("Address is a required field.")
        .min(5, "Address must be at least 5 characters.")
        .max(80, "Address must be at most 80 characters.")
        .matches(addressRegex, "Address contains unsupported characters."),
    });
  }, []);

  async function handleSubmit(values, actions) {

    actions.setSubmitting(true);

    dispatch(clearCart());

    actions.setSubmitting(false);
    navigate("/success", { replace: true });
  }

  return (
    <section className="page checkout-page">
      <div className="checkout-page__container">
        <h1 className="checkout-page__title">Checkout</h1>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={true}
          validateOnChange={false}
        >
          {({ errors, submitCount, isSubmitting, setFieldValue, values }) => {
            const showErrors = submitCount > 0;

            const cn = (base, fieldName) => {
              const invalid = showErrors && Boolean(errors[fieldName]);
              return invalid ? `${base} ${base}--invalid` : base;
            };

            return (
              <Form className="checkout-form" noValidate>
                <div className="checkout-form__grid">
                  <label className="checkout-field">
                    <span className="checkout-field__label">First Name</span>
                    <Field
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      className={cn("checkout-field__control", "firstName")}
                    />
                  </label>

                  <label className="checkout-field">
                    <span className="checkout-field__label">Last Name</span>
                    <Field
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      className={cn("checkout-field__control", "lastName")}
                    />
                  </label>

                  <label className="checkout-field">
                    <span className="checkout-field__label">Email</span>
                    <Field
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={cn("checkout-field__control", "email")}
                    />
                  </label>

                  <label className="checkout-field">
                    <span className="checkout-field__label">Phone</span>
                    <input
                      name="phone"
                      type="number"
                      inputMode="numeric"
                      className={cn("checkout-field__control", "phone")}
                      value={values.phone}
                      onChange={(e) => {
                        const n = e.target.valueAsNumber;
                        setFieldValue("phone", Number.isNaN(n) ? "" : n);
                      }}
                    />
                  </label>

                  <label className="checkout-field checkout-field--span-2">
                    <span className="checkout-field__label">Address</span>
                    <Field
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      className={cn("checkout-field__control", "address")}
                    />
                  </label>
                </div>

                <FormErrors />

                <div className="checkout-page__actions">
                  <PrimaryButton
                    text="Go Back"
                    type="button"
                    className="btn--outline"
                    onClick={() => navigate("/cart")}
                  />

                  <PrimaryButton
                    text="Continue"
                    type="submit"
                    className="btn--primary"
                    disabled={isSubmitting}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
}
