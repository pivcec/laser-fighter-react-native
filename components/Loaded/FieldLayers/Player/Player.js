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
      <View style={styles.container}>
        <View
          style={[
            styles.playerIconContainer,
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
            style={styles.playerIcon}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 4,
    height: "100%",
    width: "100%"
  },
  playerIconContainer: {
    position: "absolute",
    zIndex: 4
  },
  playerIcon: {
    width: "100%",
    height: "100%"
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
