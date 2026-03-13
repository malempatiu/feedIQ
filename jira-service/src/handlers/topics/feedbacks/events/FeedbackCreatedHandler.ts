import type { EventHandler, FeedbackMessage } from "@/handlers/types.ts";

class FeedbackCreatedHandler implements EventHandler<FeedbackMessage> {
  readonly eventName: FeedbackMessage['event'];
  constructor() {
    this.eventName = 'feedback_created';
  }
  async handle(message: FeedbackMessage): Promise<void> {
    console.log('Feedback created:', message);
  }
}

export {FeedbackCreatedHandler};