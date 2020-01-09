import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { playerWidthAndHeight } from "../../../../../constants/constants";
import { Animated } from "react-native";

const playerPositionOffset = playerWidthAndHeight / 2;

class Enemy extends Component {
  state = {
    animatedValue: new Animated.Value(0)
  };

  componentDidMount() {
    this.rotateEnemy();
  }

  componentDidUpdate(prevProps) {
    const { life } = prevProps;
    if (life > 0 && this.props.life < 1) {
      this.handleRemoveEnemyFromData();
    }
  }

  rotateEnemy = () => {
    this.state.animatedValue.setValue(0);
    Animated.timing(this.state.animatedValue, {
      toValue: 360,
      duration: 500
    }).start(() => this.rotateEnemy());
  };

  handleRemoveEnemyFromData = () => {
    const { id } = this.props;
    setTimeout(() => {
      this.props.removeEnemy(id);
    }, 1000);
  };

  render() {
    const { coords, life } = this.props;
    const { animatedValue } = this.state;
    const interpolatedRotateAnimation = animatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ["360deg", "0deg"]
    });
    return (
      <>
        <Animated.View
          style={{
            transform: [{ rotate: interpolatedRotateAnimation }],
            position: "absolute",
            top: `${coords[1] - playerPositionOffset}%`,
            left: `${coords[0] - playerPositionOffset}%`,
            width: `${playerWidthAndHeight}%`,
            height: `${playerWidthAndHeight}%`,
            zIndex: 2
          }}
        >
          <Image
            source={require("../../../../../assets/images/eyeball.png")}
            style={{
              width: `100%`,
              height: `100%`
            }}
          />
        </Animated.View>

        {life < 1 && (
          <Image
            source={require("../../../../../assets/images/splosion.gif")}
            style={{
              position: "absolute",
              top: `${coords[1] - playerPositionOffset}%`,
              left: `${coords[0] - playerPositionOffset}%`,
              width: `${playerWidthAndHeight}%`,
              height: `${playerWidthAndHeight}%`,
              zIndex: 2
            }}
          />
        )}
      </>
    );
  }
}

export default Enemy;

Enemy.propTypes = {
  coords: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  life: PropTypes.number.isRequired,
  updateEnemies: PropTypes.func.isRequired,
  removeEnemy: PropTypes.func.isRequired
};
