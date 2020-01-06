import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { playerWidthAndHeight } from "../../../../../constants/constants";

const playerPositionOffset = playerWidthAndHeight / 2;

const Enemy = ({ coords }) => {
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
};

export default Enemy;

Enemy.propTypes = {
  coords: PropTypes.array.isRequired
};
