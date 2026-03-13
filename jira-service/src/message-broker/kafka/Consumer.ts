import { config } from '@/config/config.ts';
import type { TopicHandlers } from '@/handlers/types.ts';
import { logger } from '@/utils/logger.ts';
import { KafkaJS } from '@confluentinc/kafka-javascript';
const { Kafka, logLevel } = KafkaJS;

class Consumer {
  private readonly consumer: KafkaJS.Consumer;
  private isConnected: boolean;

  constructor() {
    this.consumer = new Kafka({
      kafkaJS: {
        clientId: config.kafka.clientId,
        brokers: config.kafka.brokers,
        logLevel: logLevel.INFO
      }
    }).consumer({
      kafkaJS: {
        groupId: config.kafka.groupId
      }
    });
    this.isConnected = false;
  }

  connect = async () => {
    if (this.isConnected) {
      logger.info('Consumer already connected');
      return;
    }
    try {
      await this.consumer.connect();
      this.isConnected = true;
      logger.info('Consumer connected successfully');
    } catch (error: any) {
      logger.error('Unable to connect to consumer', error);
      throw new Error(error);
    }
  };

  disconnect = async () => {
    if (!this.isConnected) return;
    try {
      await this.consumer.disconnect();
      this.isConnected = false;
      logger.info('Consumer disconnected successfully');
    } catch (error: any) {
      logger.error('Unable to disconnect consumer', error);
      throw new Error(error);
    }
  };

  isHealthy = (): boolean => {
    return this.isConnected;
  };

  subscribe = async (handlers: TopicHandlers) => {
    try {
      const topics = Object.keys(handlers) as (keyof TopicHandlers)[];
      await this.consumer.subscribe({ topics });
      await this.consumer.run({
        eachMessage: async ({ topic, message }) => {
          const topicHandler = handlers[topic as keyof TopicHandlers];
          if (!(topicHandler && message.value)) return;
          await topicHandler.handle(JSON.parse(message.value.toString()));
        }
      });
    } catch (e) {
      logger.error(`Error stopping message broker: ${e}`);
      process.exit(1);
    }
  };
}

export { Consumer };
