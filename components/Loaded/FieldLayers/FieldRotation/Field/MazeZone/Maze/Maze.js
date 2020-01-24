import React, { memo } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Row from "./Row/Row";

const Maze = memo(({ mazeData, layoutWidth }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 1
      }}
    >
      {mazeData.map((row, i) => (
        <Row row={row} key={i} layoutWidth={layoutWidth} />
      ))}
    </View>
  );
});

export default Maze;

Maze.propTypes = {
  mazeData: PropTypes.array.isRequired,
  layoutWidth: PropTypes.number.isRequired
};
