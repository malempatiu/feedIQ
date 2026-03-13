import axios from 'axios';
import { logger } from './logger.ts';
import type { FeedbackMessage } from '@/handlers/types.ts';
import { config } from '@/config/config.ts';

export const createJiraTicket = async (message: FeedbackMessage) => {
  try {
    const response = await axios.post(
      `https://${config.jira.domain}/rest/api/3/issue`,
      {
        fields: {
          project: { key: config.jira.projectKey },
          summary: `Feedback received: ${message.category}`,
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: message.detail
                  }
                ]
              }
            ]
          },
          issuetype: { name: 'Task' }
        }
      },
      {
        auth: {
          username: config.jira.email,
          password: config.jira.token
        },
        headers: { 'Content-Type': 'application/json' }
      }
    );
    logger.info('JIRA Ticket Created Successfully');
    return response.data;
  } catch (error) {
    logger.error(`Unable to create JIRA Ticket: ${error}`);
  }
};
