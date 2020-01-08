import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Enemy from "./Enemy/Enemy";
import { playerWidthAndHeight } from "../../../../constants/constants";

const playerPositionOffset = playerWidthAndHeight / 2;

const Field = ({ enemies, layoutWidth, updateEnemies }) => {
  return (
    <View
      style={{
        height: layoutWidth,
        width: layoutWidth
      }}
    >
      {enemies.map(({ coords, id, life }) => {
        return (
          <Enemy
            enemies={enemies}
            key={id}
            coords={coords}
            id={id}
            life={life}
            updateEnemies={updateEnemies}
          />
        );
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
  enemies: PropTypes.array.isRequired,
  updateEnemies: PropTypes.func.isRequired
};

export default Field;
