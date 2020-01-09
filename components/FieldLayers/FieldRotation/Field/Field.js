import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { View } from "react-native";
import Enemy from "./Enemy/Enemy";
import { playerWidthAndHeight } from "../../../../constants/constants";

const playerPositionOffset = playerWidthAndHeight / 2;

const Field = ({ enemies, layoutWidth, updateEnemies, removeEnemy }) => {
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
            key={id}
            coords={coords}
            id={id}
            life={life}
            updateEnemies={updateEnemies}
            removeEnemy={removeEnemy}
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
          borderRadius: 20
        }}
      >
        <Image
          source={require("../../../../assets/images/yinyang.png")}
          style={{
            width: `100%`,
            height: `100%`
          }}
        />
      </View>
    </View>
  );
};

Field.propTypes = {
  layoutWidth: PropTypes.number.isRequired,
  enemies: PropTypes.array.isRequired,
  updateEnemies: PropTypes.func.isRequired,
  removeEnemy: PropTypes.func.isRequired
};

export default Field;
