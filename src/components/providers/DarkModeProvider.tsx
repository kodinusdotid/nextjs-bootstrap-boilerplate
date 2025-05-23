"use client";

import { useEffect, useState } from "react";
import { DarkModeContext, DarkModeContextType } from "@/components/context/darkMode";

/**
 * Mendapatkan nilai awal dark mode berdasarkan preferensi pengguna,
 * berupa nilai boolean yang true jika dark mode diaktifkan.
 * Nilai awal dark mode diambil dari local storage dengan key 'darkMode'.
 * Jika tidak ada nilai di local storage, maka nilai awal dark mode
 * diambil dari preferensi sistem pengguna dengan media query
 * '(prefers-color-scheme: dark)'. Jika tidak ada preferensi sistem
 * pengguna, maka nilai awal dark mode adalah false.
 */
const getInitialDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;

  const stored = localStorage.getItem('darkMode');
  if (stored !== null) {
    return stored === 'true';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Komponen yang menyediakan konteks dark mode
 * 
 * @param {Object} props - Properti komponen
 * @param {ReactNode} props.children - Anak komponen
 * 
 * Komponen ini menyediakan konteks dark mode yang dapat digunakan oleh
 * komponen-komponen lainnya. Komponen ini juga akan mengubah tema
 * berdasarkan preferensi sistem dan nilai yang disimpan di localStorage.
 * 
 * Komponen ini juga akan mengubah tema bootstrap dan background warna body
 * menjadi gelap atau terang ketika pengguna mengubah preferensi tema
 * sistem.
 */
export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const initialDarkMode = getInitialDarkMode();
    setDarkMode(initialDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', String(newDarkMode));
    }
  };

  useEffect(() => {
    if (!isClient) return;

    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    if (darkMode) {
      htmlElement.setAttribute('data-bs-theme', 'dark');
      bodyElement.classList.add('bg-dark', 'text-light');

      htmlElement.classList.add('dark');
    } else {
      htmlElement.setAttribute('data-bs-theme', 'light');
      bodyElement.classList.remove('bg-dark', 'text-light');

      htmlElement.classList.remove('dark');
    }
  }, [darkMode, isClient]);

  useEffect(() => {
    if (!isClient) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('darkMode');
      if (stored === null) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [isClient]);

  const contextValue: DarkModeContextType = {
    darkMode,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
}