import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ImageBackground } from "react-native";
import rustyMetal from "../../../assets/images/rusty.jpg";
import Charger from "./Charger/Charger";
import FireLaser from "./FireLaser/FireLaser";
import Movement from "./Movement/Movement";
// import MockMovement from "./MockMovement/MockMovement";

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
      this.handleOnPressOut();
    }
  }

  handleFireLaserOnPressIn = () => {
    this.setState({ buttonIsPressed: true });
  };

  handleFireLaserOnPressOut = () => {
    this.setState({ buttonIsPressed: false });
  };

  handleMovementOnPressIn = directionKey => {
    console.warn(directionKey);
  };

  handleMovementOnPressOut = directionKey => {
    console.warn(directionKey);
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
          {/*<MockMovement heading={heading} />*/}
        </ImageBackground>
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
  playerLaserIsCharging: PropTypes.bool.isRequired,
  togglePlayerLaserIsCharging: PropTypes.func.isRequired,
  heading: PropTypes.number.isRequired
};
