import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { enemyWidthAndHeight } from "../../../../../../constants/constants";
import { checkForCollisionWithPlayer } from "../../../../../../helpers/playerLogic";
import { Animated } from "react-native";
import exactMath from "exact-math";
// import AnimatedImageSeries from "./AnimatedImageSeries/AnimatedImageSeries";

const enemyPositionOffset = exactMath.div(enemyWidthAndHeight, 2);

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
      (position[0] !== this.props.position[0] ||
        position[1] !== this.props.position[1]) &&
      !playerIsDead &&
      !enemyIsDead
    ) {
      const hasCollided = checkForCollisionWithPlayer([
        this.props.position[0] - enemyPositionOffset,
        this.props.position[1] - enemyPositionOffset
      ]);
      if (hasCollided) {
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

  handleEnemyIsDead = () => {
    const { id } = this.props;
    setTimeout(() => {
      this.props.removeEnemy(id);
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
              top: `${position[1] - enemyPositionOffset}%`,
              left: `${position[0] - enemyPositionOffset}%`,
              width: `${enemyWidthAndHeight}%`,
              height: `${enemyWidthAndHeight}%`,
              zIndex: 2
            }}
          >
            <Image
              source={require("../../../../../../assets/images/eyeball.png")}
              style={{
                width: `100%`,
                height: `100%`
              }}
            />
          </Animated.View>
        )}

        {enemyIsDead && (
          <View
            style={{
              position: "absolute",
              top: `${position[1] - enemyPositionOffset}%`,
              left: `${position[0] - enemyPositionOffset}%`,
              width: `${enemyWidthAndHeight}%`,
              height: `${enemyWidthAndHeight}%`,
              zIndex: 2
            }}
          >
            <Image
              source={require("../../../../../../assets/images/splosion.gif")}
              style={{
                width: `100%`,
                height: `100%`
              }}
            />
            {/*<AnimatedImageSeries removeEnemy={removeEnemy} id={id} />*/}
          </View>
        )}
      </>
    );
  }
}

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
