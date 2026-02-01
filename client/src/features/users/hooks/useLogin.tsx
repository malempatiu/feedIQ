import { client } from '@api/Api';
import { USER_QUERY_KEY } from '@shared/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Response = {
  message: string;
  token: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: (loginPayload: {email: string, password: string}) => client.post<Response>('auth/login', loginPayload),
    onSuccess: (data) => {
      localStorage.setItem('currentUser', data.token);
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
    }
  });

  return { login, isPending };
}