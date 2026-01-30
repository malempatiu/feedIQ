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
  const { isLoading, data: user } = useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => client.get<User>('auth/user/me', {'Authorization': `Bearer ${localStorage.getItem('currentUser')}`}),
    staleTime: Infinity,
  });

  return { isLoading, user, isAuthenticated: !!user };
}
