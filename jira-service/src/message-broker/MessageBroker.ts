import { logger } from '@/utils/logger.ts';
import { Consumer } from './kafka/Consumer.ts';

class MessageBroker {
  private consumer?: Consumer;
  private healthy: boolean = false;

  async start(): Promise<void> {
    try {
      logger.info('Starting message broker...');

      // Initialize and connect consumer (if needed)
      this.consumer = new Consumer();
      await this.consumer.connect();
      await this.consumer.subscribe(async (data) => {
        logger.info(`Received message ${JSON.stringify(data)}`);
      });

      this.healthy = true;
      logger.info('Message broker started successfully');
    } catch (error) {
      this.healthy = false;
      logger.error(`Failed to start message broker: ${error}`);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      logger.info('Stopping message broker...');

      if (this.consumer) {
        await this.consumer.disconnect();
      }

      this.healthy = false;
      logger.info('Message broker stopped successfully');
    } catch (error) {
      logger.error(`Error stopping message broker: ${error}`);
      throw error;
    }
  }

  isHealthy = (): boolean => {
    this.healthy = this.consumer?.isHealthy() ?? false;
    return this.healthy;
  };
}

export { MessageBroker };
