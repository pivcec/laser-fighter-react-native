import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import { View, PanResponder } from "react-native";
import Field from "./Field/Field";

class FieldRotation extends Component {
  state = {
    animatedValue: new Animated.Value(0),
    currentOrientation: null,
    lastLockedDegreeDiff: null,
    rotationIsLocked: false
  };

  componentDidUpdate(prevProps, prevState) {
    const { heading } = prevProps;
    const { rotationIsLocked } = this.state;

    if (!heading && this.props.heading) {
      this.setCurrentOrientation();
    }

    if (heading && heading !== this.props.heading && !rotationIsLocked) {
      this.rotateOrLock();
    }

    if (heading && heading !== this.props.heading && rotationIsLocked) {
      this.handleIsLocked();
    }
  }

  setCurrentOrientation = () => {
    const { heading } = this.props;
    this.setState({
      currentOrientation: heading
    });
  };

  handleIsLocked = () => {
    const { currentOrientation } = this.state;
    const { heading } = this.props;
    if (heading > currentOrientation - 5 && heading < currentOrientation + 5) {
      this.setState({
        rotationIsLocked: false
      });
    }
  };

  rotateOrLock = () => {
    const { currentOrientation, lastLockedDegreeDiff } = this.state;
    const { heading } = this.props;

    const differenceInDegrees = lastLockedDegreeDiff
      ? lastLockedDegreeDiff + (currentOrientation - heading)
      : currentOrientation - heading;

    if (
      heading < currentOrientation + 45 &&
      heading > currentOrientation - 45
    ) {
      this.rotateField(-differenceInDegrees);
    } else {
      this.setState({
        rotationIsLocked: true,
        lastLockedDegreeDiff: differenceInDegrees
      });
    }
  };

  rotateField = rotationTarget => {
    const { animatedValue } = this.state;

    Animated.timing(animatedValue, {
      toValue: rotationTarget,
      duration: 0,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { animatedValue } = this.state;
    const {
      playerPosition,
      updatePlayerPosition,
      enemies,
      layoutWidth,
      updateEnemies,
      handleEnemyCollision,
      playerIsDead,
      playSound,
      // heading,
      increaseKarma
    } = this.props;

    const interpolatedRotateAnimation = animatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ["360deg", "0deg"]
    });

    return (
      <Animated.View
        style={{
          transform: [{ rotate: interpolatedRotateAnimation }],
          zIndex: 3
        }}
      >
        <View>
          <Field
            playerPosition={playerPosition}
            updatePlayerPosition={updatePlayerPosition}
            enemies={enemies}
            layoutWidth={layoutWidth}
            updateEnemies={updateEnemies}
            handleEnemyCollision={handleEnemyCollision}
            playerIsDead={playerIsDead}
            playSound={playSound}
            // heading={heading}
            increaseKarma={increaseKarma}
          />
        </View>
      </Animated.View>
    );
  }
}

FieldRotation.propTypes = {
  heading: PropTypes.number.isRequired,
  playerPosition: PropTypes.array.isRequired,
  updatePlayerPosition: PropTypes.func.isRequired,
  layoutWidth: PropTypes.number.isRequired,
  enemies: PropTypes.array.isRequired,
  updateEnemies: PropTypes.func.isRequired,
  handleEnemyCollision: PropTypes.func.isRequired,
  playerIsDead: PropTypes.bool.isRequired,
  playSound: PropTypes.func.isRequired,
  increaseKarma: PropTypes.func.isRequired
};

export default FieldRotation;
