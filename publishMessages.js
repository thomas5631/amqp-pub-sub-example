var amqp = require('amqplib/callback_api');

// try running with npm run publish user.update
// try running with npm run publish no.correlation
amqp.connect('amqp://localhost', function (err, conn) {
  conn.createChannel(function (err, ch) {
    var ex = 'user_management';
    var args = process.argv.slice(2);
    var key = args[0];

    ch.assertExchange(ex, 'topic', { durable: true });
    for(let i = 0; i < 1000; i++) {
      const msg = {
        username: 'lilleyt',
        index: i,
      };
      ch.publish(
        ex,
        key,
        new Buffer(JSON.stringify(msg)),
        { 
          persistent: true,
          contentType: 'application/json'
        }
      );
      console.log(" [x] Sent %s:'%s'", key, JSON.stringify(msg));
    }
  });

  // just used to close the connection
  setTimeout(function () { conn.close(); process.exit(0) }, 500);
});
