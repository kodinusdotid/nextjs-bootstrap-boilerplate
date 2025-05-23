"use client";

import { FaMoon, FaSun } from "react-icons/fa";
import { useDarkMode } from "@/components/context/darkMode";
import { forwardRef } from "react";

/**
 * A flexible button component that toggles dark mode on and off.
 * 
 * @param {Object} props - The component props.
 * @param {React.ElementType} [props.as="button"] - The element to render as. Can be a React component or a DOM element.
 * @param {boolean} [props.showIcon=true] - Whether to show the mode icon.
 * @param {boolean} [props.showLabel=true] - Whether to show the mode label.
 * @param {React.Ref} ref - Forwarded ref to the underlying element.
 * 
 * The button displays an icon and/or label indicating the current mode,
 * and switches between dark and light modes when clicked.
 * The aria-label dynamically updates to reflect the action it will perform.
 * 
 * Examples:
 * - <DarkModeToggle /> // Default button element
 * - <DarkModeToggle as="div" role="button" tabIndex={0} /> // Div with button behavior
 * - <DarkModeToggle as={Button} variant="outline" /> // React Bootstrap Button
 * - <DarkModeToggle as={StyledButton} /> // Emotion styled component
 */
export const DarkModeToggle = forwardRef<
  HTMLElement,
  {
    as?: React.ElementType;
    showIcon?: boolean;
    showLabel?: boolean;
    children?: React.ReactNode;
  } & Record<string, any>
>(({
  as: Component = "button",
  showIcon = true,
  showLabel = true,
  children,
  onClick,
  ...props
}, ref) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleClick = (event: React.MouseEvent) => {
    toggleDarkMode();
    onClick?.(event);
  };

  const defaultProps = Component === "button" ? { type: "button" } : {};

  return (
    <Component
      ref={ref}
      onClick={handleClick}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      {...defaultProps}
      {...props}
    >
      {children || (
        <>
          {showIcon && (
            <>
              {darkMode ? (
                <FaSun aria-hidden="true" />
              ) : (
                <FaMoon aria-hidden="true" />
              )}
            </>
          )}
          {showLabel && (
            <span style={{ marginLeft: showIcon ? '0.5rem' : '0' }}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </>
      )}
    </Component>
  );
});