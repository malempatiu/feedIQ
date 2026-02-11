import { useMutation, useQueryClient } from "@tanstack/react-query"
import { USER_QUERY_KEY } from "./query-keys";

const deleteToken = async () => {
  const token = localStorage.getItem('currentUser')
  if (token) {
    localStorage.removeItem('currentUser');
    return Promise.resolve();
  }

  return Promise.reject('Unable to logout!');
}

const useLogout = () => {
  const queryClient = useQueryClient();
  const {mutate, error} = useMutation({
    mutationFn: deleteToken,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [USER_QUERY_KEY]})
    }
  })

  return {
    logout: mutate,
    error: error?.message
  }
}

export {useLogout}