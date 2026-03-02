import { twMerge } from "tailwind-merge";
import { useCategory } from "../hooks/useCategory";
import { FALLBACK_CATEGORY } from "../utils/constants";

const FeedbackCategory = ({ category, id }: { category: string; id: number }) => {
  const { feedback } = useCategory(id, category === FALLBACK_CATEGORY);

  const isUsingFallback = category === FALLBACK_CATEGORY && !feedback?.category;
  const feedbackCategory = feedback?.category || category;

  return (
    <div
      className={twMerge(
        "flex items-center justify-center rounded-lg px-4 py-1.5 w-fit transition-all",
        isUsingFallback ? "animate-pulse bg-gray-200" : "bg-gray-400",
      )}
    >
      <span className='text-sm font-semibold text-blue-600'>{feedbackCategory}</span>
    </div>
  );
};

export { FeedbackCategory };
