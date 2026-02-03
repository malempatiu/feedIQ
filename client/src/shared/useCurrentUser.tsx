import { client } from "@api/Api";
import { useQuery } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "./query-keys";

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export function useCurrentUser() {
  const { isLoading, data } = useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => client.get<User>('auth/user/me'),
    staleTime: Infinity,
  });

  return { isLoading, user: data?.data, isAuthenticated: !!data?.data };
}
