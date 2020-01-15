import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  getMetersTraveled,
  getBearing,
  getDirectionKey,
  getNewPlayerPosition
} from "../../../helpers/coordsCalculations";
import { Asset } from "expo-asset";
import Grid from "./Grid/Grid";
import Player from "./Player/Player";
import FieldRotation from "./FieldRotation/FieldRotation";
import EntitiesLogic from "./EntitiesLogic/EntitiesLogic";

const powerUp = Asset.fromModule(require("../../../assets/sounds/powerUp.wav"));

class FieldLayers extends Component {
  state = {
    enemies: [],
    playerPosition: [50, 50]
  };

  componentDidUpdate(prevProps) {
    const { coords } = prevProps;

    if (JSON.stringify(coords) !== JSON.stringify(this.props.coords)) {
      this.handlePlayerCoordsUpdate(coords, this.props.coords);
    }
  }

  handlePlayerCoordsUpdate = (start, end) => {
    const { playerPosition } = this.state;

    const playerMovementDistanceX = getMetersTraveled(
      [start.longitude, start.latitude],
      [end.longitude, start.latitude]
    );

    const playerMovementDistanceY = getMetersTraveled(
      [start.longitude, start.latitude],
      [start.longitude, end.latitude]
    );

    const bearing = getBearing(
      [start.longitude, start.latitude],
      [end.longitude, end.latitude]
    );

    const directionKey = getDirectionKey(bearing);

    const newPlayerPosition = getNewPlayerPosition(
      playerPosition,
      [playerMovementDistanceX, playerMovementDistanceY],
      directionKey
    );

    this.setState({ playerPosition: newPlayerPosition });
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
    const { enemies, playerPosition } = this.state;
    const {
      layoutWidth,
      heading,
      coords,
      playerLaserCharge,
      playSound,
      handleEnemyCollision,
      chi,
      karma,
      playerIsDead
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
          playerIsDead={playerIsDead}
          playerPosition={playerPosition}
        />

        <EntitiesLogic
          createEnemy={this.createEnemy}
          updateEnemies={this.updateEnemies}
          enemies={enemies}
          playerIsDead={playerIsDead}
          playerPosition={playerPosition}
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
  handleEnemyCollision: PropTypes.func.isRequired,
  playerIsDead: PropTypes.bool.isRequired
};

export default FieldLayers;
