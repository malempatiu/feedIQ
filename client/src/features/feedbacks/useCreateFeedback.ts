import { client } from '@api/Api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type CreateFeedbackData = {
  title: string;
  detail: string;
  category?: string;
  priority?: string;
};

type Response = {
  id: number;
  title: string;
  detail: string;
  category: string | null;
  priority: string | null;
  votes: number | null;
  sentiment: string | null;
  createdAt: string;
  updatedAt: string | null;
};

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();
  const { mutate: createFeedback, isPending, error } = useMutation({
    mutationFn: (feedbackData: CreateFeedbackData) => client.post<Response>('feeds/', feedbackData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      toast.success('Feedback added successfully!');
    }
  });

  return { createFeedback, isCreating: isPending, errorMessage: error?.message };
};