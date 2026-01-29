import { useState } from "react";
import type { RegisterFormData, RegisterFormErrors } from "../types";
import { validateRegisterForm } from "../utils";
import { AuthForm } from "./AuthForm";

interface RegisterProps {
  onToggle: () => void;
}

const Register: React.FC<RegisterProps> = ({ onToggle }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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

    if (Object.values(validationErrors).some((error) => error)) {
      setErrors(validationErrors);
      return;
    }

    console.log("Register data:", formData);
    alert(
      `Registration successful!\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}`,
    );

    setFormData({ firstName: "", lastName: "", email: "", password: "" });
  };

  return (
    <div>
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>Create Account</h2>
        <p className='text-gray-600'>Sign up to get started</p>
      </div>

      <AuthForm
        type='register'
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          Already have an account?{" "}
          <button
            onClick={onToggle}
            className='text-blue-600 hover:text-blue-700 font-medium cursor-pointer'
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export { Register };
