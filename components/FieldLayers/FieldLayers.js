import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Asset } from "expo-asset";
import Grid from "./Grid/Grid";
import PlayerLaser from "./PlayerLaser/PlayerLaser";
import FieldRotation from "./FieldRotation/FieldRotation";
import EnemiesLogic from "./EnemiesLogic/EnemiesLogic";

const buzz = Asset.fromModule(require("../../assets/sounds/buzz.wav"));

class FieldLayers extends Component {
  state = {
    enemies: [],
    enemyLasers: []
  };

  createEnemy = newEnemy => {
    this.setState(prevState => ({ enemies: [...prevState.enemies, newEnemy] }));
  };

  updateEnemy = newEnemy => {
    this.setState({ enemies: [newEnemy] });
  };

  handleLaserCollision = playerHitByLaser => {
    const { enemies } = this.state;
    const { laserCharge } = this.props;
    const enemy = enemies[0];
    if (playerHitByLaser) {
      this.props.playSound(buzz);
      const newEnemy = {
        ...enemy,
        life: 0
      };
      this.updateEnemy(newEnemy);
    }
  };

  render() {
    const { enemies, enemyLasers } = this.state;
    const {
      layoutWidth,
      heading,
      coords,
      playerLaserIsFiring,
      laserCharge
    } = this.props;

    return (
      <View>
        <Grid layoutWidth={layoutWidth} />

        <PlayerLaser
          layoutWidth={layoutWidth}
          playerLaserIsFiring={playerLaserIsFiring}
          heading={heading}
          handleLaserCollision={this.handleLaserCollision}
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
  playerLaserIsFiring: PropTypes.bool.isRequired,
  laserCharge: PropTypes.number.isRequired,
  playSound: PropTypes.func.isRequired
};

export default FieldLayers;
