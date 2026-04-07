import { Queue } from 'bullmq';
import { redisConfig } from '@/config/redis';

export const emailQueueName = 'email-queue';

export const emailQueue = new Queue(emailQueueName, {
  connection: redisConfig,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

export const addEmailJob = async (jobName: string, data: any) => {
  return await emailQueue.add(jobName, data);
};
