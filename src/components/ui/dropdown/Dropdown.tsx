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
        "absolute z-40 right-0 mt-2 rounded-2xl bg-white py-[0.625rem] px-[0.375rem] dark:bg-[#18181b] border-none shadow-[0px_20px_60px_-12px_rgba(0,0,0,0.15),0px_0px_0px_1px_rgba(0,0,0,0.04)] dark:shadow-[0px_20px_60px_-12px_rgba(0,0,0,0.4),0px_0px_0px_1px_rgba(255,255,255,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
};
