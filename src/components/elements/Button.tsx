import React from "react";

interface ButtonProps {
  className?: string;
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

function Button({ text, onClick, className, type }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`${className} group relative me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none group-hover:from-cyan-500 group-hover:to-blue-500`}
    >
      <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0">
        {text}
      </span>
    </button>
  );
}

export default Button;
