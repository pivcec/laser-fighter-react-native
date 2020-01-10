import React, { Component } from "react";
import PropTypes from "prop-types";
import { Asset } from "expo-asset";
import throttle from "lodash.throttle";
import Grid from "./Grid/Grid";
import Player from "./Player/Player";
import FieldRotation from "./FieldRotation/FieldRotation";
import EnemiesLogic from "./EnemiesLogic/EnemiesLogic";

const playerPain = Asset.fromModule(
  require("../../assets/sounds/playerPain.wav")
);

const powerUp = Asset.fromModule(require("../../assets/sounds/powerUp.wav"));

class FieldLayers extends Component {
  state = {
    enemies: [],
    chi: 100,
    karma: 0
  };

  throttledPlaySound = throttle(this.props.playSound, 1000);

  createEnemy = newEnemy => {
    this.setState(prevState => ({ enemies: [...prevState.enemies, newEnemy] }));
  };

  removeEnemy = id => {
    this.props.playSound(powerUp);
    this.increaseKarma();
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

  increaseKarma = () => {
    this.setState(prevState => ({
      karma: prevState.karma + 1
    }));
  };

  handleEnemyCollision = () => {
    this.throttledPlaySound(playerPain);
    this.setState(prevState => ({
      chi: prevState.chi - 5
    }));
  };

  render() {
    const { enemies, chi, karma } = this.state;
    const {
      layoutWidth,
      heading,
      coords,
      playerLaserCharge,
      playSound
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
          handleEnemyCollision={this.handleEnemyCollision}
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
  playSound: PropTypes.func.isRequired
};

export default FieldLayers;
