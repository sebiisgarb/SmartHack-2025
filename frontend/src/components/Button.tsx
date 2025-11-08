import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "success" | "purple";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  icon: Icon,
  variant = "primary",
  size = "medium",
  disabled = false,
}: ButtonProps) => {
  const baseStyles =
    "rounded-full font-bold shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-400 to-blue-400 hover:from-blue-500 hover:to-blue-500 text-white",
    secondary:
      "bg-gradient-to-r from-yellow-300 to-yellow-300 hover:from-yellow-400 hover:to-yellow-400 text-white",
    success:
      "bg-gradient-to-r from-green-400 to-green-400 hover:from-green-500 hover:to-green-500 text-white",
    purple:
      "bg-gradient-to-r from-purple-500 to-purple-500 hover:from-purple-600 hover:to-purple-600 text-white",
  };

  const sizeStyles = {
    small: "px-6 py-3 text-lg",
    medium: "px-8 py-4 text-xl",
    large: "px-10 py-6 text-2xl",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed hover:scale-100"
    : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles}`}
    >
      {Icon && <Icon className="w-6 h-6" />}
      {children}
    </button>
  );
};
