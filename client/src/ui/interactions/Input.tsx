import { Description, Field, Input as HeadlessInput, Label } from "@headlessui/react";
import type {InputProps } from "@headlessui/react";
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
  ...props
}: Props) => {
  return (
    <Field className='flex flex-col gap-1.5 mb-3'>
      {label ? (
        <Label>
          <Typography variant='h4'>{label}</Typography>
        </Label>
      ) : null}
      <HeadlessInput
        className='w-full px-4 py-3 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition'
        {...props}
      />
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
