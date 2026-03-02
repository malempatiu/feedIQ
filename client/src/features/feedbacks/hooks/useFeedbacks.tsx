import {useQuery} from '@tanstack/react-query';
import { client } from '@api/Api';
import { FALLBACK_CATEGORY } from '../utils/constants';

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
}

type FeedbacksData = {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalFeedbacks: number;
  feedbacks: Feedback[]
}

const useFeedbacks = (page: number = 0, limit: number = 5) => {
  const params = new URLSearchParams({ 
    page: String(page), 
    limit: String(limit) 
  })
  const {data, isPending, error} = useQuery({
    queryKey: ['feeds', {page, limit}],
    queryFn: () => client.get<FeedbacksData>(`feeds?${params.toString()}`),
  })

  const feedbacks = data?.data?.feedbacks?.map((feedback: Feedback) => ({
    ...feedback, 
    votes: 10, 
    commentsCount: 5, 
    category: feedback.category ?? FALLBACK_CATEGORY
  })) ?? [];

  return {
    data:  data ? {...data.data, feedbacks} : {
      limit, 
      currentPage: page, 
      totalPages: 0, 
      feedbacks, 
      totalFeedbacks: 0
    },
    showLoading: isPending,
    errorMessage: error?.message
  }
}

export {useFeedbacks};