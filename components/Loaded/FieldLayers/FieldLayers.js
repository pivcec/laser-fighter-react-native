import React, { Component } from "react";
import PropTypes from "prop-types";
import { handleGetUpdatedPlayerPosition } from "../../../helpers/playerLogic";
import Grid from "./Grid/Grid";
import Player from "./Player/Player";
import FieldRotation from "./FieldRotation/FieldRotation";

class FieldLayers extends Component {
  state = {
    enemies: [],
    chiTokens: [],
    playerPosition: [50, 50]
  };

  componentDidUpdate(prevProps) {
    const { coords } = prevProps;

    if (JSON.stringify(coords) !== JSON.stringify(this.props.coords)) {
      const updatedPlayerPosition = handleGetUpdatedPlayerPosition(
        coords,
        this.props.coords,
        this.props.playerPosition
      );
      this.setState({ playerPosition: updatedPlayerPosition });
    }
  }

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
          handleEnemyCollision={handleEnemyCollision}
          playerIsDead={playerIsDead}
          playerPosition={playerPosition}
          playSound={this.props.playSound}
          increaseKarma={this.props.increaseKarma}
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
