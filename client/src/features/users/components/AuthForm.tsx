import { Input } from "@ui/Input";
import type { LoginFormData, LoginFormErrors, RegisterFormData, RegisterFormErrors } from "../types";
import { Button } from "@ui/Button";



type AuthFormProps = {
  type: "login" | "register";
  formData: LoginFormData | RegisterFormData;
  errors: LoginFormErrors | RegisterFormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isAuthenticating: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  formData,
  errors,
  onChange,
  onSubmit,
  isAuthenticating
}) => {
  const isLogin = type === "login";

  return (
    <form onSubmit={onSubmit} className='space-y-6'>
      {!isLogin && "firstName" in formData && "lastName" in formData && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input
            id='firstName'
            label='First Name'
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={onChange}
            placeholder='John'
            error={"firstName" in errors ? errors.firstName : ""}
          />
          <Input
            id='lastName'
            label='Last Name'
            type='text'
            name='lastName'
            value={formData.lastName}
            onChange={onChange}
            placeholder='Doe'
            error={"lastName" in errors ? errors.lastName : ""}
          />
        </div>
      )}

      <Input
        id={`${type}-email`}
        label='Email Address'
        type='email'
        name='email'
        value={formData.email}
        onChange={onChange}
        placeholder='you@example.com'
        error={errors.email}
      />

      <Input
        id={`${type}-password`}
        label='Password'
        type='password'
        name='password'
        value={formData.password}
        onChange={onChange}
        placeholder='••••••••'
        error={errors.password}
      />

      {/* {isLogin && (
        <div className='flex items-center justify-between'>
          <label className='flex items-center'>
            <input
              type='checkbox'
              className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
            />
            <span className='ml-2 text-sm text-gray-600'>Remember me</span>
          </label>
          <a href='#' className='text-sm text-blue-600 hover:text-blue-700'>
            Forgot password?
          </a>
        </div>
      )} */}

      <Button type='submit' variant='secondary' fullWidth disabled={isAuthenticating}>
        { isAuthenticating ? <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg> : null}
        {isLogin ? "Sign In" : "Create Account"}
      </Button>
    </form>
  );
};

export {AuthForm}
