import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { playerWidthAndHeight } from "../../../../../../constants/constants";
import { getRandomNumberToLimit } from "../../../../../../helpers/utils";
import { getNewChiToken } from "../../../../../../helpers/chiTokenLogic";
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

  handleEnemyIsDead = () => {
    const { id } = this.props;
    setTimeout(() => {
      this.handleGenerateChiToken();
      this.props.removeEnemy(id);
    }, 1000);
  };

  handleGenerateChiToken = () => {
    const { chiTokens, position } = this.props;
    /*
    const zeroToNine = getRandomNumberToLimit(9);
    if (zeroToNine === 0) {
      console.warn("generate token in this position", position);
    }
    */
    const newChiToken = getNewChiToken(position);
    this.props.updateChiTokens([...chiTokens, newChiToken]);
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
              top: `${position[1] - playerPositionOffset}%`,
              left: `${position[0] - playerPositionOffset}%`,
              width: `${playerWidthAndHeight}%`,
              height: `${playerWidthAndHeight}%`
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
  playerIsDead: PropTypes.bool.isRequired,
  chiTokens: PropTypes.array.isRequired,
  updateChiTokens: PropTypes.func.isRequired
};
