import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Asset } from "expo-asset";
import PropTypes from "prop-types";
import Svg, { Line } from "react-native-svg";
import { vh, vw } from "react-native-expo-viewport-units";
import { getRotatedEnemyCoords } from "../../../helpers/getRotatedEnemyCoords";
import { playerWidthAndHeight } from "../../../constants/constants";

const buzz = Asset.fromModule(require("../../../assets/sounds/buzz.wav"));
const playerPositionOffset = playerWidthAndHeight / 2;

export default class PlayerLaser extends Component {
  state = {
    firstEnemyWithinPathOfLaser: null
  };

  componentDidUpdate(prevProps) {
    const { playerLaserIsFiring } = prevProps;

    if (!playerLaserIsFiring && this.props.playerLaserIsFiring) {
      this.handlePlayerLaserFireStart();
    }

    if (playerLaserIsFiring && !this.props.playerLaserIsFiring) {
      this.setState({
        firstEnemyWithinPathOfLaser: null
      });
    }
  }

  handlePlayerLaserFireStart = () => {
    const { heading, enemies } = this.props;
    const rotatedEnemyCoords = getRotatedEnemyCoords(heading, enemies);
    const enemiesWithinPathOfLaser = this.getEnemiesWithinPathOfLaser(
      rotatedEnemyCoords
    );
    const firstEnemyWithinPathOfLaser =
      enemiesWithinPathOfLaser.length > 0
        ? this.getFirstEnemyWithinPathOfLaser(enemiesWithinPathOfLaser)
        : null;

    this.setState({
      firstEnemyWithinPathOfLaser
    });

    if (firstEnemyWithinPathOfLaser) {
      this.handleLaserCollision(firstEnemyWithinPathOfLaser);
    }
  };

  handleLaserCollision = ({ id }) => {
    const { laserCharge, enemies } = this.props;
    const enemyHitByLaser = enemies.find(enemy => enemy.id === id);

    const updatedEnemy = {
      ...enemyHitByLaser,
      life: enemyHitByLaser.life - laserCharge
    };

    this.props.updateEnemy(updatedEnemy);
    this.props.playSound(buzz);
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
    const { layoutWidth, playerLaserIsFiring } = this.props;
    const { firstEnemyWithinPathOfLaser } = this.state;
    const y2 = firstEnemyWithinPathOfLaser
      ? firstEnemyWithinPathOfLaser.coords[1]
      : 0;
    return (
      <View style={styles.playerLaser}>
        <Svg height={layoutWidth} width={layoutWidth}>
          {playerLaserIsFiring && (
            <Line
              x1="50%"
              y1="50%"
              x2="50%"
              y2={`${y2}%`}
              stroke="red"
              strokeWidth="3"
            />
          )}
        </Svg>
      </View>
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
  playerLaserIsFiring: PropTypes.bool.isRequired,
  heading: PropTypes.number.isRequired,
  updateEnemy: PropTypes.func.isRequired,
  laserCharge: PropTypes.number.isRequired,
  playSound: PropTypes.func.isRequired,
  enemies: PropTypes.array.isRequired
};
