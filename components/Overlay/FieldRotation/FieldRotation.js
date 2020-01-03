import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated, View } from "react-native";
import Field from "./Field/Field";
import { vw, vh } from "react-native-expo-viewport-units";

class FieldRotation extends Component {
  state = {
    animatedValue: new Animated.Value(0)
  };

  componentDidMount() {
    this.rotateField();
  }

  componentDidUpdate(prevProps) {
    const { heading } = prevProps;

    if (heading !== this.props.heading) {
      this.rotateField();
    }
  }

  rotateField = () => {
    const { animatedValue } = this.state;

    Animated.timing(animatedValue, {
      toValue: this.props.heading,
      duration: 0,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { animatedValue } = this.state;
    const { layoutWidth, enemyLasers } = this.props;

    const interpolatedRotateAnimation = animatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ["360deg", "0deg"]
    });

    return (
      <Animated.View
        style={{
          transform: [{ rotate: interpolatedRotateAnimation }]
        }}
      >
        <Field layoutWidth={layoutWidth} enemyLasers={enemyLasers} />
      </Animated.View>
    );
  }
}

FieldRotation.propTypes = {
  heading: PropTypes.number.isRequired,
  layoutWidth: PropTypes.number.isRequired,
  enemyLasers: PropTypes.array.isRequired
};

export default FieldRotation;
