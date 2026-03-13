import type { EventHandler, FeedbackMessage } from "@/handlers/types.ts";
import { createJiraTicket } from "@/utils/api.ts";

class FeedbackCreatedHandler implements EventHandler<FeedbackMessage> {
  readonly eventName: FeedbackMessage['event'];
  constructor() {
    this.eventName = 'feedback_created';
  }
  async handle(message: FeedbackMessage): Promise<void> {
    await createJiraTicket(message)
  }
}

export {FeedbackCreatedHandler};