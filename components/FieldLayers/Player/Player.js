import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { playerWidthAndHeight } from "../../../constants/constants";
import PlayerLaser from "./PlayerLaser/PlayerLaser";

const playerPositionOffset = playerWidthAndHeight / 2;

const getChiColor = chi => {
  if (chi >= 75) {
    return "white";
  }

  if (chi >= 50 && chi < 75) {
    return "yellow";
  }

  return "red";
};

const Player = ({
  layoutWidth,
  playerLaserIsFiring,
  heading,
  laserCharge,
  updateEnemy,
  playSound,
  enemies,
  chi,
  karma
}) => {
  const chiColor = getChiColor(chi);
  return (
    <>
      <Text
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          color: chiColor
        }}
      >{`Chi: ${chi}`}</Text>
      <Text style={styles.karma}>{`Karma: ${karma}`}</Text>
      <View
        style={{
          position: "absolute",
          top: `${50 - playerPositionOffset}%`,
          left: `${50 - playerPositionOffset}%`,
          width: `${playerWidthAndHeight}%`,
          height: `${playerWidthAndHeight}%`,
          borderRadius: 20,
          zIndex: 1
        }}
      >
        <Image
          source={require("../../../assets/images/yinyang.png")}
          style={styles.player}
        />
      </View>
      <PlayerLaser
        layoutWidth={layoutWidth}
        playerLaserIsFiring={playerLaserIsFiring}
        heading={heading}
        laserCharge={laserCharge}
        updateEnemy={updateEnemy}
        playSound={playSound}
        enemies={enemies}
      />
    </>
  );
};

const styles = StyleSheet.create({
  player: {
    width: "100%",
    height: "100%"
  },
  karma: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "white"
  }
});

Player.propTypes = {
  playerLaserIsFiring: PropTypes.bool.isRequired,
  heading: PropTypes.number.isRequired,
  updateEnemy: PropTypes.func.isRequired,
  laserCharge: PropTypes.number.isRequired,
  playSound: PropTypes.func.isRequired,
  enemies: PropTypes.array.isRequired,
  chi: PropTypes.number.isRequired,
  karma: PropTypes.number.isRequired
};

export default Player;
