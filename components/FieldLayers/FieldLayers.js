import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Grid from "./Grid/Grid";
import PlayerLaser from "./PlayerLaser/PlayerLaser";
import FieldRotation from "./FieldRotation/FieldRotation";
import EnemiesLogic from "./EnemiesLogic/EnemiesLogic";

class FieldLayers extends Component {
  state = {
    enemies: []
  };

  createEnemy = newEnemy => {
    this.setState(prevState => ({ enemies: [...prevState.enemies, newEnemy] }));
  };

  updateEnemy = newEnemy => {
    this.setState({ enemies: [newEnemy] });
  };

  render() {
    const { enemies, enemyRefs } = this.state;
    const {
      layoutWidth,
      heading,
      coords,
      enemyLasers,
      playerLaserIsFiring,
      handleLaserCollision
    } = this.props;

    return (
      <View>
        <Grid layoutWidth={layoutWidth} />

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

        <EnemiesLogic
          createEnemy={this.createEnemy}
          updateEnemy={this.updateEnemy}
          enemies={enemies}
        />
      </View>
    );
  }
}

FieldLayers.propTypes = {
  layoutWidth: PropTypes.number.isRequired,
  heading: PropTypes.number.isRequired,
  enemyLasers: PropTypes.array.isRequired,
  playerLaserIsFiring: PropTypes.bool.isRequired,
  handleLaserCollision: PropTypes.func.isRequired
};

export default FieldLayers;
