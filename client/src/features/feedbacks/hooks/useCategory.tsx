import { useQuery } from "@tanstack/react-query";
import { client } from "@api/Api";

type Feedback = {
  id: number;
  title: string;
  detail: string;
  category: string;
  priority?: string;
  createdAt: string;
  updatedAt?: string;
  votes: number;
  commentsCount: number;
};

const useCategory = (id: number, enabled: boolean) => {
  const { data, error } = useQuery({
    queryKey: ["feed", { id }],
    queryFn: () => client.get<Feedback>(`feeds/${id}`),
    enabled,
    refetchInterval: (query) => {
      const hasPending = !query.state.data?.data?.category;
      return hasPending ? 3000 : false;
    },
  });

  return {
    feedback: data?.data,
    showLoading: enabled && !data?.data?.category,
    errorMessage: error?.message,
  };
};

export { useCategory };
