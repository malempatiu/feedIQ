import { FeedbackCard } from "./ui/FeedbackCard";
import { FeedbacksContainer } from "./ui/FeedbacksContainer";

const data = [
  {
    id: 1,
    title: "Add a dark theme option",
    detail:
      "It would help people with light sensitivities and who prefersdfsdfsfsdfsdfsdfsdfsdfsdfsdfsf dark mode It would help people with light sensitivities and who prefer dark mode It would helps people with light sensitivities and who prefer dark modesdfsdfsdfsfs",
    category: "Enhancement",
    priority: "Low",
    createdAt: "2026-01-25T15:21:26.495451",
    updatedAt: "2026-01-25T20:24:45.079845",
    commentsCount: 10,
    votes: 65,
  },
  {
    id: 3,
    title: "Add a dark theme option",
    detail: "It would help people with light sensitivities and who prefer dark mode",
    category: "Feature",
    priority: "Low",
    createdAt: "2026-01-25T15:21:26.495451",
    updatedAt: "2026-01-25T20:24:45.079845",
    commentsCount: 9,
    votes: 65,
  },
  {
    id: 32,
    title: "Add a dark theme option",
    detail: "It would help people with light sensitivities and who prefer dark mode",
    category: "Bug",
    priority: "Low",
    createdAt: "2026-01-25T15:21:26.495451",
    updatedAt: "2026-01-25T20:24:45.079845",
    commentsCount: 1,
    votes: 65,
  },
  {
    id: 33,
    title: "Add a dark theme option",
    detail: "It would help people with light sensitivities and who prefer dark mode",
    category: "Enhancement",
    priority: "Low",
    createdAt: "2026-01-25T15:21:26.495451",
    updatedAt: "2026-01-25T20:24:45.079845",
    commentsCount: 22,
    votes: 65,
  },
  {
    id: 34,
    title: "Add a dark theme option",
    detail: "It would help people with light sensitivities and who prefer dark mode",
    category: "Feature",
    priority: "Low",
    createdAt: "2026-01-25T15:21:26.495451",
    updatedAt: "2026-01-25T20:24:45.079845",
    commentsCount: 5,
    votes: 65,
  },
  {
    id: 35,
    title: "Add a dark theme option",
    detail: "It would help people with light sensitivities and who prefer dark mode",
    category: "Feature",
    priority: "Low",
    createdAt: "2026-01-25T15:21:26.495451",
    updatedAt: "2026-01-25T20:24:45.079845",
    commentsCount: 10,
    votes: 65,
  },
  {
    id: 36,
    title: "Add a dark theme option",
    detail: "It would help people with light sensitivities and who prefer dark mode",
    category: "Feature",
    priority: "Low",
    createdAt: "2026-01-25T15:21:26.495451",
    updatedAt: "2026-01-25T20:24:45.079845",
    commentsCount: 0,
    votes: 65,
  },
  {
    id: 37,
    title: "Add a dark theme option",
    detail: "It would help people with light sensitivities and who prefer dark mode",
    category: "Feature",
    priority: "Low",
    createdAt: "2026-01-25T15:21:26.495451",
    updatedAt: "2026-01-25T20:24:45.079845",
    commentsCount: 7,
    votes: 65,
  },
  {
    id: 38,
    title: "Add a dark theme option",
    detail: "It would help people with light sensitivities and who prefer dark mode",
    category: "Feature",
    priority: "Low",
    createdAt: "2026-01-25T15:21:26.495451",
    updatedAt: "2026-01-25T20:24:45.079845",
    commentsCount: 10,
    votes: 65,
  },
  {
    id: 39,
    title: "Add a dark theme option",
    detail: "It would help people with light sensitivities and who prefer dark mode",
    category: "Feature",
    priority: "Low",
    createdAt: "2026-01-25T15:21:26.495451",
    updatedAt: "2026-01-25T20:24:45.079845",
    commentsCount: 3,
    votes: 65,
  },
  {
    id: 40,
    title: "Add a dark theme option",
    detail: "It would help people with light sensitivities and who prefer dark mode",
    category: "Feature",
    priority: "Low",
    createdAt: "2026-01-25T15:21:26.495451",
    updatedAt: "2026-01-25T20:24:45.079845",
    commentsCount: 0,
    votes: 65,
  },
];

const Feedbacks = () => {
  return (
    <div className='flex flex-col gap-3.5 max-w-4xl py-8 mx-auto'>
      <div className='min-h-20 bg-slate-800 lg:rounded-lg' />
      <FeedbacksContainer>
        {data.map((feedback) => {
          return <FeedbackCard key={feedback.id} feedback={feedback} />;
        })}
      </FeedbacksContainer>
    </div>
  ); 
}

export {Feedbacks};