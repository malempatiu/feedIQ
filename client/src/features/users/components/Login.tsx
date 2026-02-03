import { useState } from "react";
import type { LoginFormData, LoginFormErrors } from "../types";
import { AuthForm } from "./AuthForm";
import { validateLoginForm } from "../utils";
import { NavLink } from "react-router";
import { useLogin } from "../hooks/useLogin";

const initialFormData: LoginFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const {login, isLoggingIn} = useLogin();
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [errors, setErrors] = useState<LoginFormErrors>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof LoginFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formData);

    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      return;
    }

    login(formData);
    setFormData(initialFormData);
  };

  return (
    <div>
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>Welcome Back</h2>
        <p className='text-gray-600'>Sign in to continue to your account</p>
      </div>

      <AuthForm
        type='login'
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isAuthenticating={isLoggingIn}
      />

      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          Don't have an account?{" "}
          <NavLink
            to='../register'
            className='text-blue-600 hover:text-blue-700 font-medium cursor-pointer'
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export { Login };
