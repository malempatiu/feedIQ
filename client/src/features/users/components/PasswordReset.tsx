import { useState } from "react";
import type { PasswordResetFormData, PasswordResetFormErrors } from "../types";
import { AuthForm } from "./AuthForm";
import { validatePasswordResetForm } from "../utils";
import { usePasswordReset } from "../hooks/usePasswordReset";
import { ErrorMessage } from "@/ui/ErrorMessage";
import { FormHeader } from "./FormHeader";

const initialFormData: PasswordResetFormData = {
  email: "",
  newPassword: "",
  repeatedNewPassword: "",
};

const PasswordReset = () => {
  const {resetPassword, isResetting, errorMessage} = usePasswordReset();
  const [formData, setFormData] = useState<PasswordResetFormData>(initialFormData);
  const [errors, setErrors] = useState<PasswordResetFormErrors>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof PasswordResetFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validatePasswordResetForm(formData);

    if (validationErrors.newPassword.length || validationErrors.repeatedNewPassword.length) {
      setErrors(validationErrors);
      return;
    }

    if (formData.newPassword !== formData.repeatedNewPassword) {
      setErrors({newPassword: 
        'Passwords do not match', 
        repeatedNewPassword: 'Passwords do not match',
        email: ''
      });
      return;
    }

    resetPassword({email: formData.email, password: formData.newPassword})
    setFormData(initialFormData);
  };

  return (
    <div>
      <FormHeader heading="Change your password" text=""/>
      {errorMessage ? <ErrorMessage message={errorMessage}/> : null}
      <AuthForm
        type='password-reset'
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isAuthenticating={isResetting}
      />
    </div>
  );
};

export { PasswordReset };
