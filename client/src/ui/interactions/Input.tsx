import { useState } from "react";
import { Description, Field, Input as HeadlessInput, Label } from "@headlessui/react";
import type {InputProps } from "@headlessui/react";
import { Eye, EyeOff } from "react-feather";
import Typography from "@ui/Typography";
type Props = InputProps & {
  label?: string;
  error?: string;
  description?: string;
};

const Input = ({
  label,
  error,
  description,
  type,
  ...props
}: Props) => {
  const isPassword = type === "password";
  const [visible, setVisible] = useState(false);

  return (
    <Field className='flex flex-col gap-1.5 mb-3'>
      {label ? (
        <Label>
          <Typography variant='h4'>{label}</Typography>
        </Label>
      ) : null}
      <div className="relative">
        <HeadlessInput
          className={`w-full px-4 py-3 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${isPassword ? "pr-12" : ""}`}
          type={isPassword && visible ? "text" : type}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary-600 transition cursor-pointer"
          >
            {visible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {description ? (
        <Description as="div">
          <Typography variant="body2" className="text-slate-400">{description}</Typography>
        </Description>
      ) : null}
      {error && <Typography variant="body2" className='text-danger-600'>{error}</Typography>}
    </Field>
  );
};

export { Input };
