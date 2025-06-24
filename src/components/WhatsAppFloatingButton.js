"use client";
import React, { useState } from "react";
import "./WhatsAppFloatingButton.css";

const contacts = [
  { name: "Support 1", number: "971501234567" },
  { name: "Support 2", number: "971502345678" },
  { name: "Sales", number: "971503456789" },
];

export default function WhatsAppFloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="position-fixed bottom-0 end-0 p-3 z-3">
      {/* WhatsApp Contact Card */}
      <div
        className={`card shadow mb-2 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ width: "100%", maxWidth: "280px" }}
      >
        <div className="card-header bg-success text-white py-2">
          <strong>Start a conversation</strong>
          <p className="mb-0 small">Click one of our members below on WhatsApp</p>
        </div>
        <div className="card-body d-flex flex-column gap-2">
          {contacts.map((contact, idx) => (
            <a
              key={idx}
              href={`https://wa.me/${contact.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-success d-flex align-items-center"
            >
              <i className="bi bi-whatsapp me-2"></i>
              <span>{contact.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Floating Button */}
      <button
        className="btn btn-success rounded-circle p-0 d-flex align-items-center justify-content-center whatsapp-toggle-btn"
        onClick={() => setOpen(prev => !prev)}
        aria-label="Toggle WhatsApp Contacts"
      >
        {/* Transitioned icons */}
        <i className={`bi bi-whatsapp icon-transition ${open ? "icon-hidden" : "icon-visible"}`}></i>
        <i className={`bi bi-x-lg icon-transition ${open ? "icon-visible" : "icon-hidden"}`}></i>
      </button>
    </div>
  );
}
