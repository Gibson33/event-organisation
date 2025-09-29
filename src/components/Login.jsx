import { Formik, Form, Field } from "formik";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context.jsx";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

export default function Login() {
  const { login, state } = useContext(AuthContext);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow className="auth-row">
        {/* Illustration */}
        <MDBCol col="10" md="6" className="d-flex justify-content-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone illustration"
          />
        </MDBCol>

        {/* Form */}
        <MDBCol col="4" md="4">
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email is required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.password) {
                errors.password = "Password is required";
              } else if (values.password.length < 8) {
                errors.password = "Password must be at least 8 characters";
              }

              return errors;
            }}
            onSubmit={(values) => {
              login(values.email, values.password, rememberMe);
              setTimeout(() => {
                if (state.isLoggedIn) {
                  navigate("/dashboard");
                }
              }, 600);
            }}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, submitCount }) => (
              <Form>
                {/* Email */}
                <Field name="email">
                  {({ field }) => (
                    <>
                      <MDBInput
                        {...field}
                        wrapperClass={`mb-4 ${
                          submitCount > 0 && errors.email ? "error-border" : ""
                        }`}
                        label="Email address"
                        type="email"
                        size="lg"
                      />
                      {submitCount > 0 && errors.email && (
                        <div className="error-text">{errors.email}</div>
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
                        wrapperClass={`mb-4 ${
                          submitCount > 0 && errors.password
                            ? "error-border"
                            : ""
                        }`}
                        label="Password"
                        type="password"
                        size="lg"
                      />
                      {submitCount > 0 && errors.password && (
                        <div className="error-text">{errors.password}</div>
                      )}
                    </>
                  )}
                </Field>

                {/* Remember Me + Forgot */}
                <div className="d-flex justify-content-between mx-4 mb-4">
                  <MDBCheckbox
                    id="rememberMe"
                    name="rememberMe"
                    label="Remember me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <a href="!#">Forgot password?</a>
                </div>

                {/* Submit */}
                <MDBBtn type="submit" className="mb-1 w-100" size="lg">
                  SIGN IN
                </MDBBtn>

                {state.isLoginPending && <p>Logging in...</p>}
                {state.loginError && (
                  <p className="error-text">{state.loginError.message}</p>
                )}

                {/* Divider */}
                <div className="divider d-flex align-items-center my-3">
                  <p className="text-center fw-bold mx-3 mb-0">OR</p>
                </div>

                <Link to="/signup">
                  <MDBBtn
                    type="button"
                    className="mb-4 w-100"
                    size="lg"
                    style={{ backgroundColor: "#3b5998" }}
                  >
                    <MDBIcon className="mx-2" />
                    SIGN UP
                  </MDBBtn>
                </Link>
              </Form>
            )}
          </Formik>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
