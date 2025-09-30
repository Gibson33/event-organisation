import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import "./Help.css";

export default function Help() {
  const { state } = useContext(AuthContext);

  return (
    <div className="help-container">
      <div className="help-card">
        <h2>How to Use Evented</h2>
        <p>
          Welcome to <strong>Evented</strong> — your simple event organisation
          tool. Once you’ve created your account, here’s how to get started:
        </p>

        <ol className="help-steps">
          <li>
            After signing up and logging in, you’ll land on your{" "}
            <strong>Dashboard</strong>, where any events for the day will be
            shown.
          </li>
          <li>
            Click <strong>“Add Event”</strong> in the navigation bar to create a
            new event. Fill in the title, date, and time (description is
            optional), then save it.
          </li>
          <li>
            All your events are saved securely under your account, so they’ll be
            there the next time you log in.
          </li>
          <li>
            To remove an event, simply click the <strong>delete</strong> icon
            next to it on your dashboard.
          </li>
        </ol>

        <p className="help-footer">
          {state.isLoggedIn ? (
            <>
              Still have questions? Email{" "}
              <a href="mailto:gabriellabolognesiza@gmail.com">
                gabriellabolognesiza@gmail.com
              </a>
            </>
          ) : (
            <>Please sign up to get started with Evented.</>
          )}
        </p>
      </div>
    </div>
  );
}
