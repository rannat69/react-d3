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

  // Scales
  const xScale = d3
    .scaleLinear()
    .domain([-73.8, -73.82])
    .range([boundsWidth, 0]);
  const yScale = d3
    .scaleLinear()
    .domain([41.03, 41.06])
    .range([0, boundsHeight]);

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
          <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />

          {/* X axis, use an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              height={boundsHeight}
            />
          </g>

          {/* Circles */}
          {/*allShapes*/}

          <rect
            x={xScale(-73.81)}
            y={yScale(41.035)}
            width="100"
            height="100"
            rx="15"
            opacity={1}
            stroke="#000000"
            fill={
              data.dTotalGroceries > data.dTotalOthers ? "#00FF00" : "#FF0000"
            }
            fillOpacity={0.2}
            strokeWidth={1}
            onMouseEnter={() =>
              setHovered({
                xPos: xScale(-73.81) + 200,
                yPos: yScale(41.035) + 200,
                name: "Groceries",
                number: data.dTotalGroceries,
              })
            }
            onMouseLeave={() => setHovered(null)}
          />

          <text
            x={xScale(-73.81)}
            y={yScale(41.035) + 50} 
            font-family="Verdana"
            font-size="15"
            fill="black"
          >
            Groceries
          </text>

          <rect
            x={xScale(-73.819)}
            y={yScale(41.032)}
            width="100"
            height="100"
            rx="15"
            opacity={1}
            stroke="#000000"
            fill={
              data.dTotalGroceries < data.dTotalOthers ? "#00FF00" : "#FF0000"
            }
            fillOpacity={0.2}
            strokeWidth={1}
            onMouseEnter={() =>
              setHovered({
                xPos: xScale(-73.819) + 200,
                yPos: yScale(41.032) + 200,
                name: "Other food",
                number: data.dTotalOthers,
              })
            }
            onMouseLeave={() => setHovered(null)}
          />

          <text
            x={xScale(-73.819)}
            y={yScale(41.032) + 50} 
            font-family="Verdana"
            font-size="15"
            fill="black"
          >
            Other food
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
        X
        <Tooltip interactionData={hovered} />
      </div>
    </div>
  );
};

export default Scatterplot;
