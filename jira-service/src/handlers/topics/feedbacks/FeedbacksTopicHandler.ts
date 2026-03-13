import type { EventHandler, FeedbackMessage } from '@/handlers/types.ts';
import { TopicHandler } from '../TopicHandler.ts';
import { FeedbackCreatedHandler } from './events/FeedbackCreatedHandler.ts';
import { FeedbackUpdatedHandler } from './events/FeedbackUpdatedHandler.ts';


const eventHandlers = [new FeedbackCreatedHandler(), new FeedbackUpdatedHandler()];

export class FeedbackTopicHandler extends TopicHandler<FeedbackMessage> {
  override handlers: Map<string, EventHandler<FeedbackMessage>>;
  constructor() {
    super();
    this.handlers = new Map();
    this.registerHandlers()
  }

  override registerHandlers(): void {
    eventHandlers.forEach((eventHandler) => {
      this.handlers.set(eventHandler.eventName, eventHandler)
    })
  }
}
