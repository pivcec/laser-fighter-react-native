import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { checkForCollisionWithPlayer } from "../../../../../../../helpers/playerLogic";
import { Animated, Easing } from "react-native";
import exactMath from "exact-math";

// const enemyPositionOffset = exactMath.div(enemyWidthAndHeight, 2);

class Vortex extends Component {
  state = {
    animatedValue: new Animated.Value(0)
  };

  vortexSpinDuration = Math.floor(Math.random() * (2000 - 500) + 500);

  componentDidMount() {
    this.rotateVortex();
  }

  componentDidUpdate(prevProps) {}

  rotateVortex = () => {
    this.state.animatedValue.setValue(0);
    Animated.timing(this.state.animatedValue, {
      toValue: 360,
      duration: this.vortexSpinDuration,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.rotateVortex());
  };

  render() {
    const { position } = this.props;
    const { animatedValue } = this.state;
    const interpolatedRotateAnimation = animatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ["360deg", "0deg"]
    });
    return (
      <Animated.View
        style={{
          transform: [{ rotate: interpolatedRotateAnimation }],
          position: "absolute",
          top: 10,
          left: 10,
          width: 200,
          height: 200,
          zIndex: 1
        }}
      >
        <Image
          source={require("../../../../../../../assets/images/swirly.png")}
          style={{
            width: `100%`,
            height: `100%`
          }}
        />
      </Animated.View>
    );
  }
}

export default Vortex;

Vortex.propTypes = {};
