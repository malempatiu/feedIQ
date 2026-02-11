import { useEffect, useState } from "react";
import { useFeedbacks } from "./useFeedbacks";
import toast from "react-hot-toast";
import { NoFeedback } from "@ui/NoFeedback";
import { FeedbacksContainer } from "@ui/FeedbacksContainer";
import { FeedbacksSkeletonLoader } from "@ui/FeedbacksSkeletonLoader";
import { FeedbackCard } from "@ui/FeedbackCard";
import { Pagination } from "@ui/Pagination";

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
      <div className='min-h-20 bg-slate-800 lg:rounded-lg' />
      <FeedbacksContainer>
        { showLoading ? <FeedbacksSkeletonLoader /> : 
          data.feedbacks.length ? (
            data.feedbacks.map((feedback) => {
              return <FeedbackCard key={feedback.id} feedback={feedback} />;
            })
          ) : 
          (<NoFeedback />)
        }
        <Pagination currentPage={currentPage} totalPages={data.totalPages!} onPageChange={setCurrentPage} />
      </FeedbacksContainer>
    </div>
  ); 
}

export {Feedbacks};