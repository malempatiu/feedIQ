import { logger } from './utils/logger.ts';
import { MessageBroker } from './message-broker/MessageBroker.ts';

class App {
  private messageBroker?: MessageBroker;
  private isShuttingDown: boolean = false;

  constructor() {    
    this.setupProcessHandlers();
  }

  private setupProcessHandlers = () => {
    process.on('uncaughtException', (err: Error) => {
      logger.error(`Uncaught Exception:${err.message}`);
      this.gracefulShutdown(1);
    });

    process.on('unhandledRejection', (reason, _promise) => {
      logger.error(`Unhandled Rejection at: ${reason}`);
      this.gracefulShutdown(1);
    });

    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, starting graceful shutdown');
      this.gracefulShutdown(0);
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT received, starting graceful shutdown');
      this.gracefulShutdown(0);
    });
  };

  private async bootstrapMessageBroker(): Promise<void> {
    try {
      logger.info('Initializing message broker...');
      this.messageBroker = new MessageBroker();
      await this.messageBroker.start();
      logger.info('Message broker initialized successfully');
    } catch (error: any) {
      logger.error(`Failed to initialize message broker:${error}`);
      throw error; // Fail fast if Kafka is required
    }
  }

  async initialize(): Promise<void> {
    try {
      // Bootstrap all async dependencies
      await this.bootstrapMessageBroker();
      logger.info('Application initialized successfully');
    } catch (error: any) {
      logger.error(`Application initialization failed:${error}`);
      throw error;
    }
  }

  async startServer(): Promise<void> {
    try {
      // Initialize async dependencies first
      await this.initialize();
    } catch (error: any) {
      logger.error(`Failed to start server: ${error}`);
      process.exit(1);
    }
  }

  private async gracefulShutdown(exitCode: number): Promise<void> {
    if (this.isShuttingDown) {
      logger.warn('Shutdown already in progress');
      return;
    }

    this.isShuttingDown = true;
    logger.info('Starting graceful shutdown...');

    // Set a timeout to force shutdown if graceful shutdown takes too long
    const forceShutdownTimeout = setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 30000); // 30 seconds

    try {
      // Close message broker
      if (this.messageBroker) {
        await this.messageBroker.stop();
        logger.info('Message broker stopped');
      }

      clearTimeout(forceShutdownTimeout);
      logger.info('Graceful shutdown completed');
      process.exit(exitCode);
    } catch (error: any) {
      logger.error(`Error during graceful shutdown: ${error}`);
      clearTimeout(forceShutdownTimeout);
      process.exit(1);
    }
  }

}

export { App };