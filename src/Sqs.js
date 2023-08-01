import React, { useState, useEffect } from "react";
import Scatterplot from "./Scatter";

import breakfast from "./products/breakfast.js";
import groceries from "./products/groceries.js";
import snacks from "./products/snacks.js";

var total = 0;
var totalGroceries = 0;
var totalSnacks = 0;
var totalBreakfast = 0;
function Sqs() {
  var dataSqs = {
    dTotalGroceries: 0,
    dTotal: 0,
    dTotalBreakfast: 0,
    dTotalSnacks: 0,
  };

  const [reload, setReload] = useState(false);

  function addCategory(product) {
    // Check if prpoduct is in breakfast, snacks, or groceries
    if (breakfast.indexOf(product) > -1) {
      totalBreakfast++;
      total++;
    }

    if (groceries.indexOf(product) > -1) {
      totalGroceries++;
      total++;
    }

    if (snacks.indexOf(product) > -1) {
      totalSnacks++;
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
          console.log("le product", body.data.category);
          addCategory(body.data.category);
        }
      });
    }
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
  dataSqs.dTotalSnacks = totalSnacks;
  dataSqs.dTotalBreakfast = totalBreakfast;
  dataSqs.dTotal = total;
  return (
    <>
      {console.log("dataSqs", dataSqs)}
      <div style={{ textAlign: "center" }}>
        <h1>HEATMAP </h1>
        <form>IMPORT SQS</form>

        <br />
      </div>

      <Scatterplot data={dataSqs} width={700} height={400} />
    </>
  );
}

export default Sqs;
