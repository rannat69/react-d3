import * as d3 from "d3";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Tooltip } from "./Tooltip";
import { useState, useEffect } from "react";

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

export const Scatterplot = ({ width, height, data }) => {
  useEffect(() => {console.log("Scatter effect", data)}, [data]);

  const [hovered, setHovered] = useState(null);
  // Layout. The div size is set by the given props.
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Scales
  const yScale = d3
    .scaleLinear()
    .domain([-73.8, -73.82])
    .range([boundsHeight, 0]);
  const xScale = d3
    .scaleLinear()
    .domain([41.03, 41.04])
    .range([0, boundsWidth]);

  //console.log("data", data);

  // Build the shapes

  const allShapes = data.map((d, i) => {
    var color = "#000000";
    if (d.product === "Toto") {
      color = "#FF0000";
    }
    if (d.product === "Tata") {
      color = "#00FF00";
    }
    if (d.product === "Titi") {
      color = "#0000FF";
    }

    if (data.length > 0 && d.x != null && d.y != null) {
      return (
        <circle
          key={i}
          r={13}
          cx={xScale(d.x)}
          cy={yScale(d.y)}
          opacity={1}
          stroke={color}
          fill={color}
          fillOpacity={0.2}
          strokeWidth={1}
          onMouseEnter={() =>
            setHovered({
              xPos: xScale(d.x) + 200,
              yPos: yScale(d.y) + 200,
              name: d.product,
              xdesc: d.x,
              ydesc: d.y,
            })
          }
          onMouseLeave={() => setHovered(null)}
        />
      );
    }
  });

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
          {allShapes}

          <rect
            width="25"
            height="25"
            x={xScale(20)}
            y={yScale(20)}
            stroke="blue"
            fill="cyan"
          ></rect>
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
      >X
        <Tooltip interactionData={hovered} />
      </div>
    </div>
  );
};

export default Scatterplot;
