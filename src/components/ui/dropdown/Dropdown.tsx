import type React from "react";
import { useEffect, useRef } from "react";
import clsx from "clsx";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".dropdown-toggle")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        "absolute z-40 right-0 mt-2 rounded-2xl bg-white p-3 dark:bg-[#1E2635] border border-[#e4e7ec] dark:border-[#353C49] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] dark:shadow-[0px_12px_16px_-4px_rgba(0,0,0,0.3),0px_4px_6px_-2px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      {children}
    </div>
  );
};
