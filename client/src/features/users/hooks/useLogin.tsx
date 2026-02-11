import { client } from '@/api/Api';
import { USER_QUERY_KEY } from '@/shared/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginFormData } from '../types';

type Response = {
  message: string;
  token: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate: login, isPending, error } = useMutation({
    mutationFn: (loginPayload: LoginFormData) => client.post<Response>('auth/login', loginPayload),
    onSuccess: ({data}) => {
      localStorage.setItem('currentUser', (data!).token);
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
    }
  });


  return { login, isLoggingIn: isPending, errorMessage: error?.message };
}