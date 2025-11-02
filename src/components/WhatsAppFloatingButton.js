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
    <div
      className="position-fixed z-3"
      style={{
        bottom: "80px", // Small bottom gap
        right: "20px",  // Small right gap
      }}
    >
      {/* Contact Card */}
      <div
        className={`card shadow position-absolute transition-opacity ${
          open
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
        style={{
          width: "280px",
          bottom: "70px", // Push card above the button
          right: "0",
          zIndex: 1040,
          transition: "all 0.3s ease",
        }}
      >
        <div className="card-header bg-success text-white py-2">
          <strong>Start a conversation</strong>
          <p className="mb-0 small">
            Click one of our members below on WhatsApp
          </p>
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

      {/* Toggle Button */}
      <button
        className="btn btn-success rounded-circle p-0 d-flex align-items-center justify-content-center whatsapp-toggle-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle WhatsApp Contacts"
        style={{
          width: "56px",
          height: "56px",
          zIndex: 1050,
        }}
      >
        <i
          className={`bi bi-whatsapp icon-transition ${
            open ? "icon-hidden" : "icon-visible"
          }`}
        ></i>
        <i
          className={`bi bi-x-lg icon-transition ${
            open ? "icon-visible" : "icon-hidden"
          }`}
        ></i>
      </button>
    </div>
  );
}
