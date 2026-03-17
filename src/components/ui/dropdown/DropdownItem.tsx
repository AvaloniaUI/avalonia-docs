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
  const baseClassName = "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-[570] tracking-[0.02em] text-[#161C2D] hover:bg-[#F3F1F0] hover:text-[#05051E] dark:text-[#F3F1F0] dark:hover:bg-white/[0.06] dark:hover:text-[#F3F1F0] w-full text-left transition-colors duration-150 ease-out";
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
