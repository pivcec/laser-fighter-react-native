import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Enemy from "./Enemy/Enemy";

const Field = ({
  enemies,
  layoutWidth,
  updateEnemies,
  removeEnemy,
  handleEnemyCollision,
  playerIsDead
}) => {
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
            handleEnemyCollision={handleEnemyCollision}
            playerIsDead={playerIsDead}
          />
        );
      })}
    </View>
  );
};

Field.propTypes = {
  layoutWidth: PropTypes.number.isRequired,
  enemies: PropTypes.array.isRequired,
  updateEnemies: PropTypes.func.isRequired,
  removeEnemy: PropTypes.func.isRequired,
  handleEnemyCollision: PropTypes.func.isRequired,
  playerIsDead: PropTypes.bool.isRequired
};

export default Field;
