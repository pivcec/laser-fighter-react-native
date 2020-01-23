import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import {
  getRotatedPosition,
  getRotatedPositionAroundPrevious
} from "../../../helpers/coordsCalculations";
import rustyMetal from "../../../assets/images/rusty.jpg";
import Charger from "./Charger/Charger";
import FireLaser from "./FireLaser/FireLaser";
import Movement from "./Movement/Movement";

export default class Controls extends Component {
  state = {
    buttonIsPressed: false
  };

  chargingInterval = null;

  componentDidUpdate(prevProps, prevState) {
    const { buttonIsPressed } = prevState;

    if (!buttonIsPressed && this.state.buttonIsPressed) {
      this.props.togglePlayerLaserIsCharging(true);
    }

    if (buttonIsPressed && !this.state.buttonIsPressed) {
      this.props.togglePlayerLaserIsCharging(false);
    }

    if (this.state.buttonIsPressed && this.props.playerIsDead) {
      this.handleFireLaserOnPressOut();
    }
  }

  handleFireLaserOnPressIn = () => {
    this.setState({ buttonIsPressed: true });
  };

  handleFireLaserOnPressOut = () => {
    this.setState({ buttonIsPressed: false });
  };

  handleMovementOnPressIn = directionKey => {
    const { playerPosition, heading } = this.props;

    const newPlayerPosition = this.getNewPlayerPosition(
      playerPosition,
      directionKey
    );

    const rotatedNewPlayerPosition = getRotatedPositionAroundPrevious(
      playerPosition[0],
      playerPosition[1],
      newPlayerPosition[0],
      newPlayerPosition[1],
      heading
    );

    this.props.updatePlayerPosition(rotatedNewPlayerPosition);
  };

  getNewPlayerPosition = (playerPosition, directionKey) => {
    switch (directionKey) {
      case 0:
        return [playerPosition[0] - 10, playerPosition[1] + 10];
      case 1:
        return [playerPosition[0], playerPosition[1] + 10];
      case 2:
        return [playerPosition[0] + 10, playerPosition[1] + 10];
      case 3:
        return [playerPosition[0] - 10, playerPosition[1]];
      case 4:
        return [playerPosition[0] + 10, playerPosition[1]];
      case 5:
        return [playerPosition[0] - 10, playerPosition[1] - 10];
      case 6:
        return [playerPosition[0], playerPosition[1] - 10];
      case 7:
        return [playerPosition[0] + 10, playerPosition[1] - 10];
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
          <Movement handleOnPressIn={this.handleMovementOnPressIn} />
        </ImageBackground>
        <Text style={{ color: "white" }}>{heading}</Text>
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
