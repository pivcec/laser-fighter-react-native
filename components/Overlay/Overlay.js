import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Grid from "./Grid/Grid";
import PlayerLaser from "./PlayerLaser/PlayerLaser";
import FieldRotation from "./FieldRotation/FieldRotation";

class Overlay extends Component {
  state = {
    enemies: []
  };

  componentDidMount() {
    this.spawnEnemy();
  }

  listenForPlayerMovement = () => {
    // spawn enemy after X amount of movement
  };

  spawnEnemy = () => {
    const newEnemy = {
      coords: [10, 35],
      id: 1234
    };
    this.setState(prevState => ({ enemies: [...prevState.enemies, newEnemy] }));
  };

  render() {
    const { enemies } = this.state;
    const {
      layoutWidth,
      gridLines,
      heading,
      coords,
      enemyLasers,
      playerLaserIsFiring,
      handleLaserCollision
    } = this.props;

    return (
      <View>
        <Grid layoutWidth={layoutWidth} gridLines={gridLines} />

        <PlayerLaser
          layoutWidth={layoutWidth}
          playerLaserIsFiring={playerLaserIsFiring}
          heading={heading}
          handleLaserCollision={handleLaserCollision}
          enemies={enemies}
        />

        <FieldRotation
          heading={heading}
          layoutWidth={layoutWidth}
          enemyLasers={enemyLasers}
          enemies={enemies}
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
  playerLaserIsFiring: PropTypes.bool.isRequired,
  handleLaserCollision: PropTypes.func.isRequired
};

export default Overlay;
