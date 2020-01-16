import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const getNewCoords = (coords, direction) => {
  if (direction === "up") {
    return { latitude: coords.latitude + 0.0001, longitude: coords.longitude };
  } else if (direction === "down") {
    return { latitude: coords.latitude - 0.0001, longitude: coords.longitude };
  } else if (direction === "left") {
    return { latitude: coords.latitude, longitude: coords.longitude + 0.0001 };
  }
  return { latitude: coords.latitude, longitude: coords.longitude - 0.0001 };
};

const handleOnPressIn = (coords, direction, updateLocation) => {
  const newCoords = getNewCoords(coords, direction);
  const locationObject = {
    coords: newCoords
  };
  updateLocation(locationObject);
};

const MockMovement = ({ coords, updateLocation, heading }) => {
  return (
    <>
      <View>
        <Text>{`player heading: ${heading}`}</Text>
        {/*<Text>{`player lat: ${coords.latitude}`}</Text>*/}
        {/*<Text>{`player lng: ${coords.longitude}`}</Text>*/}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={() => handleOnPressIn(coords, "up", updateLocation)}
        >
          <Text>↑</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPressIn={() => handleOnPressIn(coords, "down", updateLocation)}
        >
          <Text>↓</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPressIn={() => handleOnPressIn(coords, "left", updateLocation)}
        >
          <Text>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPressIn={() => handleOnPressIn(coords, "right", updateLocation)}
        >
          <Text>→</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: {
    margin: 10,
    display: "flex",
    flexDirection: "row"
  },
  button: {
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    height: 20,
    width: 20
  }
});

MockMovement.propTypes = {
  heading: PropTypes.number.isRequired,
  coords: PropTypes.object.isRequired,
  updateLocation: PropTypes.func.isRequired
};

export default MockMovement;
