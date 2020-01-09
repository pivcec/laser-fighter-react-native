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

  removeEnemy = id => {
    this.setState(prevState => ({
      enemies: prevState.enemies.filter(enemy => enemy.id !== id)
    }));
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

  render() {
    const { enemies } = this.state;
    const {
      layoutWidth,
      heading,
      coords,
      laserCharge,
      playerLaserIsFiring,
      playSound
    } = this.props;

    return (
      <View>
        <Grid layoutWidth={layoutWidth} />

        <PlayerLaser
          layoutWidth={layoutWidth}
          playerLaserIsFiring={playerLaserIsFiring}
          heading={heading}
          laserCharge={laserCharge}
          updateEnemy={this.updateEnemy}
          playSound={playSound}
          enemies={enemies}
        />

        <FieldRotation
          heading={heading}
          layoutWidth={layoutWidth}
          enemies={enemies}
          updateEnemies={this.updateEnemies}
          removeEnemy={this.removeEnemy}
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
