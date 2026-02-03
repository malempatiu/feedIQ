import {useQuery} from '@tanstack/react-query';
import { client } from '../../api/Api';

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
  feedbacks: Feedback[]
}

const useFeedbacks = (page: number = 0, limit:number=25) => {
  const {data, isPending, error} = useQuery({
    queryKey: ['feeds', {page, limit}],
    queryFn: () => client.get<FeedbacksData>('feeds'),
  })

  const feedbacks = data?.data?.feedbacks?.map((feedback) => ({...feedback, votes: 10, commentsCount: 5, category: 'Enhancement'})) ?? [];

  return {
    data:  data ? {...data, feedbacks} : {limit, currentPage: page, totalPages: 0, feedbacks},
    showLoading: isPending,
    errorMessage: error?.message
  }
}

export {useFeedbacks};