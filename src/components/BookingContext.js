"use client";
import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [show, setShow] = useState(false);
  const [selectedSafari, setSelectedSafari] = useState(null);

  const open = (safari = null) => {
    setSelectedSafari(safari);
    setShow(true);
  };

  const close = () => {
    setShow(false);
    setSelectedSafari(null);
  };

  return (
    <BookingContext.Provider value={{ show, open, close, selectedSafari }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
