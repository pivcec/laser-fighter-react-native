import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  getNewEnemyData,
  getRandomNumberToLimit
} from "../../../../helpers/getNewEnemyData";

class EnemiesLogic extends Component {
  componentDidMount() {
    this.spawnEnemy();
    this.spawnEnemy();

    this.intervalId = setInterval(() => {
      this.animateEnemies();
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentDidUpdate(prevProps) {
    const { playerIsDead, playerPosition } = prevProps;
    if (this.props.enemies.length === 1) {
      this.spawnEnemy();
    }

    if (playerIsDead && !this.props.playerIsDead) {
      this.handlePlayerRespawn();
    }

    if (
      JSON.stringify(playerPosition) !==
      JSON.stringify(this.props.playerPosition)
    ) {
      this.handleUpdateAllEntityPositions(
        playerPosition,
        this.props.playerPosition
      );
    }
  }

  handleUpdateAllEntityPositions = (prevPlayerPosition, newPlayerPosition) => {
    const { enemies } = this.props;
    const playerMovementX = prevPlayerPosition[0] + -newPlayerPosition[0];
    const playerMovementY = prevPlayerPosition[1] + -newPlayerPosition[1];
    const updatedEnemies = enemies.map(({ position, id, heading, life }) => {
      return {
        position: [
          position[0] + playerMovementX,
          position[1] + playerMovementY
        ],
        id,
        heading,
        life
      };
    });
    this.props.updateEnemies(updatedEnemies);
  };

  animateEnemies = () => {
    const { enemies } = this.props;
    if (enemies.length > 0) {
      const updatedEnemies = enemies.map(({ position, id, heading, life }) => {
        return {
          position: [
            this.getNewPosition(position[0], heading[0]),
            this.getNewPosition(position[1], heading[1])
          ],
          id,
          heading: this.checkIfEnemyHasReachedHeading(position, heading),
          life
        };
      });
      this.props.updateEnemies(updatedEnemies);
    }
  };

  getNewPosition = (position, nextPosition) => {
    if (position > nextPosition) {
      return position - 1;
    }

    if (position < nextPosition) {
      return position + 1;
    }

    return position;
  };

  checkIfEnemyHasReachedHeading = (position, heading) => {
    if (
      Math.round(position[0]) === heading[0] &&
      Math.round(position[1]) === heading[1]
    ) {
      return [getRandomNumberToLimit(100), getRandomNumberToLimit(100)];
    }
    return heading;
  };

  handlePlayerRespawn = () => {
    const newEnemies = [];
    this.props.updateEnemies(newEnemies);
    this.spawnEnemy();
    this.spawnEnemy();
  };

  spawnEnemy = () => {
    const newEnemy = getNewEnemyData();
    this.props.createEnemy(newEnemy);
  };

  render() {
    return null;
  }
}

EnemiesLogic.propTypes = {
  updateEnemies: PropTypes.func.isRequired,
  createEnemy: PropTypes.func.isRequired,
  enemies: PropTypes.array.isRequired,
  playerIsDead: PropTypes.bool.isRequired,
  playerPosition: PropTypes.array.isRequired
};

export default EnemiesLogic;
