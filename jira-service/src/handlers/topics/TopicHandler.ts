import type { EventHandler } from "../types.ts";

export abstract class TopicHandler<T extends { event: string }> {
  abstract handlers: Map<string, EventHandler<T>>;

  abstract registerHandlers(): void;
  
  handle = async (message: T): Promise<void> => {
    const handler = this.handlers.get(message.event);

    if (!handler) {
      console.warn(`Unhandled event ${message.event}`);
      return;
    }

    await handler.handle(message);
  };
}
