import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet } from "react-native";
import { playerWidthAndHeight } from "../../../../../../constants/constants";
import { Animated } from "react-native";

const playerPositionOffset = playerWidthAndHeight / 2;

class Enemy extends Component {
  state = {
    animatedValue: new Animated.Value(0)
  };

  enemySpinDuration = Math.floor(Math.random() * (2000 - 500) + 500);

  componentDidMount() {
    this.rotateEnemy();
  }

  componentDidUpdate(prevProps) {
    const { life, coords } = prevProps;
    const { playerIsDead } = this.props;

    if (life > 0 && this.props.life < 1) {
      this.handleRemoveEnemyFromData();
    }

    if (
      JSON.stringify(coords) !== JSON.stringify(this.props.coords) &&
      !playerIsDead
    ) {
      const { coords } = this.props;
      const top = coords[1] - playerPositionOffset;
      const left = coords[0] - playerPositionOffset;
      const bottom = top + playerWidthAndHeight;
      const right = left + playerWidthAndHeight;

      if (
        bottom > 50 - playerPositionOffset &&
        top < 50 + playerPositionOffset &&
        right > 50 - playerPositionOffset &&
        left < 50 + playerPositionOffset
      ) {
        this.props.handleEnemyCollision();
      }
    }
  }

  rotateEnemy = () => {
    this.state.animatedValue.setValue(0);
    Animated.timing(this.state.animatedValue, {
      toValue: 360,
      duration: this.enemySpinDuration,
      useNativeDriver: true
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
            zIndex: 1
          }}
        >
          <Image
            source={require("../../../../../../assets/images/eyeball.png")}
            style={styles.enemy}
          />
        </Animated.View>

        {life < 1 && (
          <Image
            source={require("../../../../../../assets/images/splosion.gif")}
            style={{
              position: "absolute",
              top: `${coords[1] - playerPositionOffset}%`,
              left: `${coords[0] - playerPositionOffset}%`,
              width: `${playerWidthAndHeight}%`,
              height: `${playerWidthAndHeight}%`,
              zIndex: 1
            }}
          />
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  enemy: {
    width: "100%",
    height: "100%"
  }
});

export default Enemy;

Enemy.propTypes = {
  coords: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  life: PropTypes.number.isRequired,
  updateEnemies: PropTypes.func.isRequired,
  removeEnemy: PropTypes.func.isRequired,
  handleEnemyCollision: PropTypes.func.isRequired,
  playerIsDead: PropTypes.bool.isRequired
};
