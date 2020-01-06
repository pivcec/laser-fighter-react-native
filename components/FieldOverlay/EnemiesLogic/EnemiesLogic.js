import React, { Component } from "react";
import PropTypes from "prop-types";
import { getNewEnemyData } from "../../../helpers/getNewEnemyData";

class EnemiesLogic extends Component {
  componentDidMount() {
    this.spawnEnemy();

    setInterval(() => {
      this.animateEnemy();
    }, 100);
  }

  listenForPlayerMovement = () => {
    // spawn enemy after X amount of movement
  };

  animateEnemy = () => {
    const newEnemy = {
      coords: [
        this.generateMovement(this.props.enemies[0].coords[0]),
        this.generateMovement(this.props.enemies[0].coords[1])
      ],
      id: "12345"
    };

    this.props.updateEnemy(newEnemy);
  };

  generateMovement = originalPosition => {
    const plusOrMinus = Math.round(Math.random());
    if (plusOrMinus) {
      return originalPosition + 1;
    }
    return originalPosition - 1;
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
  createEnemy: PropTypes.func.isRequired,
  updateEnemy: PropTypes.func.isRequired,
  enemies: PropTypes.array.isRequired
};

export default EnemiesLogic;
