import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { playerWidthAndHeight } from "../../../../constants/constants";
import dummyData from "../../../../resources/dummyData";

const playerPositionOffset = playerWidthAndHeight / 2;

const Field = props => {
  const { layoutWidth, playerLasers } = props;
  return (
    <View
      style={{
        height: layoutWidth,
        width: layoutWidth
      }}
    >
      {dummyData.map(player => {
        const { coords, id } = player;
        return (
          <View
            key={id}
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
  enemyLasers: PropTypes.array.isRequired
};

export default Field;
