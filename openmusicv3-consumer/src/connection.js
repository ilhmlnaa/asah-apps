const amqp = require('amqplib');

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const connectWithRetry = async (url, maxRetries = 10, delayMs = 5000) => {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      console.log(`[RabbitMQ] Attempt ${attempt + 1} connecting to ${url}...`);
      // eslint-disable-next-line no-await-in-loop
      const connection = await amqp.connect(url);
      console.log('[RabbitMQ] Connected ✅');
      return connection;
    } catch (err) {
      attempt += 1;
      console.error(`[RabbitMQ] Connection failed (attempt ${attempt}): ${err.message}`);
      if (attempt >= maxRetries) {
        console.error('[RabbitMQ] Max retries reached. Exiting...');
        process.exit(1);
        return null; // satisfy ESLint
      }
      console.log(`[RabbitMQ] Retrying in ${delayMs / 1000} seconds...`);
      // eslint-disable-next-line no-await-in-loop
      await delay(delayMs);
    }
  }

  return null; // satisfy ESLint hehe
};

module.exports = { connectWithRetry };
