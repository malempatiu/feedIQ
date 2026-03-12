import { config } from '@/config/config.ts';
import { logger } from '@/utils/logger.ts';
import {KafkaJS} from '@confluentinc/kafka-javascript';
const {Kafka, logLevel} = KafkaJS;

type MessageType = {
  id: number,
  title: string,
  detail: string,
  category: string,
  event: string
}

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
  }

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
  }

  isHealthy = (): boolean => {
    return this.isConnected;
  }

  subscribe = async (messageHandler: (message: MessageType) => void) => {
    await this.consumer.subscribe({ topics: [...config.kafka.topics] });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (topic !== config.kafka.topics[0]) {
          return;
        }

        if (message.value) {
          const inputMessage: MessageType = JSON.parse(message.value.toString());
          await messageHandler(inputMessage);
          await this.consumer.commitOffsets([
            { topic, partition, offset: (Number(message.offset) + 1).toString() },
          ]);
        }
      },
    });
  }
}

export {Consumer};