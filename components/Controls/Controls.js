import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Text
} from "react-native";
import brushedMetal from "../../assets/images/brushed-metal.jpg";
import Charger from "./Charger/Charger";

export default class Controls extends Component {
  state = {
    buttonIsPressed: false
  };

  chargingInterval = null;

  componentWillUnmount() {
    // remove interval
  }

  componentDidUpdate(prevProps, prevState) {
    const { buttonIsPressed } = prevState;

    if (!buttonIsPressed && this.state.buttonIsPressed) {
      this.toggleButtonCharge(true);
    }

    if (buttonIsPressed && !this.state.buttonIsPressed) {
      this.toggleButtonCharge(false);
    }
  }

  toggleButtonCharge = toggle => {
    if (toggle) {
      this.chargingInterval = setInterval(() => {
        this.handleIncreaseLaserCharge(this.props.laserCharge);
      }, 10);
    } else {
      clearInterval(this.chargingInterval);
      this.props.resetLaserCharge();
    }
  };

  handleIncreaseLaserCharge = laserCharge => {
    if (laserCharge < 100) {
      this.props.increaseLaserCharge();
    }
  };

  handleOnPressIn = () => {
    this.setState({ buttonIsPressed: true });
  };

  handleOnPressOut = () => {
    this.setState({ buttonIsPressed: false });
    this.props.startPlayerLaserFire();
  };

  render() {
    const { buttonIsPressed } = this.state;
    const { laserCharge } = this.props;
    return (
      <View style={styles.container}>
        <Charger buttonIsPressed={buttonIsPressed} laserCharge={laserCharge} />
        <ImageBackground source={brushedMetal} style={styles.imageBackground}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPressIn={this.handleOnPressIn}
              onPressOut={this.handleOnPressOut}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  chargerContainer: {
    flex: 1
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
    backgroundColor: "white",
    borderRadius: 60,
    height: 60,
    width: 60
  },
  button: {
    backgroundColor: "red",
    borderRadius: 50,
    height: 50,
    width: 50
  }
});

Controls.propTypes = {
  startPlayerLaserFire: PropTypes.func.isRequired,
  laserCharge: PropTypes.number.isRequired,
  increaseLaserCharge: PropTypes.func.isRequired,
  resetLaserCharge: PropTypes.func.isRequired
};
