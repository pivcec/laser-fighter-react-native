import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import PositionMaze from "./PositionMaze/PositionMaze";

class MazeRotation extends Component {
  state = {
    animatedValue: new Animated.Value(0)
  };

  componentDidUpdate(prevProps) {
    const { heading, offsetHeading } = prevProps;

    if (
      heading !== this.props.heading ||
      offsetHeading !== this.props.offsetHeading
    ) {
      this.handleRotateView(this.props.heading);
    }
  }

  handleRotateView = heading => {
    const { offsetHeading } = this.props;
    const differenceFromOffset = offsetHeading - heading;
    this.rotateView(-differenceFromOffset);
  };

  rotateView = rotateTo => {
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
        <PositionMaze
          playerPosition={playerPosition}
          layoutWidth={layoutWidth}
        />
      </Animated.View>
    );
  }
}

MazeRotation.propTypes = {
  heading: PropTypes.number.isRequired,
  offsetHeading: PropTypes.number.isRequired,
  playerPosition: PropTypes.array.isRequired,
  layoutWidth: PropTypes.number.isRequired
};

export default MazeRotation;
