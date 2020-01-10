import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import { StyleSheet, View } from "react-native";
import { playerLaserChargeTime } from "../../../constants/constants";

export default class Charger extends Component {
  state = {
    animatedValue: new Animated.Value(0)
  };

  componentDidUpdate(prevProps) {
    const { playerLaserIsCharging } = prevProps;

    if (playerLaserIsCharging !== this.props.playerLaserIsCharging) {
      this.animateCharge();
    }
  }

  animateCharge = () => {
    const { animatedValue } = this.state;
    const { playerLaserIsCharging } = this.props;
    const toValue = playerLaserIsCharging ? 1 : 0;
    const duration = playerLaserIsCharging ? playerLaserChargeTime : 0;

    Animated.timing(animatedValue, {
      toValue,
      duration,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { animatedValue } = this.state;
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            transform: [
              {
                scaleX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1]
                })
              },
              {
                scaleY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1]
                })
              }
            ],
            backgroundColor: "red"
          }}
        ></Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "black"
  }
});

Charger.propTypes = {
  playerLaserIsCharging: PropTypes.bool.isRequired
};
