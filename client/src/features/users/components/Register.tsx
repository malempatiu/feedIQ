import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormHeader } from "./FormHeader";
import { ErrorMessage } from "@ui/ErrorMessage";
import { Input } from "@ui/interactions/Input";
import { NavLink } from "react-router";
import { Button } from "@ui/interactions/Button";

const nameSchema = z
  .string({ error: "Require at least 3 characters" })
  .min(3, { error: "Require at least 3 characters" })
  .max(10, { error: "Only 10 characters are allowed" });

const registerSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: z
    .email({ error: "Please enter a valid email" })
    .max(25, { error: "Only 25 characters are allowed" }),
  password: z
    .string({ error: "Please enter a password" })
    .min(8, { error: "Password must be at least 8 characters" })
    .max(13, { error: "Password must not exceed 13 characters" }),
});

type RegisterFields = z.infer<typeof registerSchema>;

const Register = () => {
  const { register: registerUser, isRegistering, errorMessage } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFields) => {
    registerUser(data);
  };

  return (
    <div>
      <FormHeader heading='Welcome back' text='Sign in to continue to your account' />
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input
            label='First name'
            {...register("firstName")}
            error={errors.firstName?.message}
            placeholder='first name'
          />
          <Input
            label='Last Name'
            {...register("lastName")}
            error={errors.lastName?.message}
            placeholder='last name'
          />
        </div>
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
        <Button type='submit' variant='secondary' fullWidth isPending={isRegistering}>
          Register
        </Button>
      </form>
      <div className='mt-6 text-center'>
        <p className='text-gray-600'>
          Already have an account?{" "}
          <NavLink
            to='../login'
            className='text-blue-600 hover:text-blue-700 font-medium cursor-pointer'
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export { Register };
