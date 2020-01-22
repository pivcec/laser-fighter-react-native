import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const movementData = [
  [
    { directionKey: 0, iconName: "arrow-up-left" },
    { directionKey: 1, iconName: "arrow-up" },
    { directionKey: 2, iconName: "arrow-up-right" }
  ],
  [
    { directionKey: 3, iconName: "arrow-left" },
    { directionKey: null, iconName: null },
    { directionKey: 4, iconName: "arrow-right" }
  ],
  [
    { directionKey: 5, iconName: "arrow-down-left" },
    { directionKey: 6, iconName: "arrow-down" },
    { directionKey: 7, iconName: "arrow-down-right" }
  ]
];

const Movement = ({ handleOnPressIn, handleOnPressOut }) => {
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        {movementData.map(row => {
          return (
            <View style={styles.row}>
              {row.map(({ directionKey, iconName }) => {
                return (
                  <View key={directionKey} style={styles.cell}>
                    <TouchableOpacity
                      onPressIn={() => handleOnPressIn(directionKey)}
                      onPressOut={() => handleOnPressOut(directionKey)}
                    >
                      <Feather name={iconName} size={32} color="black" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    flex: 2
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    backgroundColor: "#DAA520",
    borderWidth: 1,
    borderColor: "black"
  },
  row: { display: "flex", flexDirection: "row" },
  cell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    backgroundColor: "red"
  }
});

Movement.protTypes = {
  handleOnPressIn: PropTypes.func.isRequired,
  handleOnPressOut: PropTypes.func.isRequired
};

export default Movement;
