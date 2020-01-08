import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { playerWidthAndHeight } from "../../../../../constants/constants";

const playerPositionOffset = playerWidthAndHeight / 2;

class Enemy extends Component {
  componentDidUpdate(prevProps) {
    const { life } = prevProps;
    if (life > 0 && this.props.life < 1) {
      this.handleRemoveEnemyFromData();
    }
  }

  handleRemoveEnemyFromData = () => {
    const { enemies, id } = this.props;
    const newEnemies = enemies.filter(enemy => enemy.id !== id);
    setTimeout(() => {
      this.props.updateEnemies(newEnemies);
    }, 1000);
  };

  render() {
    const { coords, life } = this.props;
    return (
      <>
        <View
          style={{
            position: "absolute",
            top: `${coords[1] - playerPositionOffset}%`,
            left: `${coords[0] - playerPositionOffset}%`,
            width: `${playerWidthAndHeight}%`,
            height: `${playerWidthAndHeight}%`,
            backgroundColor: "red",
            borderRadius: 20,
            zIndex: 1
          }}
        />

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
  enemies: PropTypes.array.isRequired,
  coords: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  life: PropTypes.number.isRequired,
  updateEnemies: PropTypes.func.isRequired
};
