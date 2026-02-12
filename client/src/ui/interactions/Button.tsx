import { Button as HeadlessButton } from "@headlessui/react";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof HeadlessButton> & {
  variant?: "primary" | "secondary" | "text" | "slate" | "danger";
  isPending?: boolean;
  fullWidth?: boolean;
};

const Button = ({
  type = "button",
  variant = "primary",
  fullWidth = false,
  isPending = false,
  children,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "flex flex-row gap-2 items-center justify-center py-3 px-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition cursor-pointer";

  const variantClasses: Record<string, string> = {
    primary: "bg-purple-600 text-white hover:bg-purple-h",
    secondary: "bg-blue-600 text-white hover:bg-blue-h",
    text: "text-slate-400 hover:text-slate-600 hover:underline",
    slate: "bg-slate-600 text-white hover:bg-slate-h",
    danger: "bg-danger-600 text-white hover:bg-danger-h",
  };

  const widthClass = fullWidth ? "w-full" : "w-fit";

  return (
    <HeadlessButton
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}
      {...props}
    >
      {isPending ? <Spinner variant={variant} /> : children}
    </HeadlessButton>
  );
};

const Spinner = ({variant}: ButtonProps) => {
  return (
    <span aria-hidden className='flex inset-0 justify-center items-center'>
      <svg
        className='w-4 h-4 gray-0 animate-spin'
        viewBox='0 0 24 24'
        stroke={variant === "text" ? "#3A4374" : "#FFFFFF"}
      >
        <circle
          cx='12'
          cy='12'
          r='10'
          strokeWidth='4'
          fill='none'
          className='opacity-25'
        />
        <circle
          cx='12'
          cy='12'
          r='10'
          strokeWidth='4'
          strokeLinecap='round'
          fill='none'
          pathLength='100'
          strokeDasharray='60 140'
          strokeDashoffset='0'
        />
      </svg>
    </span>
  );
}

export { Button };
