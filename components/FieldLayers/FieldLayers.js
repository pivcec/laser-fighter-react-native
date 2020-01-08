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
    enemies: []
  };

  createEnemy = newEnemy => {
    this.setState(prevState => ({ enemies: [...prevState.enemies, newEnemy] }));
  };

  updateEnemy = updatedEnemy => {
    this.setState(prevState => ({
      enemies: prevState.enemies.map(enemy =>
        enemy.id === updatedEnemy.id ? updatedEnemy : enemy
      )
    }));
  };

  updateEnemies = updatedEnemies => {
    this.setState({ enemies: updatedEnemies });
  };

  handleLaserCollision = ({ id }) => {
    const { laserCharge } = this.props;
    const { enemies } = this.state;
    const enemyHitByLaser = enemies.find(enemy => enemy.id === id);

    const updatedEnemy = {
      ...enemyHitByLaser,
      life: enemyHitByLaser.life - laserCharge
    };

    this.updateEnemy(updatedEnemy);
    this.props.playSound(buzz);
  };

  render() {
    const { enemies } = this.state;
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
          enemies={enemies}
          updateEnemies={this.updateEnemies}
        />

        <EnemiesLogic
          createEnemy={this.createEnemy}
          updateEnemies={this.updateEnemies}
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
