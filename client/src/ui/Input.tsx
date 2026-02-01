interface InputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "number";
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const Input: React.FC<Partial<InputProps>> = ({
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div>
      <label htmlFor={id} className='block text-sm font-semibold text-slate-600 mb-2'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className='w-full px-4 py-3 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition'
        placeholder={placeholder}
      />
      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  );
};

export { Input };
