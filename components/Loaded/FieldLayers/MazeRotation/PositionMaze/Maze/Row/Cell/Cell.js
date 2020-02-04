import React from "react";
import PropTypes from "prop-types";
import {
  hasWestWall,
  hasEastWall,
  hasNorthWall,
  hasSouthWall
} from "../../../../../../../../helpers/mazeLogic";
import { View } from "react-native";
import Svg, { Line } from "react-native-svg";

const Cell = ({ cell, layoutWidth }) => {
  const westWall = hasWestWall(cell);
  const eastWall = hasEastWall(cell);
  const northWall = hasNorthWall(cell);
  const southWall = hasSouthWall(cell);
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
        {westWall && (
          <Line
            x1={0}
            y1={-(strokeWidth / 2)}
            x2={0}
            y2={cellWidthAndHeight + strokeWidth / 2}
            style={mazeWallStyle}
          />
        )}
        {eastWall && (
          <Line
            x1={cellWidthAndHeight}
            y1={-(strokeWidth / 2)}
            x2={cellWidthAndHeight}
            y2={cellWidthAndHeight + strokeWidth / 2}
            style={mazeWallStyle}
          />
        )}
        {northWall && (
          <Line
            x1={-(strokeWidth / 2)}
            y1={0}
            x2={cellWidthAndHeight + strokeWidth / 2}
            y2={0}
            style={mazeWallStyle}
          />
        )}
        {southWall && (
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
