import { Link } from "react-router-dom";
import classes from "./NavigationBar.module.css";
import img from "./logo.png";
import { NotificationManager } from "react-notifications";
import axios from "axios";

function NavigationBar() {
  async function fetchNotifications() {
    let unreadNotifications = 0;

    const res = await axios.get(`http://localhost:8080/notifications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const notifications = res.data;

    for (let i = 0; i < notifications.length && !notifications[i].read; i++) {
      NotificationManager.info(notifications[i].text, "Notification", 5000);
      unreadNotifications++;
    }

    if (notifications.length == 0 || unreadNotifications) {
      NotificationManager.info(
        "You have no unread notifications.",
        "Info",
        5000
      );
    }
  }

  return (
    <div className={classes["nb-header"]}>
      <Link to="/main-page">
        <div style={{ width: 120, height: 40 }}>
          <img
            alt=""
            src={img}
            style={{ marginLeft: 10, maxWidth: "100%", height: "auto" }}
          />
        </div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/main-page">Home</Link>
          </li>
          <li>
            <Link to="/profile-own">Profile</Link>
          </li>
          <li>
            <Link to="/chat">DM</Link>
          </li>
          <li>
            <Link onClick={fetchNotifications}>Notifications</Link>
          </li>
          <li>
            <Link to="/settings-page">Settings</Link>
          </li>
          <li
            className={classes["nb-logout"]}
            onClick={() => {
              localStorage.clear();
            }}
          >
            <Link to="/login">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavigationBar;
