import { useMemo } from "react";
import { ScaleLinear } from "d3";

// tick length
const TICK_LENGTH = 10;

export const AxisBottom = ({ xScale, pixelsPerTick, height }) => {
  const range = xScale.range();

  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [xScale]);

  return (
    <>
      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g
          key={value}
          transform={`translate(${xOffset}, 0)`}
          shapeRendering={"crispEdges"}
        >
          <line
            y1={TICK_LENGTH}
            y2={-height - TICK_LENGTH}
            stroke="#000000"
            strokeWidth={0.5}
          />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
              fill: "#000000",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};
