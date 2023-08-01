import * as d3 from "d3";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Tooltip } from "./Tooltip";
import { useState, useEffect } from "react";

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

export const Scatterplot = ({ width, height, data }) => {
  useEffect(() => {
    console.log("Scatter effect", data);
  }, [data]);

  const [hovered, setHovered] = useState(null);
  // Layout. The div size is set by the given props.
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  function calcHeat(heat) {
    heat = heat * 20;

    var R = heat;
    var G = Math.floor(255 - 255 * (Math.abs(R - 128) / 128));
    var B = 255 - R;

    return "rgb(" + [R, G, B].join(",") + ")";
  }

  // Scales
  const xScale = d3
    .scaleLinear()
    .domain([-73.8, -73.82])
    .range([0, boundsWidth]);
  const yScale = d3
    .scaleLinear()
    .domain([41.03, 41.06])
    .range([boundsHeight, 0]);

  //console.log("data", data);

  // Build the shapes

  return (
    <div>
      <svg width={width} height={height}>
        {/* first group is for the violin and box shapes */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {/* Y axis */}
          {/*<AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />*/}

          {/* X axis, use an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            {/*<AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              height={boundsHeight}
          />*/}
          </g>

          {/* Circles */}
          {/*allShapes*/}

          <rect
            x={xScale(-73.81)}
            y={yScale(41.055)}
            width="100"
            height="100"
            rx="15"
            opacity={1}
            stroke="#000000"
            fill={calcHeat(data.dTotalGroceries)}
            fillOpacity={1}
            strokeWidth={1}
            onMouseEnter={() =>
              setHovered({
                xPos: xScale(-73.81) + 200,
                yPos: yScale(41.055) + 200,
                name: "Groceries",
                number: data.dTotalGroceries,
              })
            }
            onMouseLeave={() => setHovered(null)}
          />

          <text
            x={xScale(-73.81)}
            y={yScale(41.055) + 50}
            font-family="Verdana"
            font-size="15"
            fill="black"
          >
            Groceries
          </text>

          <rect
            x={xScale(-73.814)}
            y={yScale(41.04)}
            width="100"
            height="100"
            rx="15"
            opacity={1}
            stroke="#000000"
            fill={calcHeat(data.dTotalSnacks)}
            // If more scans, becomes green, else red
            // data.dTotalGroceries < data.dTotalOthers ? "#00FF00" : "#FF0000"

            // Todo : if no scans, grey
            // data.dTotal == 0 ? "#AAAAAA"

            // Todo : blue is cold, red is hot

            fillOpacity={1}
            strokeWidth={1}
            onMouseEnter={() =>
              setHovered({
                xPos: xScale(-73.814) + 200,
                yPos: yScale(41.04) + 200,
                name: "Snacks",
                number: data.dTotalSnacks,
              })
            }
            onMouseLeave={() => setHovered(null)}
          />

          <text
            x={xScale(-73.814)}
            y={yScale(41.04) + 50}
            font-family="Verdana"
            font-size="15"
            fill="black"
          >
            Snacks
          </text>

          <rect
            x={xScale(-73.803)}
            y={yScale(41.045)}
            width="100"
            height="100"
            rx="15"
            opacity={1}
            stroke="#000000"
            fill={calcHeat(data.dTotalBreakfast)}
            // If more scans, becomes green, else red
            // data.dTotalGroceries < data.dTotalOthers ? "#00FF00" : "#FF0000"

            // Todo : if no scans, grey
            // data.dTotal == 0 ? "#AAAAAA"

            // Todo : blue is cold, red is hot

            fillOpacity={1}
            strokeWidth={1}
            onMouseEnter={() =>
              setHovered({
                xPos: xScale(-73.803) + 200,
                yPos: yScale(41.045) + 200,
                name: "Breakfast",
                number: data.dTotalBreakfast,
              })
            }
            onMouseLeave={() => setHovered(null)}
          />

          <text
            x={xScale(-73.803)}
            y={yScale(41.045) + 50}
            font-family="Verdana"
            font-size="15"
            fill="black"
          >
            Breakfast
          </text>
        </g>
      </svg>

      <div
        style={{
          width: boundsWidth,
          height: boundsHeight,
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          marginLeft: MARGIN.left,
          marginTop: MARGIN.top,
        }}
      >
        <Tooltip interactionData={hovered} />
      </div>
    </div>
  );
};

export default Scatterplot;
