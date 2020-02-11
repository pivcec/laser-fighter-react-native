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
    enemies: [],
    touchCoords: null,
    fieldPosition: [0, 0]
  };

  componentDidUpdate(prevProps, prevState) {
    const { touchCoords } = prevState;
    if (!touchCoords && this.state.touchCoords) {
      this.handleTouchCoordsUpdate();
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

  updateFieldPosition = (movementX, movementY) => {
    this.setState(prevState => ({
      fieldPosition: [
        prevState.fieldPosition[0] + -movementX,
        prevState.fieldPosition[1] + -movementY
      ]
    }));
  };

  handleTouchCoordsUpdate = () => {
    const { layoutWidth } = this.props;
    const { touchCoords } = this.state;

    const halfOfLayoutWidth = layoutWidth / 2;

    let distanceFromCenterX;
    let distanceFromCenterY;

    if (touchCoords[0] > halfOfLayoutWidth) {
      distanceFromCenterX = -(touchCoords[0] - halfOfLayoutWidth);
    } else {
      distanceFromCenterX = halfOfLayoutWidth - touchCoords[0];
    }

    if (touchCoords[1] > halfOfLayoutWidth) {
      distanceFromCenterY = -(touchCoords[1] - halfOfLayoutWidth);
    } else {
      distanceFromCenterY = halfOfLayoutWidth - touchCoords[1];
    }

    this.props.handleTouchMovement([distanceFromCenterX, distanceFromCenterY]);
  };

  handleTouchStart = event => {
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
    const { enemies, fieldPosition } = this.state;
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
      offsetHeading
    } = this.props;
    return (
      <View
        onTouchStart={e => {
          this.handleTouchStart(e.nativeEvent);
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
          fieldPosition={fieldPosition}
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
            updateFieldPosition={this.updateFieldPosition}
            fieldPosition={fieldPosition}
          />
        </View>

        <View style={{ position: "absolute", zIndex: 5 }}>
          <PlayerInfo karma={karma} chi={chi} layoutWidth={layoutWidth} />
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
