import { config } from './config/config.ts';
import { App } from './App.ts';
import { logger } from './utils/logger.ts';

async function bootstrap() {
  try {
    const app = new App();
    await app.startServer();
  } catch (error) {
    logger.error(`Failed to start application: ${error}`);
    process.exit(1);
  }
}

bootstrap();
