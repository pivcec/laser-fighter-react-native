import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { vw, vh } from "react-native-expo-viewport-units";
import Grid from "./Grid/Grid";
import PlayerLaser from "./PlayerLaser/PlayerLaser";
import FieldRotation from "./FieldRotation/FieldRotation";

export default class Overlay extends Component {
  render() {
    const {
      layoutWidth,
      gridLines,
      heading,
      enemyLasers,
      playerLaserIsFiring
    } = this.props;

    return (
      <View style={{}}>
        <Grid layoutWidth={layoutWidth} gridLines={gridLines} />

        <PlayerLaser
          layoutWidth={layoutWidth}
          playerLaserIsFiring={playerLaserIsFiring}
          heading={heading}
        />

        <FieldRotation
          heading={heading}
          layoutWidth={layoutWidth}
          enemyLasers={enemyLasers}
        />
      </View>
    );
  }
}

Overlay.propTypes = {
  layoutWidth: PropTypes.number.isRequired,
  gridLines: PropTypes.array.isRequired,
  heading: PropTypes.number.isRequired,
  enemyLasers: PropTypes.array.isRequired,
  playerLaserIsFiring: PropTypes.bool.isRequired
};
