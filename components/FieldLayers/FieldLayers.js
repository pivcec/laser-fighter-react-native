import React, { Component } from "react";
import PropTypes from "prop-types";
import { Asset } from "expo-asset";
import throttle from "lodash.throttle";
import Grid from "./Grid/Grid";
import Player from "./Player/Player";
import FieldRotation from "./FieldRotation/FieldRotation";
import EnemiesLogic from "./EnemiesLogic/EnemiesLogic";

const powerUp = Asset.fromModule(require("../../assets/sounds/powerUp.wav"));

class FieldLayers extends Component {
  state = {
    enemies: []
  };

  createEnemy = newEnemy => {
    this.setState(prevState => ({ enemies: [...prevState.enemies, newEnemy] }));
  };

  removeEnemy = id => {
    this.props.playSound(powerUp);
    this.props.increaseKarma();
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
      playerLaserCharge,
      playSound,
      handleEnemyCollision,
      chi,
      karma
    } = this.props;

    return (
      <>
        <Grid layoutWidth={layoutWidth} />

        <Player
          layoutWidth={layoutWidth}
          heading={heading}
          playerLaserCharge={playerLaserCharge}
          updateEnemy={this.updateEnemy}
          playSound={playSound}
          enemies={enemies}
          chi={chi}
          karma={karma}
        />

        <FieldRotation
          heading={heading}
          layoutWidth={layoutWidth}
          enemies={enemies}
          updateEnemies={this.updateEnemies}
          removeEnemy={this.removeEnemy}
          handleEnemyCollision={handleEnemyCollision}
        />

        <EnemiesLogic
          createEnemy={this.createEnemy}
          updateEnemies={this.updateEnemies}
          enemies={enemies}
        />
      </>
    );
  }
}

FieldLayers.propTypes = {
  layoutWidth: PropTypes.number.isRequired,
  heading: PropTypes.number.isRequired,
  playerLaserCharge: PropTypes.object.isRequired,
  playSound: PropTypes.func.isRequired,
  chi: PropTypes.number.isRequired,
  karma: PropTypes.number.isRequired,
  increaseKarma: PropTypes.func.isRequired,
  handleEnemyCollision: PropTypes.func.isRequired
};

export default FieldLayers;
