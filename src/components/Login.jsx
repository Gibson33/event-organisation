import { Formik, Form, Field } from "formik";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/Auth.context.jsx";
import Logo from "../assets/logo.webp";
import { MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput } from "mdb-react-ui-kit";

export default function Login() {
  const { login, state } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Redirect after login
  useEffect(() => {
    if (state.isLoggedIn) {
      const lastVisited =
        localStorage.getItem("lastVisitedPath") || "/dashboard";
      navigate(lastVisited, { replace: true });
    }
  }, [state.isLoggedIn, navigate]);

  return (
    <div className="auth-page">
      <MDBRow className="auth-row">
        <MDBCol col="10" md="6" className="d-flex justify-content-center">
          <img src={Logo} className="img-fluid" alt="Login Logo" />
        </MDBCol>

        <MDBCol col="4" md="6" className="auth-form">
          <h1>Welcome Back!</h1>
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
              }

              return errors;
            }}
            onSubmit={(values) => {
              login(values.email, values.password);
            }}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, submitCount }) => (
              <Form>
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

                <MDBBtn type="submit" className="mb-1 w-100" size="lg">
                  SIGN IN
                </MDBBtn>

                {state.isLoginPending && <p>Logging in...</p>}

                {state.loginError && (
                  <p className="error-text mb-2">{state.loginError.message}</p>
                )}

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
    </div>
  );
}
