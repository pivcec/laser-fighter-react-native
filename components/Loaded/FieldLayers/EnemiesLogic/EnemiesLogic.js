import React, { Component } from "react";
import PropTypes from "prop-types";
import { getNewEnemyData } from "../../../../helpers/getNewEnemyData";

class EnemiesLogic extends Component {
  componentDidMount() {
    this.spawnEnemy();
    this.spawnEnemy();

    this.intervalId = setInterval(() => {
      this.animateEnemies();
    }, 100);
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
      this.handleUpdateEnemyHeadings(playerPosition, this.props.playerPosition);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleUpdateEnemyHeadings = (prevPlayerPosition, newPlayerPosition) => {
    const { enemies } = this.props;
    const playerMovementX = prevPlayerPosition[0] - newPlayerPosition[0];
    const playerMovementY = prevPlayerPosition[1] - newPlayerPosition[1];
    const updatedEnemies = enemies.map(({ coords, id, heading, life }) => {
      return {
        coords,
        id,
        heading: [heading[0] + playerMovementX, heading[1] + playerMovementY],
        life
      };
    });
    this.props.updateEnemies(updatedEnemies);
  };

  handlePlayerRespawn = () => {
    const newEnemies = [];
    this.props.updateEnemies(newEnemies);
    this.spawnEnemy();
    this.spawnEnemy();
  };

  animateEnemies = () => {
    const { enemies } = this.props;

    if (enemies.length > 0) {
      const updatedEnemies = enemies.map(({ coords, id, heading, life }) => {
        return {
          coords: [
            this.getNewCoord(coords[0], heading[0]),
            this.getNewCoord(coords[1], heading[1])
          ],
          id,
          heading,
          life
        };
      });
      this.props.updateEnemies(updatedEnemies);
    }
  };

  getNewCoord = (coord, nextCoord) => {
    if (coord > nextCoord) {
      return coord - 1;
    }

    if (coord < nextCoord) {
      return coord + 1;
    }

    return nextCoord;
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
