import { Worker, Job } from 'bullmq';
import { redisConfig } from '@/config/redis';
import { emailQueueName } from '@/queues/email.queue';

export const initializeEmailWorker = () => {
  const worker = new Worker(
    emailQueueName,
    async (job: Job) => {
      console.log(`[EmailWorker] Processing job ${job.id} for ${job.name}`);
      const { to, subject, body } = job.data;
      
      try {
        // Implement your actual email sending logic here!
        console.log(`[EmailWorker] Sent email to ${to} with subject "${subject}"`);
      } catch (error) {
        console.error(`[EmailWorker] Failed to send email to ${to}`, error);
        throw error;
      }
    },
    {
      connection: redisConfig,
      concurrency: 5,
      skipVersionCheck: true, // Suppresses the v5 warning during local dev
    }
  );

  worker.on('completed', (job) => {
    console.log(`[EmailWorker] Job ${job.id} has completed!`);
  });

  worker.on('failed', (job, err) => {
    console.log(`[EmailWorker] Job ${job?.id} has failed with ${err.message}`);
  });
  
  worker.on('error', (err) => {
    console.error(`[EmailWorker] Encountered error:`, err);
  });

  return worker;
};
