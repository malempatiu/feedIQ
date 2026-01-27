import { useEffect } from "react";
import { FeedbackCard } from "../../ui/FeedbackCard";
import { FeedbacksContainer } from "../../ui/FeedbacksContainer";
import { FeedbacksSkeletonLoader } from "../../ui/FeedbacksSkeletonLoader";
import { NoFeedback } from "../../ui/NoFeedback";
import { useFeedbacks } from "./useFeedbacks";
import toast from "react-hot-toast";

const Feedbacks = () => {
  const {data, showLoading, errorMessage} = useFeedbacks();

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
      </FeedbacksContainer>
    </div>
  ); 
}

export {Feedbacks};