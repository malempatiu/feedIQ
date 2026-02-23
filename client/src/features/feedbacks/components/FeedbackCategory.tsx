import { twMerge } from "tailwind-merge";
import { useCategory } from "../useCategory";

const FeedbackCategory = ({ category, id }: { category: string; id: number }) => {
  const { feedback } = useCategory(id, category === "Suggestion");

  const isUsingFallback = category === "Suggestion" && !feedback?.category;
  const feedbackCategory = feedback?.category || category;

  return (
    <div
      className={twMerge(
        "flex items-center justify-center rounded-lg px-4 py-1.5 w-fit transition-all",
        isUsingFallback ? "animate-pulse bg-indigo-300" : "bg-indigo-600",
      )}
    >
      <span className='text-sm font-semibold text-gray-0'>{feedbackCategory}</span>
    </div>
  );
};

export {FeedbackCategory};