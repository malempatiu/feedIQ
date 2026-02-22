import { useEffect, useState } from "react";
import { useFeedbacks } from "./useFeedbacks";
import toast from "react-hot-toast";
import { NoFeedbacks } from "@features/feedbacks/components/NoFeedbacks";
import { FeedbacksContainer } from "@features/feedbacks/components/FeedbacksContainer";
import { FeedbacksSkeletonLoader } from "@features/feedbacks/components/FeedbacksSkeletonLoader";
import { FeedbackCard } from "@features/feedbacks/components/FeedbackCard";
import { Pagination } from "@ui/interactions/Pagination";
import { Button } from "@ui/interactions/Button";
import { Plus } from "react-feather";

const Feedbacks = () => {
  const [currentPage, setCurrentPage] = useState (0);
  const {data, showLoading, errorMessage} = useFeedbacks(currentPage);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);


  return (
    <div className='flex flex-col gap-3.5 max-w-4xl py-8 mx-auto'>
      <div className='min-h-20 bg-slate-800 lg:rounded-lg flex items-center flex-row-reverse px-2 py-2'>
        <Button variant='primary'>
          <Plus size={16} />
          Add Feedback
        </Button>
      </div>
      <FeedbacksContainer>
        { showLoading ? <FeedbacksSkeletonLoader /> : 
          data.feedbacks.length ? (
            data.feedbacks.map((feedback) => {
              return <FeedbackCard key={feedback.id} feedback={feedback} />;
            })
          ) : 
          (<NoFeedbacks />)
        }
        {data.totalPages && data.totalPages > 1 ? <Pagination currentPage={currentPage} totalPages={data.totalPages!} onPageChange={setCurrentPage} /> : null}
      </FeedbacksContainer>
    </div>
  ); 
}

export {Feedbacks};