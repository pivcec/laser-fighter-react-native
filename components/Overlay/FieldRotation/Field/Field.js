import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import { vh } from "react-native-expo-viewport-units";
import Svg, { Symbol, Circle, Use } from "react-native-svg";
import dummyData from "../../../../resources/dummyData";

const Field = props => {
  const { height, enemyLasers } = props;
  return (
    <View style={styles.container}>
      <Svg height={height} width={height}>
        <Symbol id="enemy" width="10" height="10">
          <Circle r="10" fill="red" />
        </Symbol>

        {dummyData.map((enemy, i) => {
          const { coords } = enemy;
          return (
            <Use
              href="#enemy"
              x={`${coords[0]}%`}
              y={`${coords[1]}%`}
              key={i}
            />
          );
        })}

        <Circle r="10" cx="50%" cy="50%" fill="blue" />

        {/*
          {enemyLasers.map((enemyLaser, i) => {
            const { x1, y1, x2, y2 } = enemyLaser;
            return (
              <Line
                key={i}
                href="#laser"
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="red"
                strokeWidth="2"
              />
            );
          })}
          */}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: vh(100),
    width: vh(100)
  },
  text: {
    color: "white"
  }
});

Field.propTypes = {
  height: PropTypes.number.isRequired,
  enemyLasers: PropTypes.array.isRequired
};

export default Field;
