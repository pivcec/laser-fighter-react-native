import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Svg, { Line } from "react-native-svg";
import { vh, vw } from "react-native-expo-viewport-units";

export default PlayerLaser = props => {
  const { width, height, playerLaserIsFiring } = props;
  return (
    <View style={styles.playerLaser}>
      <Svg height={height} width={width}>
        {playerLaserIsFiring && (
          <Line
            x1="50%"
            y1="50%"
            x2="50%"
            y2="0"
            stroke="red"
            strokeWidth="3"
          />
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  playerLaser: {
    position: "absolute",
    top: 0,
    width: vw(100),
    height: vh(100)
  }
});

PlayerLaser.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  playerLaserIsFiring: PropTypes.bool.isRequired
};
