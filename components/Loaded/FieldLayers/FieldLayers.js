import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Grid from "./Grid/Grid";
import Player from "./Player/Player";
import FieldRotation from "./FieldRotation/FieldRotation";
import MazeRotation from "./MazeRotation/MazeRotation";

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
      playerPosition,
      updatePlayerPosition,
      playerLaserCharge,
      playSound,
      handleEnemyCollision,
      chi,
      karma,
      playerIsDead,
      increaseKarma
    } = this.props;
    return (
      <>
        <Grid layoutWidth={layoutWidth} />

        <MazeRotation
          heading={heading}
          playerPosition={playerPosition}
          layoutWidth={layoutWidth}
        />

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

        <View style={{ position: "absolute", zIndex: 100 }}>
          <FieldRotation
            heading={heading}
            playerPosition={playerPosition}
            updatePlayerPosition={updatePlayerPosition}
            layoutWidth={layoutWidth}
            enemies={enemies}
            updateEnemies={this.updateEnemies}
            handleEnemyCollision={handleEnemyCollision}
            playerIsDead={playerIsDead}
            playSound={this.props.playSound}
            increaseKarma={increaseKarma}
          />
        </View>
      </>
    );
  }
}

FieldLayers.propTypes = {
  layoutWidth: PropTypes.number.isRequired,
  playerPosition: PropTypes.array.isRequired,
  updatePlayerPosition: PropTypes.func.isRequired,
  heading: PropTypes.number.isRequired,
  playerLaserCharge: PropTypes.object.isRequired,
  playSound: PropTypes.func.isRequired,
  chi: PropTypes.number.isRequired,
  karma: PropTypes.number.isRequired,
  handleEnemyCollision: PropTypes.func.isRequired,
  playerIsDead: PropTypes.bool.isRequired,
  increaseKarma: PropTypes.func.isRequired
};

export default FieldLayers;
