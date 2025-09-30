import { Formik, Form, Field } from "formik";
import "./Login.css";
import Logo from "../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.context.jsx";
import { MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput } from "mdb-react-ui-kit";

export default function Signup() {
  const { signup, state, clearErrors } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <MDBRow className="auth-row">
        {/* Illustration */}
        <MDBCol col="10" md="6" className="d-flex justify-content-center">
          <img src={Logo} className="img-fluid" alt="Signup Logo" />
        </MDBCol>

        {/* Form */}
        <MDBCol col="4" md="6" className="auth-form">
          <h1>Create Account</h1>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors = {};

              // ✅ Username
              if (!values.username) errors.username = "Username is required";

              // ✅ Email
              if (!values.email) {
                errors.email = "Email is required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              // ✅ Password: 8+ chars, 1 number, 1 special character
              const passwordRegex =
                /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

              if (!values.password) {
                errors.password = "Password is required";
              } else if (!passwordRegex.test(values.password)) {
                errors.password =
                  "Password must be at least 8 characters and include a number and special character";
              }

              // ✅ Confirm Password
              if (!values.confirmPassword) {
                errors.confirmPassword = "Confirm your password";
              } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = "Passwords must match";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              const success = signup(
                values.email,
                values.password,
                values.username
              );
              setSubmitting(false);
              if (success) navigate("/login");
            }}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, submitCount }) => (
              <Form>
                {/* Username */}
                <Field name="username">
                  {({ field }) => (
                    <>
                      <MDBInput
                        {...field}
                        wrapperClass="mb-2"
                        label="Username"
                        type="text"
                        size="lg"
                      />
                      {submitCount > 0 && errors.username && (
                        <div className="error-text mb-2">{errors.username}</div>
                      )}
                    </>
                  )}
                </Field>

                {/* Email */}
                <Field name="email">
                  {({ field }) => (
                    <>
                      <MDBInput
                        {...field}
                        wrapperClass="mb-2"
                        label="Email address"
                        type="email"
                        size="lg"
                      />
                      {submitCount > 0 && errors.email && (
                        <div className="error-text mb-2">{errors.email}</div>
                      )}
                    </>
                  )}
                </Field>

                {/* Password */}
                <Field name="password">
                  {({ field }) => (
                    <>
                      <MDBInput
                        {...field}
                        wrapperClass="mb-2"
                        label="Password"
                        type="password"
                        size="lg"
                      />
                      {submitCount > 0 && errors.password && (
                        <div className="error-text mb-2">{errors.password}</div>
                      )}
                    </>
                  )}
                </Field>

                {/* Confirm Password */}
                <Field name="confirmPassword">
                  {({ field }) => (
                    <>
                      <MDBInput
                        {...field}
                        wrapperClass="mb-2"
                        label="Confirm Password"
                        type="password"
                        size="lg"
                      />
                      {submitCount > 0 && errors.confirmPassword && (
                        <div className="error-text mb-2">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </>
                  )}
                </Field>

                {/* Submit */}
                <MDBBtn type="submit" className="mb-1 w-100" size="lg">
                  SIGN UP
                </MDBBtn>

                {/* Inline error for existing email */}
                {state.signupError && (
                  <p className="error-text mb-2">{state.signupError.message}</p>
                )}

                <div className="divider d-flex align-items-center my-3">
                  <p className="text-center fw-bold mx-3 mb-0">OR</p>
                </div>

                {/* Switch to Login */}
                <Link to="/login" onClick={clearErrors}>
                  <MDBBtn
                    type="button"
                    className="mb-4 w-100"
                    size="lg"
                    style={{ backgroundColor: "#3b5998" }}
                  >
                    <MDBIcon className="mx-2" />
                    SIGN IN
                  </MDBBtn>
                </Link>
              </Form>
            )}
          </Formik>
        </MDBCol>
      </MDBRow>
    </div>
  );
}
