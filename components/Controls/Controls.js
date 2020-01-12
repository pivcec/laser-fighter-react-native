import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import brushedMetal from "../../assets/images/rusty.jpg";
import Charger from "./Charger/Charger";

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
  }

  handleOnPressIn = () => {
    this.setState({ buttonIsPressed: true });
  };

  handleOnPressOut = () => {
    this.setState({ buttonIsPressed: false });
  };

  render() {
    const { playerLaserIsCharging } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.chargerContainer}>
          <Charger playerLaserIsCharging={playerLaserIsCharging} />
        </View>

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
    backgroundColor: "white",
    borderRadius: 60,
    height: 60,
    width: 60,
    borderWidth: 1
  },
  button: {
    backgroundColor: "black",
    borderRadius: 50,
    height: 50,
    width: 50
  }
});

Controls.propTypes = {
  playerLaserIsCharging: PropTypes.bool.isRequired,
  togglePlayerLaserIsCharging: PropTypes.func.isRequired
};
