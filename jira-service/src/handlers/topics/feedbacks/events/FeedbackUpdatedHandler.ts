import type { EventHandler, FeedbackMessage } from "@/handlers/types.ts";

export class FeedbackUpdatedHandler implements EventHandler<FeedbackMessage> {
  readonly eventName: FeedbackMessage['event'];
  constructor() {
    this.eventName = 'feedback_updated';
  }
  async handle(message: FeedbackMessage): Promise<void> {
    console.log('Feedback updated:', message);
  }
}
