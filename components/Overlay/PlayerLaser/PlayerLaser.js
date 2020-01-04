import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Svg, { Line } from "react-native-svg";
import { vh, vw } from "react-native-expo-viewport-units";
import { getRotatedPlayerCoords } from "../../../helpers/getRotatedPlayerCoords";
import { playerWidthAndHeight } from "../../../constants/constants";

const playerPositionOffset = playerWidthAndHeight / 2;

export default class PlayerLaser extends Component {
  state = {
    firstPlayerWithinPathOfLaser: null
  };

  componentDidUpdate(prevProps) {
    const { playerLaserIsFiring } = prevProps;
    const { enemies, heading } = this.props;

    if (!playerLaserIsFiring && this.props.playerLaserIsFiring) {
      const rotatedPlayerCoords = getRotatedPlayerCoords(heading, enemies);
      const playersWithinPathOfLaser = this.getPlayersWithinPathOfLaser(
        rotatedPlayerCoords
      );
      const firstPlayerWithinPathOfLaser =
        playersWithinPathOfLaser.length > 0
          ? this.getFirstPlayerWithinPathOfLaser(playersWithinPathOfLaser)
          : null;

      this.setState({
        firstPlayerWithinPathOfLaser
      });

      this.props.handleLaserCollision(firstPlayerWithinPathOfLaser);
    }

    if (playerLaserIsFiring && !this.props.playerLaserIsFiring) {
      this.setState({
        firstPlayerWithinPathOfLaser: null
      });
    }
  }

  getFirstPlayerWithinPathOfLaser = playersWithinPathOfLaser => {
    return playersWithinPathOfLaser.reduce((acc, player) => {
      if (acc.hasOwnProperty("coords")) {
        if (player.coords[1] > acc.coords[1]) {
          return player;
        }
        return acc;
      }
      return player;
    }, {});
  };

  getPlayersWithinPathOfLaser = rotatedPlayerCoords => {
    return rotatedPlayerCoords.reduce((acc, player) => {
      if (this.checkIfPlayerIsWithinPathOfLaser(player)) {
        acc.push(player);
      }
      return acc;
    }, []);
  };

  checkIfPlayerIsWithinPathOfLaser = player => {
    const { coords } = player;
    const x = coords[0];
    const y = coords[1];

    const leftEdge = x - playerPositionOffset;
    const rightEdge = x + playerPositionOffset;
    const topEdge = y - playerPositionOffset;

    if (topEdge < 50 && leftEdge <= 50 && rightEdge >= 50) {
      return true;
    }
    return false;
  };

  render() {
    const { layoutWidth, playerLaserIsFiring } = this.props;
    const { firstPlayerWithinPathOfLaser } = this.state;
    const y2 = firstPlayerWithinPathOfLaser
      ? firstPlayerWithinPathOfLaser.coords[1]
      : 0;
    return (
      <View style={styles.playerLaser}>
        <Svg height={layoutWidth} width={layoutWidth}>
          {playerLaserIsFiring && (
            <Line
              x1="50%"
              y1="50%"
              x2="50%"
              y2={`${y2}%`}
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
  layoutWidth: PropTypes.number.isRequired,
  playerLaserIsFiring: PropTypes.bool.isRequired,
  heading: PropTypes.number.isRequired,
  handleLaserCollision: PropTypes.func.isRequired,
  enemies: PropTypes.array.isRequired
};
