import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Grid from "./Grid/Grid";
import PlayerLaser from "./PlayerLaser/PlayerLaser";
import FieldRotation from "./FieldRotation/FieldRotation";

export default Overlay = props => {
  const {
    layoutWidth,
    gridLines,
    heading,
    enemyLasers,
    playerLaserIsFiring
  } = props;

  return (
    <View>
      <Grid layoutWidth={layoutWidth} gridLines={gridLines} />

      <PlayerLaser
        layoutWidth={layoutWidth}
        playerLaserIsFiring={playerLaserIsFiring}
        heading={heading}
        handleLaserFire={props.handleLaserFire}
      />

      <FieldRotation
        heading={heading}
        layoutWidth={layoutWidth}
        enemyLasers={enemyLasers}
      />
    </View>
  );
};

Overlay.propTypes = {
  layoutWidth: PropTypes.number.isRequired,
  gridLines: PropTypes.array.isRequired,
  heading: PropTypes.number.isRequired,
  enemyLasers: PropTypes.array.isRequired,
  playerLaserIsFiring: PropTypes.bool.isRequired,
  handleLaserFire: PropTypes.func.isRequired
};
