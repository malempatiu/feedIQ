import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '../../../api/Api';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: (loginPayload: {email: string, password: string}) => client.post('/auth/login', loginPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });

  return { login, isPending };
}