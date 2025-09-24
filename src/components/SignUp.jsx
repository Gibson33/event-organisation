import { Formik, Form, Field } from "formik";
import "./Login.css";
import { Link } from "react-router-dom";
import { ContextProvider } from "../context/Auth.context.jsx";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

export default function Signup() {
  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        {/* illustration */}
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone illustration"
          />
        </MDBCol>

        {/* form */}
        <MDBCol col="4" md="6">
          <h1>WELCOME TO EVENTED!</h1>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.username) errors.username = "Username is required";

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

              if (!values.confirmPassword) {
                errors.confirmPassword = "Confirm your password";
              } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = "Passwords must match";
              }

              return errors;
            }}
            onSubmit={(values) => {
              console.log("Signup attempt:", values);
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
                        wrapperClass={`mb-4 ${
                          submitCount > 0 && errors.username
                            ? "error-border"
                            : ""
                        }`}
                        label="Username"
                        type="text"
                        size="lg"
                      />
                      {submitCount > 0 && errors.username && (
                        <div className="error-text">{errors.username}</div>
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

                {/* Confirm Password */}
                <Field name="confirmPassword">
                  {({ field }) => (
                    <>
                      <MDBInput
                        {...field}
                        wrapperClass={`mb-4 ${
                          submitCount > 0 && errors.confirmPassword
                            ? "error-border"
                            : ""
                        }`}
                        label="Confirm Password"
                        type="password"
                        size="lg"
                      />
                      {submitCount > 0 && errors.confirmPassword && (
                        <div className="error-text">
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

                {/* Divider */}
                <div className="divider d-flex align-items-center my-3">
                  <p className="text-center fw-bold mx-3 mb-0">OR</p>
                </div>

                {/* Go to login */}
                <Link to="/login">
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
    </MDBContainer>
  );
}
