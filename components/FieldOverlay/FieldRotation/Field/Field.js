import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Enemy from "./Enemy/Enemy";
import { playerWidthAndHeight } from "../../../../constants/constants";

const playerPositionOffset = playerWidthAndHeight / 2;

const Field = props => {
  const { enemies, layoutWidth, playerLasers } = props;
  return (
    <View
      style={{
        height: layoutWidth,
        width: layoutWidth
      }}
    >
      {enemies.map(player => {
        const { coords, id } = player;
        return <Enemy key={id} coords={coords} />;
      })}

      <View
        style={{
          position: "absolute",
          top: `${50 - playerPositionOffset}%`,
          left: `${50 - playerPositionOffset}%`,
          width: `${playerWidthAndHeight}%`,
          height: `${playerWidthAndHeight}%`,
          backgroundColor: "blue",
          borderRadius: 20
        }}
      />
    </View>
  );
};

Field.propTypes = {
  layoutWidth: PropTypes.number.isRequired,
  enemyLasers: PropTypes.array.isRequired,
  enemies: PropTypes.array.isRequired
};

export default Field;
