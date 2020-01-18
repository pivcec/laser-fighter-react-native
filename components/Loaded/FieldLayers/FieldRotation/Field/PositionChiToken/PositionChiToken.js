import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  chiTokenWidthAndHeight,
  exactMathConfig
} from "../../../../../../constants/constants";
import { Animated } from "react-native";
import exactMath from "exact-math";
import ChiToken from "./ChiToken/ChiToken";

const chiTokenPositionOffset = exactMath.div(chiTokenWidthAndHeight, 2);

class PositionChiToken extends Component {
  state = {
    animatedValue: new Animated.Value(0)
  };

  componentDidMount() {
    this.rotateChiToken();
    this.startRemoveChiTokenCounter();
  }

  componentDidUpdate(prevProps) {
    const { heading } = prevProps;

    if (heading !== this.props.heading) {
      this.rotateChiToken();
    }
  }

  startRemoveChiTokenCounter = () => {
    setTimeout(() => {
      this.props.updateChiToken(null);
    }, 60000);
  };

  rotateChiToken = () => {
    const { heading } = this.props;
    Animated.timing(this.state.animatedValue, {
      toValue: heading,
      duration: 0,
      useNativeDriver: true
    }).start();
  };

  render() {
    const {
      chiToken: { position },
      playerPosition,
      updateChiToken
    } = this.props;
    const positionOffsetX = exactMath.sub(
      position[0],
      chiTokenPositionOffset,
      exactMathConfig
    );
    const positionOffsetY = exactMath.sub(
      position[1],
      chiTokenPositionOffset,
      exactMathConfig
    );
    const playerMovementOffsetX = exactMath.add(
      -playerPosition[0],
      50,
      exactMathConfig
    );
    const playerMovementOffsetY = exactMath.add(
      -playerPosition[1],
      50,
      exactMathConfig
    );
    const finalPositionX = exactMath.add(
      positionOffsetX,
      playerMovementOffsetX,
      exactMathConfig
    );
    const finalPositionY = exactMath.add(
      positionOffsetY,
      playerMovementOffsetY,
      exactMathConfig
    );
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
          top: `${finalPositionY}%`,
          left: `${finalPositionX}%`,
          width: `${chiTokenWidthAndHeight}%`,
          height: `${chiTokenWidthAndHeight}%`
        }}
      >
        <ChiToken
          position={[finalPositionX, finalPositionY]}
          updateChiToken={updateChiToken}
        />
      </Animated.View>
    );
  }
}

export default PositionChiToken;

PositionChiToken.propTypes = {
  chiToken: PropTypes.object.isRequired,
  heading: PropTypes.number.isRequired,
  playerPosition: PropTypes.array.isRequired,
  updateChiToken: PropTypes.func.isRequired
};
