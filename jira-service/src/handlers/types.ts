import type { TopicHandler } from './topics/TopicHandler.ts';

export type FeedbackEvent = 'feedback_created' | 'feedback_updated';

export type FeedbackMessage = {
  id: number;
  title: string;
  detail: string;
  category: string;
  event: FeedbackEvent;
};

export type TopicMessageMap = {
  feedbacks: FeedbackMessage;
};

export interface EventHandler<T extends { event: string }> {
  eventName: T['event'];
  handle: (message: T) => Promise<void>;
}

export type TopicHandlers = {
  [K in keyof TopicMessageMap]: TopicHandler<TopicMessageMap[K]>;
};