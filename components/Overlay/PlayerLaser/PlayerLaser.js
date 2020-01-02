import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Svg, { Line } from "react-native-svg";
import { vh, vw } from "react-native-expo-viewport-units";
import { getRotatedPlayerCoords } from "../../../helpers/getRotatedPlayerCoords";
import dummyData from "../../../resources/dummyData";

export default class PlayerLaser extends Component {
  state = {
    firstPlayerWithinPathOfLaser: {}
  };

  componentDidUpdate(prevProps) {
    const { playerLaserIsFiring } = prevProps;
    const { heading } = this.props;

    if (!playerLaserIsFiring && this.props.playerLaserIsFiring) {
      const rotatedPlayerCoords = getRotatedPlayerCoords(heading, dummyData);
      const firstPlayerWithinPathOfLaser = this.getFirstPlayerWithinPathOfLaser(
        rotatedPlayerCoords
      );
      this.setState({
        firstPlayerWithinPathOfLaser
      });
    }

    if (playerLaserIsFiring && !this.props.playerLaserIsFiring) {
      this.setState({
        firstPlayerWithinPathOfLaser: {}
      });
    }
  }

  getFirstPlayerWithinPathOfLaser = rotatedPlayerCoords => {
    return rotatedPlayerCoords
      .filter(this.checkIfPlayerIsWithinPathOfLaser)
      .reduce((acc, player) => {
        if (acc.player) {
          if (player.coords[1] < acc.player.coords[1]) {
            acc = player;
          }
        } else {
          acc = player;
        }
        return acc;
      }, {});
  };

  checkIfPlayerIsWithinPathOfLaser = player => {
    const { coords } = player;
    const x = coords[0];
    const y = coords[1];
    const leftEdge = x - 2.5;
    const rightEdge = x + 2.5;
    const topEdge = y + 2.5;

    if (topEdge <= 50 && leftEdge <= 50 && rightEdge >= 50) {
      return true;
    }
    return false;
  };

  render() {
    const { width, height, playerLaserIsFiring } = this.props;
    const { firstPlayerWithinPathOfLaser } = this.state;
    return (
      <View style={styles.playerLaser}>
        <Svg height={height} width={width}>
          {playerLaserIsFiring && (
            <Line
              x1="50%"
              y1="50%"
              x2="50%"
              y2={
                firstPlayerWithinPathOfLaser.hasOwnProperty("coords")
                  ? firstPlayerWithinPathOfLaser.coords[0]
                  : 0
              }
              stroke="red"
              strokeWidth="3"
            />
          )}
        </Svg>
      </View>
    );
  }
}

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
  playerLaserIsFiring: PropTypes.bool.isRequired,
  heading: PropTypes.number.isRequired
};
