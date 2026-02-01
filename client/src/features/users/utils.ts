import type { LoginFormData, LoginFormErrors, RegisterFormData, RegisterFormErrors } from "./types";

const validateEmail = (email: string): string => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email address';
  return '';
};

const validatePassword = (password: string): string => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

const validateName = (name: string, fieldName: string): string => {
  if (!name) return `${fieldName} is required`;
  if (name.length < 2) return `${fieldName} must be at least 2 characters`;
  return '';
};

export const validateLoginForm = (formData: LoginFormData): LoginFormErrors => {
  return {
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };
};

export const validateRegisterForm = (formData: RegisterFormData): RegisterFormErrors => {
  return {
    firstName: validateName(formData.firstName, 'First name'),
    lastName: validateName(formData.lastName, 'Last name'),
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };
};