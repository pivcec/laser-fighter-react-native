import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import PositionField from "./PositionField/PositionField";

class FieldRotation extends Component {
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
    const {
      playerPosition,
      updatePlayerPosition,
      fieldPosition,
      enemies,
      layoutWidth,
      updateEnemies,
      handleEnemyCollision,
      playerIsDead,
      playSound,
      increaseKarma,
      updateFieldPosition
    } = this.props;

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
        <PositionField
          playerPosition={playerPosition}
          updatePlayerPosition={updatePlayerPosition}
          enemies={enemies}
          layoutWidth={layoutWidth}
          updateEnemies={updateEnemies}
          handleEnemyCollision={handleEnemyCollision}
          playerIsDead={playerIsDead}
          playSound={playSound}
          increaseKarma={increaseKarma}
          updateFieldPosition={updateFieldPosition}
          fieldPosition={fieldPosition}
        />
      </Animated.View>
    );
  }
}

FieldRotation.propTypes = {
  heading: PropTypes.number.isRequired,
  offsetHeading: PropTypes.number.isRequired,
  playerPosition: PropTypes.array.isRequired,
  updatePlayerPosition: PropTypes.func.isRequired,
  layoutWidth: PropTypes.number.isRequired,
  enemies: PropTypes.array.isRequired,
  updateEnemies: PropTypes.func.isRequired,
  updateFieldPosition: PropTypes.func.isRequired,
  fieldPosition: PropTypes.array.isRequired,
  handleEnemyCollision: PropTypes.func.isRequired,
  playerIsDead: PropTypes.bool.isRequired,
  playSound: PropTypes.func.isRequired,
  increaseKarma: PropTypes.func.isRequired
};

export default FieldRotation;
