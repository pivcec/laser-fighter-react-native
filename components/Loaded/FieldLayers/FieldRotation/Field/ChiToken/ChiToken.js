import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { playerWidthAndHeight } from "../../../../../../constants/constants";
import { Animated } from "react-native";

const playerPositionOffset = playerWidthAndHeight / 2;

class ChiToken extends Component {
  state = {
    animatedValue: new Animated.Value(0)
  };

  componentDidMount() {
    this.rotateChiToken();
  }

  componentDidUpdate(prevProps) {
    const { heading } = prevProps;
    if (heading !== this.props.heading) {
      this.rotateChiToken();
    }
  }

  rotateChiToken = () => {
    const { heading } = this.props;
    Animated.timing(this.state.animatedValue, {
      toValue: heading,
      duration: 0,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { position } = this.props;
    const { animatedValue } = this.state;
    const interpolatedRotateAnimation = animatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "360deg"]
    });
    return (
      <Animated.View
        style={{
          transform: [{ rotate: interpolatedRotateAnimation }],
          position: "absolute",
          top: `${position[1] - playerPositionOffset}%`,
          left: `${position[0] - playerPositionOffset}%`,
          width: `${playerWidthAndHeight * 2}%`,
          height: `${playerWidthAndHeight * 2}%`
        }}
      >
        <Image
          source={require("../../../../../../assets/images/lotus.png")}
          style={{
            width: "100%",
            height: "75%"
          }}
        />
      </Animated.View>
    );
  }
}

export default ChiToken;

ChiToken.propTypes = {
  position: PropTypes.array.isRequired,
  heading: PropTypes.number.isRequired
};
