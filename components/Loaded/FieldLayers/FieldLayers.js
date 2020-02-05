import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import exactMath from "exact-math";
import { exactMathConfig } from "../../../constants/constants";
import Grid from "./Grid/Grid";
import Player from "./Player/Player";
import FieldRotation from "./FieldRotation/FieldRotation";
import MazeRotation from "./MazeRotation/MazeRotation";
import PlayerInfo from "./PlayerInfo/PlayerInfo";

class FieldLayers extends Component {
  state = {
    enemies: [],
    touchCoords: null
  };

  componentDidUpdate(prevProps, prevState) {
    const { touchCoords } = prevState;
    if (touchCoords && this.state.touchCoords) {
      if (
        touchCoords[0] !== this.state.touchCoords[0] ||
        touchCoords[1] !== this.state.touchCoords[1]
      ) {
        this.handleTouchCoordsUpdate(touchCoords);
      }
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

  handleTouchCoordsUpdate = touchCoords => {
    const touchMovementX = exactMath.sub(
      touchCoords[0],
      this.state.touchCoords[0],
      exactMathConfig
    );

    const touchMovementY = exactMath.sub(
      touchCoords[1],
      this.state.touchCoords[1],
      exactMathConfig
    );

    this.props.handleTouchMovement(touchMovementX, touchMovementY);
  };

  handleTouchMove = event => {
    this.setState({
      touchCoords: [event.locationX, event.locationY]
    });
  };

  handleTouchEnd = () => {
    this.setState({
      touchCoords: null
    });
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
      <View
        onTouchMove={e => {
          this.handleTouchMove(e.nativeEvent);
        }}
        onTouchEnd={e => {
          this.handleTouchEnd(e.nativeEvent);
        }}
      >
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

        <View style={{ position: "absolute", zIndex: 4 }}>
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

        <View style={{ position: "absolute", zIndex: 5 }}>
          <PlayerInfo
            karma={karma}
            chi={chi}
            layoutWidth={layoutWidth}
            updateOffsetHeading={updateOffsetHeading}
          />
        </View>
      </View>
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
  increaseKarma: PropTypes.func.isRequired,
  handleTouchMovement: PropTypes.func.isRequired
};

export default FieldLayers;
