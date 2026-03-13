import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  kafka: {
    clientId: string;
    groupId: string;
    brokers: string[];
  }

}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  kafka: {
    // A label that names a particular producer or consumer
    clientId: process.env.KAFKA_CLIENT_ID || 'jira-service',
    // For multiple consumers in a group to share workload then give same group id
    groupId: process.env.KAFKA_GROUP_ID || 'jira-service-group',
    // Responsible for write and reading messages to partitions
    brokers: [process.env.KAFKA_BROKER_1 || 'localhost:9092'],
  }
};

export {config};