import { Link } from "react-router-dom";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";

import React from "react";

function SettingsPage() {
  return (
    <div>
      <NavigationBar />

      <div className="sp-container">
        <form className="sp-center">
          <div>
            <h1 className="sp-h1">Settings</h1>
          </div>
          <div className="sp-btn-group">
            <Link className="sp-link" to="/reset-password-page">
              <button className="sp-button">Change Password</button>
            </Link>
            <Link className="sp-link" to="/reset-mail-page">
              <button className="sp-button">Change E-Mail</button>
            </Link>
          </div>
          <div className="sp-center">
            <label class="container" className="sp-label">
              Disable Notifications
              <input type="checkbox" className="sp-checkbox" />
              <span class="checkmark"></span>
            </label>
          </div>
          <div className="sp-center">
            <label class="container" className="sp-label">
              Send E-Mail for Notifications
              <input
                type="checkbox"
                defaultChecked="true"
                className="sp-checkbox"
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;
