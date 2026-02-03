import { client } from "@api/Api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { RegisterFormData } from "../types";

export const useRegister = () => {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useMutation({
    mutationFn: (payload: RegisterFormData) => client.post('auth/register', payload),
    onSuccess: () => {
      navigate("login");
    },
  });

  return { register, isRegistering: isPending };
};
