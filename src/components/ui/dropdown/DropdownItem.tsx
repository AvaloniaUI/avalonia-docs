import type React from "react";

interface DropdownItemProps {
  tag?: "a" | "button" | "div";
  href?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  tag = "button",
  href,
  onClick,
  className = "",
  children,
  target,
  rel,
}) => {
  const baseClassName = "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5 w-full text-left";
  const combinedClasses = `${baseClassName} ${className}`.trim();

  if (tag === "a" && href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  if (tag === "div") {
    return (
      <div onClick={onClick} className={`${combinedClasses} cursor-pointer`}>
        {children}
      </div>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};
