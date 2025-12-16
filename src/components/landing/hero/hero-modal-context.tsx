"use client";

import * as React from "react";

interface HeroModalContextValue {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const HeroModalContext = React.createContext<HeroModalContextValue | undefined>(
  undefined
);

export function HeroModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <HeroModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </HeroModalContext.Provider>
  );
}

export function useHeroModal() {
  const context = React.useContext(HeroModalContext);
  if (context === undefined) {
    throw new Error("useHeroModal must be used within HeroModalProvider");
  }
  return context;
}

