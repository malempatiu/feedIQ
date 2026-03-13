import dotenv from 'dotenv';

dotenv.config();

interface Config {
  nodeEnv: string;
  kafka: {
    clientId: string;
    groupId: string;
    brokers: string[];
  },
  jira: {
    token: string,
    email: string,
    projectKey: string,
    domain: string
  }
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  kafka: {
    // A label that names a particular producer or consumer
    clientId: process.env.KAFKA_CLIENT_ID ?? 'jira-service',
    // For multiple consumers in a group to share workload then give same group id
    groupId: process.env.KAFKA_GROUP_ID ?? 'jira-service-group',
    // Responsible for write and reading messages to partitions
    brokers: [process.env.KAFKA_BROKER_1 ?? 'localhost:9092']
  },
  jira: {
    token: process.env.JIRA_API_TOKEN ?? '',
    domain: process.env.JIRA_DOMAIN ?? '',
    projectKey: process.env.JIRA_PROJECT_KEY ?? '',
    email: process.env.JIRA_EMAIL ?? ''
  }
};

export {config};