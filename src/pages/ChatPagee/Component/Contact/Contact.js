import React from "react";
import "./contact.css";
import ChatContainer from "../ChatContainer/ChatContainer";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Contact({ contacts }) {
  const user = jwt_decode(localStorage.getItem("token"));
  const [currentChatUser, setcurrentChatUser] = useState({});

  const handleUser = (e) => {
    setcurrentChatUser(e);
  };

  return (
    <div className="mainContactContainer">
      <div>
        <div style={{ width: "20pc", padding: "10px" }}>
          <h4 style={{ color: "black", marginLeft: "33%", marginTop: "5%" }}>
            Contacts
          </h4>
        </div>

        <div className="usersDetailContainer">
          {contacts?.map((item) => (
            <div>
              {item?.objectId !== user._id ? (
                <div
                  className="userContainer"
                  onClick={(e) => handleUser(item)}
                >
                  <div style={{ marginLeft: "10px" }}>
                    <p
                      style={{
                        color: "black",
                        textAlign: "start",
                        marginTop: "5px",
                        fontSize: "15px",
                      }}
                    >
                      {item.name} {item.surname}
                    </p>
                    <p
                      style={{
                        color: "black",
                        textAlign: "start",
                        marginTop: "-16px",
                        fontSize: "14px",
                      }}
                    >
                      Open your message
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      <ChatContainer currentChatUser={currentChatUser} />
    </div>
  );
}
