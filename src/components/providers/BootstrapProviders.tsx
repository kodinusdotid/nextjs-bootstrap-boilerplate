"use client";

import { useEffect } from "react";
import '@/assets/scss/app.scss';

interface BootstrapProvidersProps {
  children: React.ReactNode;
}

/**
 * Provides Bootstrap components to children components.
 *
 * This component is responsible for initializing Bootstrap components (e.g.
 * tooltips, popovers) on the client-side. It uses the `useEffect` hook to
 * initialize the components when the component is mounted, and to dispose of
 * them when the component is unmounted.
 *
 * @example
 * import BootstrapProviders from "@/components/providers/BootstrapProviders";
 *
 * const App = () => (
 *   <BootstrapProviders>
 *     <MyComponent />
 *   </BootstrapProviders>
 * );
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to render
 */
export default function BootstrapProviders({ children }: BootstrapProvidersProps) {
  let tooltipInstances: Array<any> = [];
  let popoverInstances: Array<any> = [];

  const initializeBootstrapComponents = async () => {
    try {
      const { Tooltip, Popover } = await import("bootstrap");

      tooltipInstances = Array.from(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      ).map((el) => new Tooltip(el));

      popoverInstances = Array.from(
        document.querySelectorAll('[data-bs-toggle="popover"]')
      ).map((el) => new Popover(el));
    } catch (error) {
      console.error("Bootstrap initialization failed:", error);
    }
  };

  useEffect(() => {
    initializeBootstrapComponents();

    return () => {
      tooltipInstances.forEach((instance) => instance.dispose());
      popoverInstances.forEach((instance) => instance.dispose());
    };
  }, []);

  return <>{children}</>;
}

