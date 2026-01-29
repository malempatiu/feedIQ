import { useState } from "react";
import type { LoginFormData, LoginFormErrors } from "../types";
import { AuthForm } from "./AuthForm";
import { validateLoginForm } from "../utils";

interface LoginProps {
  onToggle: () => void;
}

const Login: React.FC<LoginProps> = ({ onToggle }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({
    email: "",
    password: "",
  });

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

    console.log("Login data:", formData);
    alert(`Login successful!\nEmail: ${formData.email}`);

    setFormData({ email: "", password: "" });
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
      />

      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          Don't have an account?{" "}
          <button
            onClick={onToggle}
            className='text-blue-600 hover:text-blue-700 font-medium cursor-pointer'
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export { Login };
