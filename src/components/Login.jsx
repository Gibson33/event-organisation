import { Formik, Form, Field, ErrorMessage } from "formik";

export default function Login() {
  return (
    <div className="auth-box">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log("Login attempt:", values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="login-form">
            <h2 className="auth-title">Login</h2>

            {/* Email */}
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="error-text" />

            {/* Password */}
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage
              name="password"
              component="div"
              className="error-text"
            />

            <button type="submit" className="btn-submit">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
