import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import Field from "./Field/Field";

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
    const {
      enemies,
      layoutWidth,
      updateEnemies,
      removeEnemy,
      handleEnemyCollision
    } = this.props;

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
        <Field
          enemies={enemies}
          layoutWidth={layoutWidth}
          updateEnemies={updateEnemies}
          removeEnemy={removeEnemy}
          handleEnemyCollision={handleEnemyCollision}
        />
      </Animated.View>
    );
  }
}

FieldRotation.propTypes = {
  heading: PropTypes.number.isRequired,
  layoutWidth: PropTypes.number.isRequired,
  enemies: PropTypes.array.isRequired,
  updateEnemies: PropTypes.func.isRequired,
  removeEnemy: PropTypes.func.isRequired,
  handleEnemyCollision: PropTypes.func.isRequired
};

export default FieldRotation;
