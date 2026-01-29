interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text" | "slate" | "danger";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  variant = "primary",
  fullWidth = false,
}) => {
  const baseClasses =
    "py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition cursor-pointer";

  const variantClasses: Record<string, string> = {
    primary: "bg-purple-600 text-white hover:bg-purple-h",
    secondary: "bg-blue-600 text-white hover:bg-blue-h",
    text: "text-slate-400 hover:text-slate-600 hover:underline",
    slate: "bg-slate-600 text-white hover:bg-slate-h",
    danger: "bg-danger-600 text-white hover:bg-danger-h",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}
    >
      {children}
    </button>
  );
};

export { Button };
