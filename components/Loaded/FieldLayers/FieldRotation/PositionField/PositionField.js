import React, { Component } from "react";
import PropTypes from "prop-types";
import { Asset } from "expo-asset";
import {
  getNewPosition,
  checkIfEnemyHasReachedHeading,
  getNewEnemyData
} from "../../../../../helpers/enemiesLogic";
import { Animated } from "react-native";
import Enemy from "./Enemy/Enemy";

const powerUp = Asset.fromModule(
  require("../../../../../assets/sounds/powerUp.wav")
);

class PositionField extends Component {
  state = {
    animatedFieldPositionX: new Animated.Value(0),
    animatedFieldPositionY: new Animated.Value(0)
  };

  componentDidMount() {
    this.createEnemy();

    this.intervalId = setInterval(() => {
      this.animateEnemies();
    }, 100);
  }

  componentDidUpdate(prevProps) {
    const { playerIsDead, playerPosition, enemies, fieldPosition } = prevProps;

    if (enemies.length > 0 && this.props.enemies.length < 1) {
      this.startCreateEnemyTimeout();
    }

    if (playerIsDead && !this.props.playerIsDead) {
      this.handlePlayerRespawn();
    }

    if (
      playerPosition[0] !== this.props.playerPosition[0] ||
      playerPosition[1] !== this.props.playerPosition[1]
    ) {
      this.handleUpdatedPlayerPosition(playerPosition);
    }

    if (
      fieldPosition[0] !== this.props.fieldPosition[0] ||
      fieldPosition[1] !== this.props.fieldPosition[1]
    ) {
      this.handleFieldPositionUpdate();
    }
  }

  handleUpdatedPlayerPosition = playerPosition => {
    const movementX = this.props.playerPosition[0] - playerPosition[0];
    const movementY = this.props.playerPosition[1] - playerPosition[1];
    this.props.updateFieldPosition(movementX, movementY);
  };

  handleFieldPositionUpdate = () => {
    const { fieldPosition } = this.props;
    this.moveFieldPositionX(fieldPosition[0]);
    this.moveFieldPositionY(fieldPosition[1]);
  };

  moveFieldPositionX = moveTo => {
    const { animatedFieldPositionX } = this.state;

    Animated.timing(animatedFieldPositionX, {
      toValue: moveTo,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  moveFieldPositionY = moveTo => {
    const { animatedFieldPositionY } = this.state;

    Animated.timing(animatedFieldPositionY, {
      toValue: -moveTo,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

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
    const { layoutWidth } = this.props;
    const newEnemies = [getNewEnemyData()];
    this.props.updateEnemies(newEnemies);
    this.props.updatePlayerPosition([layoutWidth / 2, layoutWidth / 2]);
  };

  startCreateEnemyTimeout = () => {
    const createEnemyTimeout = setTimeout(() => {
      this.createEnemy();
      clearTimeout(createEnemyTimeout);
    }, 15000);
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
      enemies,
      layoutWidth,
      updateEnemies,
      handleEnemyCollision,
      playerIsDead,
      fieldPosition
    } = this.props;
    const { animatedFieldPositionX, animatedFieldPositionY } = this.state;
    return (
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: layoutWidth,
          width: layoutWidth,
          transform: [
            {
              translateX: animatedFieldPositionX
            },
            {
              translateY: animatedFieldPositionY
            }
          ]
        }}
      >
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
              fieldPosition={fieldPosition}
              layoutWidth={layoutWidth}
            />
          );
        })}
      </Animated.View>
    );
  }
}

PositionField.propTypes = {
  playerPosition: PropTypes.array.isRequired,
  layoutWidth: PropTypes.number.isRequired,
  updatePlayerPosition: PropTypes.func.isRequired,
  enemies: PropTypes.array.isRequired,
  updateEnemies: PropTypes.func.isRequired,
  handleEnemyCollision: PropTypes.func.isRequired,
  playerIsDead: PropTypes.bool.isRequired,
  playSound: PropTypes.func.isRequired,
  increaseKarma: PropTypes.func.isRequired,
  updateFieldPosition: PropTypes.func.isRequired,
  fieldPosition: PropTypes.array.isRequired
};

export default PositionField;
