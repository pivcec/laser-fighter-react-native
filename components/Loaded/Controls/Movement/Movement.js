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

const Cell = ({ directionKey, iconName, handleOnPressIn }) => (
  <View style={styles.cell}>
    <TouchableOpacity onPressIn={() => handleOnPressIn(directionKey)}>
      <Feather name={iconName} size={32} color="black" />
    </TouchableOpacity>
  </View>
);

const Movement = ({ handleOnPressIn }) => {
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        {movementData.map((row, i) => {
          return (
            <View style={styles.row} key={row[i].directionKey}>
              {row.map(({ directionKey, iconName }) => {
                if (directionKey !== null) {
                  return (
                    <Cell
                      key={directionKey}
                      directionKey={directionKey}
                      iconName={iconName}
                      handleOnPressIn={handleOnPressIn}
                    />
                  );
                }
                return <View key={directionKey} style={styles.emptyCell} />;
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
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "black"
  },
  emptyCell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "black"
  }
});

Movement.protTypes = {
  handleOnPressIn: PropTypes.func.isRequired
};

export default Movement;
