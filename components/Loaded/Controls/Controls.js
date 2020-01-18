import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import rustyMetal from "../../../assets/images/rusty.jpg";
import Charger from "./Charger/Charger";
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

  handleOnPressIn = () => {
    this.setState({ buttonIsPressed: true });
  };

  handleOnPressOut = () => {
    this.setState({ buttonIsPressed: false });
  };

  render() {
    const {
      playerLaserIsCharging,
      coords,
      updateLocation,
      heading
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.chargerContainer}>
          <Charger playerLaserIsCharging={playerLaserIsCharging} />
        </View>
        <ImageBackground source={rustyMetal} style={styles.imageBackground}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPressIn={this.handleOnPressIn}
              onPressOut={this.handleOnPressOut}
            >
              <Image
                source={require("../../../assets/images/luck.png")}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          </View>

          {/*
          <MockMovement
            coords={coords}
            updateLocation={updateLocation}
            heading={heading}
          />
          */}
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DAA520",
    borderRadius: 60,
    height: 60,
    width: 60,
    borderWidth: 1
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 50,
    height: 50,
    width: 50
  },
  buttonImage: {
    width: 45,
    height: 45
  }
});

Controls.propTypes = {
  playerIsDead: PropTypes.bool.isRequired,
  playerLaserIsCharging: PropTypes.bool.isRequired,
  togglePlayerLaserIsCharging: PropTypes.func.isRequired,
  coords: PropTypes.object.isRequired,
  updateLocation: PropTypes.func.isRequired,
  heading: PropTypes.number.isRequired
};
