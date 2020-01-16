import React, { Component } from "react";
import PropTypes from "prop-types";
import { getRandomNumberToLimit } from "../../../../../../helpers/utils";
import { View, Image, StyleSheet } from "react-native";
import { playerWidthAndHeight } from "../../../../../../constants/constants";
import { Animated } from "react-native";
// import AnimatedImageSeries from "./AnimatedImageSeries/AnimatedImageSeries";

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
    const { position, enemyIsDead } = prevProps;
    const { playerIsDead } = this.props;

    if (
      JSON.stringify(position) !== JSON.stringify(this.props.position) &&
      !playerIsDead &&
      !enemyIsDead
    ) {
      const { position } = this.props;
      const top = position[1] - playerPositionOffset;
      const left = position[0] - playerPositionOffset;
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

    if (!enemyIsDead && this.props.enemyIsDead) {
      this.handleEnemyIsDead();
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

  handleGenerateChiToken = position => {
    const zeroToNine = getRandomNumberToLimit(9);
    if (zeroToNine === 0) {
      console.warn("generate token in this position", position);
    }
  };

  handleEnemyIsDead = () => {
    const { id, position, removeEnemy } = this.props;
    setTimeout(() => {
      removeEnemy(id);
      this.handleGenerateChiToken(position);
    }, 1000);
  };

  render() {
    const { position, enemyIsDead } = this.props;
    const { animatedValue } = this.state;
    const interpolatedRotateAnimation = animatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ["360deg", "0deg"]
    });
    return (
      <>
        {!enemyIsDead && (
          <Animated.View
            style={{
              transform: [{ rotate: interpolatedRotateAnimation }],
              position: "absolute",
              top: `${position[1] - playerPositionOffset}%`,
              left: `${position[0] - playerPositionOffset}%`,
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
        )}

        {enemyIsDead && (
          <View
            style={{
              position: "absolute",
              top: `${position[1] - playerPositionOffset}%`,
              left: `${position[0] - playerPositionOffset}%`,
              width: `${playerWidthAndHeight}%`,
              height: `${playerWidthAndHeight}%`,
              zIndex: 1
            }}
          >
            <Image
              source={require("../../../../../../assets/images/splosion.gif")}
              style={styles.enemy}
            />
            {/*<AnimatedImageSeries removeEnemy={removeEnemy} id={id} />*/}
          </View>
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
  position: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  enemyIsDead: PropTypes.bool.isRequired,
  updateEnemies: PropTypes.func.isRequired,
  removeEnemy: PropTypes.func.isRequired,
  handleEnemyCollision: PropTypes.func.isRequired,
  playerIsDead: PropTypes.bool.isRequired
};
