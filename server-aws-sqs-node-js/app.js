// Require objects.
var express = require("express");
var app = express();
const cors = require("cors");
var aws = require("aws-sdk");
var queueUrl =
  "https://sqs.us-east-2.amazonaws.com/380955945980/EzOutStore-default";
var receipt = "";

// Load your AWS credentials and try to instantiate the object.
aws.config.loadFromPath(__dirname + "/config.json");

// Instantiate SQS.
var sqs = new aws.SQS();
/*
// Creating a queue.
app.get('/create', function (req, res) {
    var params = {
        QueueName: "MyFirstQueue"
    };
    
    sqs.createQueue(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
});

// Listing our queues.
app.get('/list', function (req, res) {
    sqs.listQueues(function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        } 
    });
});
*/
// Sending a message.
// NOTE: Here we need to populate the queue url you want to send to.
// That variable is indicated at the top of app.js.
app.get("/send", function (req, res) {
  var params = {
    MessageBody: "Hello world!",
    QueueUrl: queueUrl,
    DelaySeconds: 0,
  };

  sqs.sendMessage(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// Receive a message.
// NOTE: This is a great long polling example. You would want to perform
// this action on some sort of job server so that you can process these
// records. In this example I'm just showing you how to make the call.
// It will then put the message "in flight" and I won't be able to
// reach that message again until that visibility timeout is done.
app.get("/receive", cors(), function (req, res) {
  var params = {
    QueueUrl: queueUrl,
    VisibilityTimeout: 600, // 10 min wait time for anyone else to process.
  };

  sqs.receiveMessage(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
      console.log("test");
    }
  });
});

// Deleting a message.
app.get("/delete", function (req, res) {
  var params = {
    QueueUrl: queueUrl,
    ReceiptHandle: receipt,
  };

  sqs.deleteMessage(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// Purging the entire queue.
app.get("/purge", function (req, res) {
  var params = {
    QueueUrl: queueUrl,
  };

  sqs.purgeQueue(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server.

app.use(
  cors({
    origin: "*",
  })
);

app.listen(8080, () => {
  console.log(`Example app listening on port 8080`);
});

/*console.log(app);
var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('AWS SQS example app listening at http://%s:%s', host, port);
});
**/
