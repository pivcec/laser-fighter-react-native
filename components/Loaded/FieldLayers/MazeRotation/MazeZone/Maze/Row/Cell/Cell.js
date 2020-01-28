import React from "react";
import PropTypes from "prop-types";
import {
  hasLeftWall,
  hasRightWall,
  hasTopWall,
  hasBottomWall
} from "../../../../../../../../helpers/mazeLogic";
import { View } from "react-native";
import Svg, { Line } from "react-native-svg";

const Cell = ({ cell, layoutWidth }) => {
  const leftWall = hasLeftWall(cell);
  const rightWall = hasRightWall(cell);
  const topWall = hasTopWall(cell);
  const bottomWall = hasBottomWall(cell);
  const strokeWidth = 10;
  const cellWidthAndHeight = layoutWidth / 3;
  const mazeWallStyle = {
    stroke: "white",
    strokeWidth
  };
  return (
    <View style={{ width: cellWidthAndHeight, height: cellWidthAndHeight }}>
      <Svg
        overflow="visible"
        width={cellWidthAndHeight}
        height={cellWidthAndHeight}
      >
        {leftWall && (
          <Line
            x1={0}
            y1={-(strokeWidth / 2)}
            x2={0}
            y2={cellWidthAndHeight + strokeWidth / 2}
            style={mazeWallStyle}
          />
        )}
        {rightWall && (
          <Line
            x1={cellWidthAndHeight}
            y1={-(strokeWidth / 2)}
            x2={cellWidthAndHeight}
            y2={cellWidthAndHeight + strokeWidth / 2}
            style={mazeWallStyle}
          />
        )}
        {topWall && (
          <Line
            x1={-(strokeWidth / 2)}
            y1={0}
            x2={cellWidthAndHeight + strokeWidth / 2}
            y2={0}
            style={mazeWallStyle}
          />
        )}
        {bottomWall && (
          <Line
            x1={-(strokeWidth / 2)}
            y1={cellWidthAndHeight}
            x2={cellWidthAndHeight + strokeWidth / 2}
            y2={cellWidthAndHeight}
            style={mazeWallStyle}
          />
        )}
      </Svg>
    </View>
  );
};

Cell.propTypes = {
  cell: PropTypes.number.isRequired,
  layoutWidth: PropTypes.number.isRequired
};

export default Cell;
