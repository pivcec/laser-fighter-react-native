import React from "react";
import Svg, { Line } from "react-native-svg";

const ChargerLines = () => {
  return (
    <Svg height={"100%"} width={"100%"}>
      {[...Array(51).keys()].map((el, i) => {
        return (
          <Line
            key={i}
            x1={`${i * 2}%`}
            y1="0%"
            x2={`${i * 2}%`}
            y2="100%"
            stroke="rgb(240,240,240, 0.2)"
            strokeWidth="1"
          />
        );
      })}
    </Svg>
  );
};

export default ChargerLines;
