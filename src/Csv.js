import React, { useState } from "react";
import Scatterplot from "./Scatter";
import Coordinates from "coordinate-parser";
export const dataCsv = [{}];

function Csv(props) {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };
  var index = 0;
  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(";");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(";");

      let convertedX, convertedY;
      // let toConvert = `${values[0]} ,  ${values[1]}`;
      // toConvert = '40°7\'22.8"N, 74°7\'22.8"W';
      // let position = new Coordinates(toConvert);

      try {
        // convertedX = position.getLongitude(); // -74.123 ✓
        // convertedY = position.getLatitude(); // 40.123 ✓
      } catch {
        /*we get here if the string is not valid coordinates or format is inconsistent between lat and long*/
      }

      let dataCsvTemp = {
        // Convert coords to decimal before passing to array

        x: values[0],
        y: values[1],
        product: values[2]
      };

      dataCsv[index] = dataCsvTemp;
      index++;
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];

        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>REACTJS CSV IMPORT EXAMPLE </h1>
        <form>
          <input
            type={"file"}
            id={"csvFileInput"}
            accept={".csv"}
            onChange={handleOnChange}
          />

          <button
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            IMPORT CSV
          </button>
        </form>

        <br />
      </div>

      <Scatterplot data={dataCsv} width={400} height={400} />
    </>
  );
}

export default Csv;
