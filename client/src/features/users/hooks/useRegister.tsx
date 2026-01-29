import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../../api/Api";

type SignUpPayload = {
 firstName: string,
 lastName: string,
 email:string,
 password: string
}

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: (payload: SignUpPayload) => client.post('/auth/register', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { signup, isPending };
};
