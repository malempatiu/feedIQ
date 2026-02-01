import { client } from "@api/Api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";


type SignUpPayload = {
 firstName: string,
 lastName: string,
 email:string,
 password: string
}

export const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: (payload: SignUpPayload) => client.post('auth/register', payload),
    onSuccess: () => {
      navigate("login");
    },
  });

  return { signup, isPending };
};
