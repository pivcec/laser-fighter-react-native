import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Grid from "./Grid/Grid";
import Player from "./Player/Player";
import FieldRotation from "./FieldRotation/FieldRotation";
import MazeRotation from "./MazeRotation/MazeRotation";
import PlayerInfo from "./PlayerInfo/PlayerInfo";

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
      increaseKarma,
      offsetHeading,
      updateOffsetHeading
    } = this.props;
    return (
      <>
        <Grid layoutWidth={layoutWidth} />

        <MazeRotation
          heading={heading}
          playerPosition={playerPosition}
          layoutWidth={layoutWidth}
          offsetHeading={offsetHeading}
        />

        <Player
          layoutWidth={layoutWidth}
          heading={heading}
          offsetHeading={offsetHeading}
          playerLaserCharge={playerLaserCharge}
          updateEnemy={this.updateEnemy}
          playSound={playSound}
          enemies={enemies}
          chi={chi}
          karma={karma}
        />

        <View style={{ position: "absolute", zIndex: 5 }}>
          <FieldRotation
            heading={heading}
            offsetHeading={offsetHeading}
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

        <View style={{ position: "absolute", zIndex: 6 }}>
          <PlayerInfo
            karma={karma}
            chi={chi}
            layoutWidth={layoutWidth}
            updateOffsetHeading={updateOffsetHeading}
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
  offsetHeading: PropTypes.number.isRequired,
  updateOffsetHeading: PropTypes.func.isRequired,
  playerLaserCharge: PropTypes.object.isRequired,
  playSound: PropTypes.func.isRequired,
  chi: PropTypes.number.isRequired,
  karma: PropTypes.number.isRequired,
  handleEnemyCollision: PropTypes.func.isRequired,
  playerIsDead: PropTypes.bool.isRequired,
  increaseKarma: PropTypes.func.isRequired
};

export default FieldLayers;
