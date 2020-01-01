import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Svg, { Line } from "react-native-svg";
import { vh, vw } from "react-native-expo-viewport-units";

export default Grid = props => {
  const { width, height, gridLinesX, gridLinesY } = props;
  return (
    <View style={styles.grid}>
      <Svg height={height} width={width}>
        {gridLinesX.map(x => {
          return (
            <Line
              key={`grid-line-x-${x}`}
              x1={x}
              y1="0"
              x2={x}
              y2={height}
              stroke="green"
              strokeWidth="1"
            />
          );
        })}
        {gridLinesY.map(y => {
          return (
            <Line
              key={`grid-line-y-${y}`}
              x1="0"
              y1={y}
              x2={width}
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
    top: 0,
    width: vw(100),
    height: vh(100)
  }
});

Grid.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  gridLinesX: PropTypes.array.isRequired,
  gridLinesY: PropTypes.array.isRequired
};
