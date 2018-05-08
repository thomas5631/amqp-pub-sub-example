var amqp = require('amqplib/callback_api');

queueBindings = [
  { queue: 'class-management' },
  { queue: 'assessment-management' },
  { queue: 'log' }
];

amqp.connect('amqp://localhost', function (err, conn) {
  conn.createChannel(function (err, ch) {
    var ex = 'user_management';

    ch.assertExchange(ex, 'topic', { durable: true });
    
    queueBindings.forEach(function (binding) {
      ch.purgeQueue(binding.queue);
      ch.unbindQueue(binding.queue, ex);
      ch.deleteQueue(binding.queue);
    })

    ch.deleteExchange(ex);
  });

  // just used to close the connection
  setTimeout(function () { conn.close(); process.exit(0) }, 500);
});
