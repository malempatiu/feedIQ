import {
  Description,
  Field,
  Label,
  Textarea as HeadlessTextarea,
} from "@headlessui/react";
import type { TextareaProps } from "@headlessui/react";
import Typography from "@ui/Typography";

type Props = TextareaProps & {
  label?: string;
  error?: string;
  description?: string;
};

const Textarea = ({ label, error, description, ...props }: Props) => {
  return (
    <Field className='flex flex-col gap-1.5 mb-3'>
      {label ? (
        <Label>
          <Typography variant='h4'>{label}</Typography>
        </Label>
      ) : null}
      <HeadlessTextarea
        className='w-full px-4 py-3 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none'
        rows={4}
        {...props}
      />
      {description ? (
        <Description as='div'>
          <Typography variant='body2' className='text-slate-400'>
            {description}
          </Typography>
        </Description>
      ) : null}
      {error && (
        <Typography variant='body2' className='text-danger-600'>
          {error}
        </Typography>
      )}
    </Field>
  );
};

export { Textarea };
