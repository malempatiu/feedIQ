import { Input } from "@ui/Input";
import type { LoginFormData, LoginFormErrors, PasswordResetFormData, PasswordResetFormErrors, RegisterFormData, RegisterFormErrors } from "../types";
import { Button } from "@ui/Button";
import { NavLink } from "react-router";
import { AnimatedDots } from "@ui/AnimatedDots";



type AuthFormProps = {
  type: "login" | "register" | "password-reset";
  formData: LoginFormData | RegisterFormData | PasswordResetFormData;
  errors: LoginFormErrors | RegisterFormErrors | PasswordResetFormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isAuthenticating: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  formData,
  errors,
  isAuthenticating,
  onChange,
  onSubmit,
}) => {
  const isLogin = type === "login";
  const isPasswordReset = type === "password-reset";

  return (
    <form onSubmit={onSubmit} className='space-y-6'>
      {!isLogin &&
        !isPasswordReset &&
        "firstName" in formData &&
        "lastName" in formData ? (
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
        ) : null}

      {"email" in formData ? (
        <Input
          id={`${type}-email`}
          label='Email Address'
          type='email'
          name='email'
          value={formData.email}
          onChange={onChange}
          placeholder='you@example.com'
          error={(errors as LoginFormErrors).email}
        />
      ) : null}

      <Input
        id={`${type}-password`}
        label={isPasswordReset ? "New password" : "Password"}
        type='password'
        name={isPasswordReset ? "newPassword" : "password"}
        value={
          isPasswordReset
            ? (formData as PasswordResetFormData).newPassword
            : (formData as LoginFormData).password
        }
        onChange={onChange}
        placeholder='••••••••'
        error={
          isPasswordReset
            ? (errors as PasswordResetFormErrors).newPassword
            : (errors as LoginFormErrors).password
        }
      />

      {isPasswordReset ? (
        <Input
          id={`${type}-password`}
          label='Re-enter password'
          type='password'
          name='repeatedNewPassword'
          value={(formData as PasswordResetFormData).repeatedNewPassword}
          onChange={onChange}
          placeholder='••••••••'
          error={(errors as PasswordResetFormErrors).repeatedNewPassword}
        />
      ) : null}

      {isLogin && (
        <div className='flex flex-row items-center justify-end'>
          <NavLink
            to='../password-reset'
            className='text-sm text-blue-600 hover:text-blue-700'
          >
            Forgot password?
          </NavLink>
        </div>
      )}

      <Button type='submit' variant='secondary' fullWidth disabled={isAuthenticating}>
        {isAuthenticating ? (
          <AnimatedDots color="bg-gray-0" />
        ) : 
        isLogin ? "Sign In" : isPasswordReset ? "Reset Password" : "Create Account"}
      </Button>
    </form>
  );
};

export {AuthForm}
