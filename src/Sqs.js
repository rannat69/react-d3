import React, { useState, useEffect } from "react";
import Scatterplot from "./Scatter";
import { SQSClient, AddPermissionCommand } from "@aws-sdk/client-sqs";
import { Consumer } from "sqs-consumer";
import configData from "./config.json";

function Sqs() {
  const [dataSqs, setDataSqs] = useState([{}]);
  var [i, setI] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (reload) {
      console.log("reload graph");
      setReload(false);
    }
  }, [reload]);

  const app = Consumer.create({
    queueUrl: configData.QueueUrl,
    messageAttributeNames: ["longitude", "latitude", "category"],
    handleMessage: async (message) => {
      let longitude = JSON.parse(message.Body).data.longitude;
      let latitude = JSON.parse(message.Body).data.latitude;
      let category = JSON.parse(message.Body).data.category;

      let dataSqsTemp = {
        // Convert coords to decimal before passing to array

        x: longitude,
        y: latitude,
        product: category,
      };
      dataSqs[i] = dataSqsTemp;

      console.log("dataSqsTemp", dataSqsTemp);

      console.log("dataSqs[i]", i, dataSqs[i]);
      console.log("dataSqs during message load", dataSqs);
      setDataSqs(dataSqs);

      app.deleteMessage(message);
      i++;
      setI(i);

      setReload(true);
    },
    sqs: new SQSClient({
      region: configData.Region,
      credentials: {
        accessKeyId: configData.AccessKey,
        secretAccessKey: configData.SecretAccessKey,
      },
    }),
  });
  app.on("error", (err) => {
    console.error(err.message);
  });

  app.on("processing_error", (err) => {
    console.error(err.message);
  });

  app.on("timeout_error", (err) => {
    console.error(err.message);
  });
  app.start();

  return (
    <>
      {console.log("dataSqs", dataSqs)}
      <div style={{ textAlign: "center" }}>
        <h1>REACTJS SQS IMPORT EXAMPLE </h1>
        <form>IMPORT SQS</form>

        <br />
      </div>
      <Scatterplot data={dataSqs} width={400} height={400} />
    </>
  );
}

export default Sqs;
