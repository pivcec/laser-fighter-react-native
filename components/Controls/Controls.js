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
    buttonIsPressed: false,
    charge: 0
  };

  chargingInterval = null;

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
        this.increaseCharge(this.state.charge);
      }, 10);
    } else {
      clearInterval(this.chargingInterval);
      this.setState({ charge: 0 });
    }
  };

  increaseCharge = charge => {
    if (charge < 100) {
      this.setState(prevState => ({ charge: prevState.charge + 1 }));
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
    const { buttonIsPressed, charge } = this.state;
    const { heading } = this.props;
    return (
      <View style={styles.container}>
        <Charger buttonIsPressed={buttonIsPressed} charge={charge} />
        <ImageBackground source={brushedMetal} style={styles.imageBackground}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPressIn={this.handleOnPressIn}
              onPressOut={this.handleOnPressOut}
            />
          </View>
          {/*<Text>{heading}</Text>*/}
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
  startPlayerLaserFire: PropTypes.func.isRequired
};
