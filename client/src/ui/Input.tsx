import { Description, Field, Input as HeadlessInput, Label } from "@headlessui/react";
import type {InputProps } from "@headlessui/react";
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
      {label ? <Label className='block text-sm font-semibold text-slate-600'>{label}</Label> : null}
      <HeadlessInput className='w-full px-4 py-3 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition'{...props} />
      {description ? <Description className='block text-sm font-semibold text-slate-400'>{description}</Description> : null}
      {error && <p className='text-sm text-danger-600'>{error}</p>}
    </Field>
  );
};

export { Input };
