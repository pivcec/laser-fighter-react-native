import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import MazeZone from "./MazeZone/MazeZone";

class MazeRotation extends Component {
  state = {
    animatedValue: new Animated.Value(0)
  };

  componentDidUpdate(prevProps) {
    const { heading } = prevProps;

    if (heading && heading !== this.props.heading) {
      this.rotateField(heading);
    }
  }

  rotateField = rotateTo => {
    const { animatedValue } = this.state;

    Animated.timing(animatedValue, {
      toValue: rotateTo,
      duration: 0,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { animatedValue } = this.state;
    const { layoutWidth, playerPosition } = this.props;

    const interpolatedRotateAnimation = animatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ["360deg", "0deg"]
    });

    return (
      <Animated.View
        style={{
          transform: [{ rotate: interpolatedRotateAnimation }],
          height: layoutWidth,
          width: layoutWidth,
          position: "absolute"
        }}
      >
        <MazeZone playerPosition={playerPosition} layoutWidth={layoutWidth} />
      </Animated.View>
    );
  }
}

MazeRotation.propTypes = {
  heading: PropTypes.number.isRequired,
  playerPosition: PropTypes.array.isRequired,
  layoutWidth: PropTypes.number.isRequired
};

export default MazeRotation;
