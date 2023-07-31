import React, { useState, useEffect } from "react";
import Scatterplot from "./Scatter";
import { SQSClient } from "@aws-sdk/client-sqs";
import { Consumer } from "sqs-consumer";
import configData from "./config.json";

var total = 0;
var totalGroceries = 0;
var totalOthers = 0;
function Sqs() {
  var dataSqs = {
    dTotalGroceries: 0,
    dTotalOthers: 0,
    dTotal: 0,
  };

  const [reload, setReload] = useState(false);

  /*const [totalGroceries, setTotalGroceries] = useState(0);
  const [totalOthers, setTotalOthers] = useState(0);
  const [total, setTotal] = useState(0);*/
  var i = 0;
  function addCategory(category) {

    if (category === "Groceries") {
      //  setTotalGroceries(totalGroceries + 1);
      totalGroceries++;
      //  setTotal(total + 1);
      total++;
    } else if (category === "Other food") {
      // setTotalOthers(totalOthers + 1);
      totalOthers++;
      // setTotal(total + 1);
      total++;
    }
    setReload(true);
  }

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload]);

  async function receive() {
    const res = await fetch("http://localhost:8080/receive");

    const data = await res.json();

    if (typeof data.Messages !== "undefined") {
      data.Messages.map((message) => {

        if (message.Body) {
          const body = JSON.parse(message.Body);
          console.log("la categorie", body.data.category);
          addCategory(body.data.category);
        }
      });
    }

    i++;
    console.log(i);
  }

  useEffect(function appRunTimer() {
    // Creates a new timer when mount the component.

    const timer = setInterval(() => {
      receive();
    }, 5000);
    // Stops the old timer when umount the component.
    return function stopTimer() {
      clearInterval(timer);
    };
  }, []);

  /*
  const app = Consumer.create({
    queueUrl: configData.QueueUrl,
    handleMessage: async (message) => {
      let category = JSON.parse(message.Body).data.category;
      test(category);
      app.deleteMessage(message);

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
  */

  dataSqs.dTotalGroceries = totalGroceries;
  dataSqs.dTotalOthers = totalOthers;
  dataSqs.dTotal = total;
  return (
    <>
      {console.log("dataSqs", dataSqs)}
      <div style={{ textAlign: "center" }}>
        <h1>HEATMAP </h1>
        <form>IMPORT SQS</form>

        <br />
      </div>

      <Scatterplot data={dataSqs} width={400} height={400} />
    </>
  );
}

export default Sqs;
