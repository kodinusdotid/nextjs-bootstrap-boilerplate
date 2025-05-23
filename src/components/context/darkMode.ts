"use client";

import { createContext, useContext } from "react";

/**
 * Context untuk dark mode
 *
 * Berisi informasi tentang apakah dark mode diaktifkan atau tidak,
 * serta fungsi untuk mengubah status dark mode.
 */
export interface DarkModeContextType {
  /**
   * Status dark mode. Nilai true jika dark mode diaktifkan,
   * nilai false jika tidak.
   */
  darkMode: boolean;

  /**
   * Fungsi untuk mengubah status dark mode.
   *
   * Jika dark mode diaktifkan, maka fungsi ini akan
   * mengubahnya menjadi tidak diaktifkan, dan sebaliknya.
   */
  toggleDarkMode: () => void;
}

/**
 * Membuat context untuk dark mode
 */
export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

/**
 * Menggunakan dark mode context
 *
 * Mengembalikan objek yang berisi status dark mode dan
 * fungsi untuk mengubahnya.
 *
 * Jika digunakan di luar DarkModeProvider, maka akan
 * menghasilkan error.
 *
 * @throws {Error} Jika tidak digunakan di dalam DarkModeProvider
 */
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
