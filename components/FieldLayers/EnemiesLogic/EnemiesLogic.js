import React, { Component } from "react";
import PropTypes from "prop-types";
import { getNewEnemyData } from "../../../helpers/getNewEnemyData";

class EnemiesLogic extends Component {
  componentDidMount() {
    this.spawnEnemy();
    this.spawnEnemy();

    setInterval(() => {
      this.animateEnemy();
    }, 100);
  }

  componentDidUpdate(prevProps) {
    const { enemies } = prevProps;
    if (enemies.length > this.props.enemies.length) {
      this.spawnEnemy();
    }
  }

  componentWillUnmount() {
    // clear interval
  }

  listenForPlayerMovement = () => {
    // spawn enemy after X amount of movement
  };

  animateEnemy = () => {
    const { enemies } = this.props;

    if (enemies.length > 0) {
      const updatedEnemies = enemies.map(
        ({ coords, movementPath, nextCoordsKey, id, life }) => {
          return {
            coords: [
              this.getNewCoord(coords[0], movementPath[nextCoordsKey][0]),
              this.getNewCoord(coords[1], movementPath[nextCoordsKey][1])
            ],
            movementPath,
            nextCoordsKey: this.getNextCoordsKey(),
            id,
            life
          };
        }
      );
      this.props.updateEnemies(updatedEnemies);
    }
  };

  getNextCoordsKey = () => {
    const { nextCoordsKey, coords, movementPath } = this.props.enemies[0];
    const nextCoords = movementPath[nextCoordsKey];
    if (nextCoordsKey === 99) {
      return 0;
    }
    if (JSON.stringify(coords) === JSON.stringify(nextCoords)) {
      return nextCoordsKey + 1;
    }
    return nextCoordsKey;
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
  enemies: PropTypes.array.isRequired
};

export default EnemiesLogic;
