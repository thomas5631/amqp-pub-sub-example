var amqp = require('amqplib/callback_api');


// try running with npm run read assessment-management
amqp.connect('amqp://localhost', function (err, conn) {
  conn.createChannel(function (err, ch) {
    var args = process.argv.slice(2);
    var q = args[0];

    ch.assertQueue(q, { durable: true });
    ch.prefetch(1); // prefetch is channel level only
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function (msg) {
      console.log(" [x] Received %s", msg.content.toString());
      setTimeout(function () {
        console.log(" [x] Done");
        ch.ack(msg);
      }, 1000);
    }, { noAck: false });
  });
});
