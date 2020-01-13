import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Asset } from "expo-asset";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import Svg, { Line } from "react-native-svg";
import { vh, vw } from "react-native-expo-viewport-units";
import { getRotatedEnemyCoords } from "../../../../../helpers/coordsCalculations";
import {
  playerWidthAndHeight,
  playerLaserChargeTime
} from "../../../../../constants/constants";

const laserFire = Asset.fromModule(
  require("../../../../../assets/sounds/laserFire.wav")
);

const enemyPain = Asset.fromModule(
  require("../../../../../assets/sounds/enemyPain.wav")
);
const playerPositionOffset = playerWidthAndHeight / 2;

export default class PlayerLaser extends Component {
  state = {
    animatedValue: new Animated.Value(0),
    laserPower: null,
    firstEnemyWithinPathOfLaser: null
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      playerLaserCharge: { isCharging, timestamp }
    } = prevProps;
    const { laserPower } = prevState;

    if (isCharging && !this.props.playerLaserCharge.isCharging) {
      const { heading, enemies } = this.props;
      const timeDiff = this.props.playerLaserCharge.timestamp - timestamp;
      const chargePercentage = (timeDiff / playerLaserChargeTime) * 100;
      const laserPower = chargePercentage > 100 ? 100 : chargePercentage;
      const rotatedEnemyCoords = getRotatedEnemyCoords(heading, enemies);
      const enemiesWithinPathOfLaser = this.getEnemiesWithinPathOfLaser(
        rotatedEnemyCoords
      );
      const firstEnemyWithinPathOfLaser =
        enemiesWithinPathOfLaser.length > 0
          ? this.getFirstEnemyWithinPathOfLaser(enemiesWithinPathOfLaser)
          : null;
      this.setState({
        laserPower: Math.floor(laserPower),
        firstEnemyWithinPathOfLaser
      });
    }

    if (!laserPower && this.state.laserPower) {
      this.handlePlayerLaserFire();
    }

    if (laserPower && !this.state.laserPower) {
      this.animatePlayerLaser();
    }
  }

  handlePlayerLaserFire = () => {
    const { laserPower, firstEnemyWithinPathOfLaser } = this.state;
    this.props.playSound(laserFire);
    this.animatePlayerLaser();
    if (firstEnemyWithinPathOfLaser) {
      this.handleLaserCollision(laserPower, firstEnemyWithinPathOfLaser);
    }
  };

  animatePlayerLaser = () => {
    const { animatedValue, laserPower } = this.state;
    Animated.timing(animatedValue, {
      toValue: laserPower ? 1 : 0,
      duration: 50,
      useNativeDriver: true
    }).start(() => this.handleEndPlayerLaser(laserPower));
  };

  handleEndPlayerLaser = laserPower => {
    if (laserPower) {
      this.setState({ laserPower: null, firstEnemyWithinPathOfLaser: null });
    }
  };

  handleLaserCollision = (laserPower, { id }) => {
    const { enemies } = this.props;
    const enemyHitByLaser = enemies.find(enemy => enemy.id === id);

    const updatedEnemy = {
      ...enemyHitByLaser,
      life: enemyHitByLaser.life - laserPower
    };

    this.props.updateEnemy(updatedEnemy);
    this.props.playSound(enemyPain);
  };

  normalizeCoord = (coord, width, layoutWidth) => {
    return ((coord + width / 2) / layoutWidth) * 100;
  };

  getFirstEnemyWithinPathOfLaser = enemiesWithinPathOfLaser => {
    return enemiesWithinPathOfLaser.reduce((acc, enemy) => {
      if (acc.hasOwnProperty("coords")) {
        if (enemy.coords[1] > acc.coords[1]) {
          return enemy;
        }
        return acc;
      }
      return enemy;
    }, {});
  };

  getEnemiesWithinPathOfLaser = rotatedEnemyCoords => {
    return rotatedEnemyCoords.reduce((acc, enemy) => {
      if (this.checkIfEnemyIsWithinPathOfLaser(enemy)) {
        acc.push(enemy);
      }
      return acc;
    }, []);
  };

  checkIfEnemyIsWithinPathOfLaser = enemy => {
    const { coords } = enemy;
    const x = coords[0];
    const y = coords[1];
    const leftEdge = x - playerPositionOffset;
    const rightEdge = x + playerPositionOffset;
    const topEdge = y - playerPositionOffset;
    if (topEdge < 50 && leftEdge <= 50 && rightEdge >= 50) {
      return true;
    }
    return false;
  };

  render() {
    const { layoutWidth } = this.props;
    const {
      laserPower,
      firstEnemyWithinPathOfLaser,
      animatedValue
    } = this.state;
    const y2 = firstEnemyWithinPathOfLaser
      ? firstEnemyWithinPathOfLaser.coords[1]
      : 0;
    const animatedStyle = {
      opacity: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };

    return (
      <Animated.View style={[styles.playerLaser, animatedStyle]}>
        <Svg height={layoutWidth} width={layoutWidth}>
          {laserPower && (
            <Line
              x1="50%"
              y1="50%"
              x2="50%"
              y2={`${y2}%`}
              stroke="red"
              strokeWidth="2"
            />
          )}
        </Svg>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  playerLaser: {
    position: "absolute",
    top: 0,
    width: vw(100),
    height: vh(100)
  }
});

PlayerLaser.propTypes = {
  playerLaserCharge: PropTypes.object.isRequired,
  heading: PropTypes.number.isRequired,
  updateEnemy: PropTypes.func.isRequired,
  playSound: PropTypes.func.isRequired,
  enemies: PropTypes.array.isRequired
};
