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
import { handleGetUpdatedPlayerPosition } from "../../../../../helpers/playerLogic";
import Enemy from "./Enemy/Enemy";
// import PositionChiToken from "./PositionChiToken/PositionChiToken";

const powerUp = Asset.fromModule(
  require("../../../../../assets/sounds/powerUp.wav")
);

class Field extends Component {
  state = {
    playerPosition: [50, 50],
    chiToken: null
  };

  componentDidMount() {
    this.createEnemy();
    this.createEnemy();

    this.intervalId = setInterval(() => {
      this.animateEnemies();
    }, 100);
  }

  componentDidUpdate(prevProps, prevState) {
    const { playerIsDead, coords } = prevProps;
    const { playerPosition } = prevState;

    if (JSON.stringify(coords) !== JSON.stringify(this.props.coords)) {
      const updatedPlayerPosition = handleGetUpdatedPlayerPosition(
        coords,
        this.props.coords,
        this.state.playerPosition
      );
      this.setState({ playerPosition: updatedPlayerPosition });
    }

    if (this.props.enemies.length === 1) {
      this.createEnemy();
    }

    if (playerIsDead && !this.props.playerIsDead) {
      this.handlePlayerRespawn();
    }

    if (
      JSON.stringify(playerPosition) !==
      JSON.stringify(this.state.playerPosition)
    ) {
      const updatedEnemies = getUpdatedEnemyPositions(
        this.props.enemies,
        playerPosition,
        this.state.playerPosition
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
    this.updateChiToken(null);
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

  updateChiToken = newChiToken => {
    this.setState({ chiToken: newChiToken });
  };

  render() {
    const { playerPosition, chiToken } = this.state;
    const {
      enemies,
      layoutWidth,
      updateEnemies,
      handleEnemyCollision,
      playerIsDead,
      heading,
      handleChiTokenCollision
    } = this.props;

    return (
      <View
        style={{
          height: layoutWidth,
          width: layoutWidth
        }}
      >
        {/*
        {chiToken && (
          <PositionChiToken
            chiToken={chiToken}
            heading={heading}
            playerPosition={playerPosition}
            updateChiToken={this.updateChiToken}
            handleChiTokenCollision={handleChiTokenCollision}
          />
        )}
        */}
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
              chiToken={chiToken}
              updateChiToken={this.updateChiToken}
              handlePlayerRespawn={handleChiTokenCollision}
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
  enemies: PropTypes.array.isRequired,
  updateEnemies: PropTypes.func.isRequired,
  handleEnemyCollision: PropTypes.func.isRequired,
  playerIsDead: PropTypes.bool.isRequired,
  playSound: PropTypes.func.isRequired,
  increaseKarma: PropTypes.func.isRequired,
  heading: PropTypes.number.isRequired,
  coords: PropTypes.object.isRequired,
  handleChiTokenCollision: PropTypes.func.isRequired
};

export default Field;
