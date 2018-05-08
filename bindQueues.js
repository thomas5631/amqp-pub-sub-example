var amqp = require('amqplib/callback_api');

queueBindings = [
  { queue: 'class-management', key: 'user.*' },
  { queue: 'assessment-management', key: 'user.*' },
  { queue: 'log', key: '#' }
];

amqp.connect('amqp://localhost', function (err, conn) {
  conn.createChannel(function (err, ch) {
    var ex = 'user_management';

    ch.assertExchange(ex, 'topic', { durable: true });
    
    queueBindings.forEach(function (binding) {
      ch.assertQueue(binding.queue);
      ch.bindQueue(binding.queue, ex, binding.key);
    });
  });

  // just used to close the connection
  setTimeout(function () { conn.close(); process.exit(0) }, 500);
});
