import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "./Grid/Grid";
import Player from "./Player/Player";
import FieldRotation from "./FieldRotation/FieldRotation";

class FieldLayers extends Component {
  state = {
    enemies: []
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
    const { enemies } = this.state;
    const {
      layoutWidth,
      heading,
      coords,
      playerLaserCharge,
      playSound,
      handleEnemyCollision,
      chi,
      karma,
      playerIsDead,
      handleChiTokenCollision
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
          playSound={this.props.playSound}
          increaseKarma={this.props.increaseKarma}
          coords={coords}
          handleChiTokenCollision={handleChiTokenCollision}
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
  playerIsDead: PropTypes.bool.isRequired,
  coords: PropTypes.object.isRequired,
  handleChiTokenCollision: PropTypes.func.isRequired
};

export default FieldLayers;
