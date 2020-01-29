import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { playerWidthAndHeight } from "../../../../constants/constants";
import PlayerLaser from "./PlayerLaser/PlayerLaser";

const playerPositionOffset = playerWidthAndHeight / 2;

class Player extends Component {
  render() {
    const {
      layoutWidth,
      playerLaserCharge,
      heading,
      updateEnemy,
      playSound,
      enemies,
      offsetHeading
    } = this.props;
    return (
      <>
        <View
          style={[
            styles.container,
            {
              top: `${50 - playerPositionOffset}%`,
              left: `${50 - playerPositionOffset}%`,
              width: `${playerWidthAndHeight}%`,
              height: `${playerWidthAndHeight}%`
            }
          ]}
        >
          <Image
            source={require("../../../../assets/images/yinyang.png")}
            style={styles.player}
          />
        </View>
        <PlayerLaser
          layoutWidth={layoutWidth}
          playerLaserCharge={playerLaserCharge}
          heading={heading}
          offsetHeading={offsetHeading}
          updateEnemy={updateEnemy}
          playSound={playSound}
          enemies={enemies}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 4
  },
  player: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 4
  }
});

Player.propTypes = {
  playerLaserCharge: PropTypes.object.isRequired,
  heading: PropTypes.number.isRequired,
  updateEnemy: PropTypes.func.isRequired,
  playSound: PropTypes.func.isRequired,
  enemies: PropTypes.array.isRequired,
  offsetHeading: PropTypes.number.isRequired
};

export default Player;
