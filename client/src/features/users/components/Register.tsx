import { useState } from "react";
import type { RegisterFormData, RegisterFormErrors } from "../types";
import { validateRegisterForm } from "../utils";
import { AuthForm } from "./AuthForm";
import { NavLink } from "react-router";
import { useRegister } from "../hooks/useRegister";
import { ErrorMessage } from "@/ui/ErrorMessage";
import { FormHeader } from "./FormHeader";

const initialFormData: RegisterFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const Register = () => {
  const {register, isRegistering, errorMessage} = useRegister();
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
  const [errors, setErrors] = useState<RegisterFormErrors>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof RegisterFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(formData);

    if (Object.values(validationErrors).some((error) => error.length > 0)) {
      setErrors(validationErrors);
      return;
    }

   
    register(formData)
    setFormData(initialFormData);
  };

  return (
    <div>
      <FormHeader heading='Create Account' text='Sign up to get started' />
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      <AuthForm
        type='register'
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isAuthenticating={isRegistering}
      />
      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          Already have an account?{" "}
          <NavLink
            to='../login'
            className='text-blue-600 hover:text-blue-700 font-medium cursor-pointer'
          >
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export { Register };
