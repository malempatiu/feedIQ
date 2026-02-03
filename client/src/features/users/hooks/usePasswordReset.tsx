import { client } from "@api/Api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { LoginFormData } from "../types";


export const usePasswordReset = () => {
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: (payload: LoginFormData) =>
      client.post("auth/password-reset", payload),
    onSuccess: () => {
      navigate('login')
    },
  });

  return { resetPassword, isResetting: isPending };
};
