import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import { View } from "react-native";
import Field from "./Field/Field";

class FieldRotation extends Component {
  state = {
    animatedValue: new Animated.Value(0),
    orientationHeading: null,
    rotateTo: 0,
    lastAnimatedRotateTo: 0,
    rotationMode: null
  };

  animationInterval = null;

  componentDidMount() {
    this.setState({
      rotationMode: "NORMAL"
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { heading } = prevProps;
    const { rotationMode, rotateTo } = prevState;

    if (!heading && this.props.heading) {
      this.setState({
        orientationHeading: this.props.heading
      });
    }

    if (heading && heading !== this.props.heading) {
      this.handleSetRotationMode();
    }

    if (
      heading &&
      heading !== this.props.heading &&
      this.state.rotationMode === "NORMAL"
    ) {
      this.handleNormalMovement();
    }

    if (
      (rotationMode === "NORMAL" && this.state.rotationMode === "ANIMATED") ||
      (rotationMode === "LOCKED_AT_POINT" &&
        this.state.rotationMode === "ANIMATED")
    ) {
      this.handleIsAnimated();
    }

    if (
      rotationMode === "ANIMATED" &&
      this.state.rotationMode === "LOCKED_AT_POINT"
    ) {
      this.handleIsLockedAtPoint();
    }

    if (rotateTo !== this.state.rotateTo) {
      this.rotateField(this.state.rotateTo);
    }
  }

  handleSetRotationMode = () => {
    const { heading } = this.props;
    const { orientationHeading, rotationMode } = this.state;
    const degreesFromOrientationHeading = orientationHeading - heading;
    const isWithinRegularRotationRange =
      degreesFromOrientationHeading > -35 && degreesFromOrientationHeading < 35;
    const isPointingAtOrientationHeading =
      degreesFromOrientationHeading > -5 && degreesFromOrientationHeading < 5;

    if (rotationMode === "NORMAL" && !isWithinRegularRotationRange) {
      this.setState({ rotationMode: "ANIMATED" });
    }

    if (rotationMode === "ANIMATED" && isWithinRegularRotationRange) {
      this.setState({ rotationMode: "LOCKED_AT_POINT" });
    }

    if (rotationMode === "LOCKED_AT_POINT" && isPointingAtOrientationHeading) {
      this.setState({ rotationMode: "NORMAL" });
    } else if (
      rotationMode === "LOCKED_AT_POINT" &&
      !isWithinRegularRotationRange
    ) {
      this.setState({ rotationMode: "ANIMATED" });
    }
  };

  handleNormalMovement = () => {
    const { heading } = this.props;
    const { orientationHeading } = this.state;
    const degreesFromOrientationHeading = orientationHeading - heading;

    this.setState(prevState => ({
      rotateTo: degreesFromOrientationHeading + prevState.lastAnimatedRotateTo
    }));
  };

  handleIsAnimated = () => {
    this.animationInterval = setInterval(() => {
      this.handleAnimateRotation();
    }, 125);
  };

  rotateToOrZero = rotateTo => {
    if (rotateTo >= 360 || rotateTo <= -360) {
      return 0;
    }
    return rotateTo;
  };

  handleAnimateRotation = () => {
    const { heading } = this.props;
    const { orientationHeading } = this.state;
    const normalizeDiff = 180 - orientationHeading;
    const normalizedOrientationHeading = orientationHeading + normalizeDiff;
    const normalizedHeading = heading + normalizeDiff;
    const rotateClockwise =
      normalizedHeading % 360 < normalizedOrientationHeading;

    this.setState(prevState => ({
      rotateTo: rotateClockwise
        ? this.rotateToOrZero(prevState.rotateTo + 5)
        : this.rotateToOrZero(prevState.rotateTo - 5)
    }));
  };

  handleIsLockedAtPoint = () => {
    clearInterval(this.animationInterval);
    this.setState(prevState => ({
      lastAnimatedRotateTo: prevState.rotateTo
    }));
  };

  rotateField = rotateTo => {
    const { animatedValue } = this.state;

    Animated.timing(animatedValue, {
      toValue: -rotateTo,
      duration: 0,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { animatedValue, rotateTo } = this.state;
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
            rotateTo={rotateTo}
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
