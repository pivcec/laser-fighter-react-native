import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Svg, { Line } from "react-native-svg";
import { vh, vw } from "react-native-expo-viewport-units";

export default Grid = props => {
  const { layoutWidth, gridLines } = props;
  return (
    <View style={styles.grid}>
      <Svg height={layoutWidth} width={layoutWidth}>
        {gridLines.map(x => {
          return (
            <Line
              key={`grid-line-x-${x}`}
              x1={x}
              y1="0"
              x2={x}
              y2={layoutWidth}
              stroke="green"
              strokeWidth="1"
            />
          );
        })}
        {gridLines.map(y => {
          return (
            <Line
              key={`grid-line-y-${y}`}
              x1="0"
              y1={y}
              x2={layoutWidth}
              y2={y}
              stroke="green"
              strokeWidth="1"
            />
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    position: "absolute",
    backgroundColor: "black",
    top: 0,
    width: vw(100),
    height: vh(100)
  }
});

Grid.propTypes = {
  layoutWidth: PropTypes.number.isRequired,
  gridLines: PropTypes.array.isRequired
};
