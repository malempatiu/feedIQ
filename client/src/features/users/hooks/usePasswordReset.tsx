import { client } from "@api/Api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

type Response = {
  message: string;
  token: string;
};

export const usePasswordReset = () => {
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      client.post<Response>("auth/password-reset", payload),
    onSuccess: () => {
      navigate('login')
    },
  });

  return { resetPassword, isPending };
};
