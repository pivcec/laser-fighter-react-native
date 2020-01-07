import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { playerWidthAndHeight } from "../../../../../constants/constants";

const playerPositionOffset = playerWidthAndHeight / 2;

class Enemy extends Component {
  state = {
    enemyIsDying: false
  };

  componentDidUpdate(prevProps) {
    const { life } = prevProps;
    if (life && !this.props.life) {
      this.setState({ enemyIsDying: true }, this.handleRemoveEnemyFromData);
    }
  }

  handleRemoveEnemyFromData = () => {
    setTimeout(() => {
      console.warn("remove enemy from data");
    }, 1000);
  };

  render() {
    const { coords } = this.props;
    const { enemyIsDying } = this.state;
    if (!enemyIsDying) {
      return (
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
      );
    }
    return <View />;
  }
}

export default Enemy;

Enemy.propTypes = {
  coords: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  life: PropTypes.number.isRequired
};
