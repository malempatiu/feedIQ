import { useEffect, useState } from "react";
import { useFeedbacks } from "./hooks/useFeedbacks";
import toast from "react-hot-toast";
import { NoFeedbacks } from "@features/feedbacks/components/NoFeedbacks";
import { FeedbacksContainer } from "@features/feedbacks/components/FeedbacksContainer";
import { FeedbacksSkeletonLoader } from "@features/feedbacks/components/FeedbacksSkeletonLoader";
import { FeedbackCard } from "@features/feedbacks/components/FeedbackCard";
import { AddFeedbackModal } from "@features/feedbacks/components/AddFeedbackModal";
import { Pagination } from "@ui/interactions/Pagination";
import { Button } from "@ui/interactions/Button";
import { Plus } from "react-feather";
import Typography from "@ui/Typography";
import { useSearchParams } from "react-router";

const Feedbacks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 0);
  const limit = Number(searchParams.get("limit") ?? 5);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, showLoading, errorMessage } = useFeedbacks(currentPage, limit);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

   const goToPage = (page: number) => {
     setSearchParams({ page: String(page), limit: String(limit) });
   };

  return (
    <div className='flex flex-col gap-3.5 min-w-[80%] max-w-[85%] py-8 mx-auto'>
      <div className='min-h-20 bg-slate-800 flex rounded-lg items-center justify-between px-4 py-2'>
        <Typography variant="h3" className="text-gray-0">{`${data.totalFeedbacks} Suggestions`}</Typography>
        <Button variant='primary' onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          Add Feedback
        </Button>
      </div>
      <FeedbacksContainer>
        {showLoading ? (
          <FeedbacksSkeletonLoader />
        ) : data.feedbacks.length ? (
          data.feedbacks.map((feedback) => {
            return <FeedbackCard key={feedback.id} feedback={feedback} />;
          })
        ) : (
          <NoFeedbacks />
        )}
        {data.totalPages && data.totalPages > 1 ? (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages!}
            onPageChange={goToPage}
          />
        ) : null}
      </FeedbacksContainer>
      <AddFeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} goToPage={goToPage}/>
    </div>
  );
};

export { Feedbacks };
