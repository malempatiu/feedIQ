import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ErrorMessage } from "@ui/ErrorMessage";
import { Input } from "@ui/interactions/Input";
import { Button } from "@ui/interactions/Button";
import { usePasswordReset } from "../hooks/usePasswordReset";
import { FormHeader } from "./FormHeader";

const passwordSchema = z
  .string({ error: "Please enter a password" })
  .min(8, { error: "Password must be at least 8 characters" })
  .max(13, { error: "Password must not exceed 13 characters" });

const resetSchema = z.object({
  email: z
    .email({ error: "Please enter a valid email" })
    .max(25, { error: "Only 25 characters are allowed" }),
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

type ResetFields = z.infer<typeof resetSchema>;

const PasswordReset = () => {
  const { resetPassword, isResetting, errorMessage } = usePasswordReset();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ResetFields>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = (data: ResetFields) => {
    if (data.password !== data.confirmPassword) {
      setError("password", { type: "custom", message: "Passwords did not match" });
      setError("confirmPassword", {
        type: "custom",
        message: "Passwords did not match",
      });
      return;
    }
    resetPassword(data);
  };

  return (
    <div>
      <FormHeader heading='Change your password' text='' />
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
        <Input
          label='Re-enter Password'
          type='password'
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          placeholder='••••••••'
        />
        <Button type='submit' variant='secondary' fullWidth isPending={isResetting}>
          Reset
        </Button>
      </form>
    </div>
  );
};

export { PasswordReset };
