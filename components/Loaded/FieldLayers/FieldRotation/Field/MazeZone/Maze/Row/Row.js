import React from "react";
import PropTypes from "prop-types";
import Cell from "./Cell/Cell";
import { View, Text } from "react-native";

const Row = ({ row, layoutWidth }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      {row.map((cell, i) => (
        <Cell cell={cell} key={i} layoutWidth={layoutWidth} />
      ))}
    </View>
  );
};

Row.propTypes = {
  row: PropTypes.array.isRequired,
  layoutWidth: PropTypes.number.isRequired
};

export default Row;
