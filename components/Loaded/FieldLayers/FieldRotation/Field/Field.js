import React, { Component } from "react";
import PropTypes from "prop-types";
import { Asset } from "expo-asset";
import { View } from "react-native";
import {
  getNewPosition,
  checkIfEnemyHasReachedHeading,
  getNewEnemyData,
  getUpdatedEnemyPositions
} from "../../../../../helpers/enemiesLogic";
import Enemy from "./Enemy/Enemy";
import MazeZone from "./MazeZone/MazeZone";

const powerUp = Asset.fromModule(
  require("../../../../../assets/sounds/powerUp.wav")
);

class Field extends Component {
  componentDidMount() {
    // this.createEnemy();

    this.intervalId = setInterval(() => {
      this.animateEnemies();
    }, 100);
  }

  componentDidUpdate(prevProps) {
    const { playerIsDead, playerPosition } = prevProps;

    if (this.props.enemies.length < 1) {
      // this.createEnemy();
    }

    if (playerIsDead && !this.props.playerIsDead) {
      this.handlePlayerRespawn();
    }

    if (
      playerPosition[0] !== this.props.playerPosition[0] ||
      playerPosition[1] !== this.props.playerPosition[1]
    ) {
      const updatedEnemies = getUpdatedEnemyPositions(
        this.props.enemies,
        playerPosition,
        this.props.playerPosition
      );
      this.props.updateEnemies(updatedEnemies);
    }
  }

  animateEnemies = () => {
    const { enemies } = this.props;
    if (enemies.length > 0) {
      const updatedEnemies = enemies.map(({ position, id, heading, life }) => {
        return {
          position: [
            getNewPosition(position[0], heading[0]),
            getNewPosition(position[1], heading[1])
          ],
          id,
          heading: checkIfEnemyHasReachedHeading(position, heading),
          life
        };
      });
      this.props.updateEnemies(updatedEnemies);
    }
  };

  handlePlayerRespawn = () => {
    const newEnemies = [getNewEnemyData(), getNewEnemyData()];
    this.props.updateEnemies(newEnemies);
    this.props.updatePlayerPosition([50, 50]);
  };

  createEnemy = () => {
    const { enemies } = this.props;
    const newEnemy = getNewEnemyData();
    this.props.updateEnemies([...enemies, newEnemy]);
  };

  removeEnemy = id => {
    const { enemies } = this.props;
    this.props.playSound(powerUp);
    this.props.increaseKarma();
    const newEnemies = enemies.filter(enemy => enemy.id !== id);
    this.props.updateEnemies(newEnemies);
  };

  render() {
    const {
      playerPosition,
      enemies,
      layoutWidth,
      updateEnemies,
      handleEnemyCollision,
      playerIsDead
      // heading,
    } = this.props;

    return (
      <View
        style={{
          height: layoutWidth,
          width: layoutWidth
        }}
      >
        <MazeZone playerPosition={playerPosition} layoutWidth={layoutWidth} />

        {enemies.map(({ position, id, life }) => {
          return (
            <Enemy
              key={id}
              position={position}
              id={id}
              enemyIsDead={life < 1}
              updateEnemies={updateEnemies}
              removeEnemy={this.removeEnemy}
              handleEnemyCollision={handleEnemyCollision}
              playerIsDead={playerIsDead}
              playerPosition={playerPosition}
            />
          );
        })}
      </View>
    );
  }
}

Field.propTypes = {
  layoutWidth: PropTypes.number.isRequired,
  playerPosition: PropTypes.array.isRequired,
  updatePlayerPosition: PropTypes.func.isRequired,
  enemies: PropTypes.array.isRequired,
  updateEnemies: PropTypes.func.isRequired,
  handleEnemyCollision: PropTypes.func.isRequired,
  playerIsDead: PropTypes.bool.isRequired,
  playSound: PropTypes.func.isRequired,
  // heading: PropTypes.number.isRequired,
  increaseKarma: PropTypes.func.isRequired
};

export default Field;
