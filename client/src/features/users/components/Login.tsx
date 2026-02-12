import { Button } from "@ui/interactions/Button";
import { Input } from "@ui/interactions/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormHeader } from "./FormHeader";
import * as z from "zod";
import { NavLink } from "react-router";
import { useLogin } from "../hooks/useLogin";
import { ErrorMessage } from "@ui/ErrorMessage";

const loginSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }),
  password: z
    .string({ error: "Please enter a password" })
    .min(8, { error: "Password must be at least 8 characters" }),
});

type LoginFields = z.infer<typeof loginSchema>;

const Login = () => {
  const { login, isLoggingIn, errorMessage } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFields) => {
    login(data);
  };

  return (
    <div>
      <FormHeader heading='Welcome back' text='Sign in to continue to your account' />
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <Input
          label='Email'
          {...register("email")}
          error={errors.email?.message}
          placeholder='example@feediq.com'
        />
        <Input
          label='Password'
          type='password'
          {...register("password")}
          error={errors.password?.message}
          placeholder='••••••••'
        />
        <NavLink
          to='../password-reset'
          className='text-sm text-blue-600 hover:text-blue-700 self-end mb-1.5'
        >
          Forgot password?
        </NavLink>
        <Button type='submit' variant='secondary' fullWidth isPending={isLoggingIn}>
          Login
        </Button>
      </form>
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
