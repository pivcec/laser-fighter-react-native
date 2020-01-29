import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import rustyMetal from "../../../assets/images/rusty.jpg";
import Charger from "./Charger/Charger";
import FireLaser from "./FireLaser/FireLaser";
import Movement from "./Movement/Movement";

export default class Controls extends Component {
  state = {
    fireLaserButtonIsPressed: false,
    directionKey: null
  };

  movePlayerInterval = null;

  componentDidUpdate(prevProps, prevState) {
    const { fireLaserButtonIsPressed, directionKey } = prevState;

    if (!fireLaserButtonIsPressed && this.state.fireLaserButtonIsPressed) {
      this.props.togglePlayerLaserIsCharging(true);
    }

    if (fireLaserButtonIsPressed && !this.state.fireLaserButtonIsPressed) {
      this.props.togglePlayerLaserIsCharging(false);
    }

    if (this.state.fireLaserButtonIsPressed && this.props.playerIsDead) {
      this.handleFireLaserOnPressOut();
    }

    if (directionKey === null && this.state.directionKey !== null) {
      this.handleMovePlayer();
    }
  }

  handleFireLaserOnPressIn = () => {
    this.setState({ fireLaserButtonIsPressed: true });
  };

  handleFireLaserOnPressOut = () => {
    this.setState({ fireLaserButtonIsPressed: false });
  };

  handleMovementOnPressIn = directionKey => {
    this.setState({ directionKey });
  };

  handleMovementOnPressOut = () => {
    this.setState({ directionKey: null });
    clearInterval(this.movePlayerInterval);
  };

  handleMovePlayer = () => {
    this.movePlayerInterval = setInterval(() => {
      this.movePlayer();
    }, 100);
  };

  movePlayer = () => {
    const { directionKey } = this.state;

    const newPlayerPosition = this.getNewPlayerPosition(
      this.props.playerPosition,
      directionKey
    );

    this.props.updatePlayerPosition(newPlayerPosition);
  };

  getNewPlayerPosition = (playerPosition, directionKey) => {
    switch (directionKey) {
      case 0:
        return [playerPosition[0] - 5, playerPosition[1] + 5];
      case 1:
        return [playerPosition[0], playerPosition[1] + 5];
      case 2:
        return [playerPosition[0] + 5, playerPosition[1] + 5];
      case 3:
        return [playerPosition[0] - 5, playerPosition[1]];
      case 4:
        return [playerPosition[0] + 5, playerPosition[1]];
      case 5:
        return [playerPosition[0] - 5, playerPosition[1] - 5];
      case 6:
        return [playerPosition[0], playerPosition[1] - 5];
      case 7:
        return [playerPosition[0] + 5, playerPosition[1] - 5];
    }
  };

  render() {
    const { playerLaserIsCharging, heading } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.chargerContainer}>
          <Charger playerLaserIsCharging={playerLaserIsCharging} />
        </View>
        <ImageBackground source={rustyMetal} style={styles.imageBackground}>
          <FireLaser
            handleOnPressIn={this.handleFireLaserOnPressIn}
            handleOnPressOut={this.handleFireLaserOnPressOut}
          />
          <Movement
            handleOnPressIn={this.handleMovementOnPressIn}
            handleOnPressOut={this.handleMovementOnPressOut}
          />
        </ImageBackground>
        {/* <Text style={{ color: "white" }}>{heading}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  chargerContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: "black"
  },
  imageBackground: {
    flex: 3,
    width: "100%",
    height: "100%",
    flexDirection: "row"
  }
});

Controls.propTypes = {
  playerIsDead: PropTypes.bool.isRequired,
  playerPosition: PropTypes.array.isRequired,
  updatePlayerPosition: PropTypes.func.isRequired,
  playerLaserIsCharging: PropTypes.bool.isRequired,
  togglePlayerLaserIsCharging: PropTypes.func.isRequired,
  heading: PropTypes.number.isRequired
};
