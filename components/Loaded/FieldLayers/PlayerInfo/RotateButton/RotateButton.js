import React from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";

const handleOnPressIn = (updateOffsetHeading, rotateClockwise) => {
  updateOffsetHeading(rotateClockwise);
};

const RotateButton = ({ updateOffsetHeading, rotateClockwise, iconName }) => {
  return (
    <TouchableOpacity
      onPressIn={() => handleOnPressIn(updateOffsetHeading, rotateClockwise)}
      style={styles.rotateButton}
    >
      <Feather name={iconName} size={32} color="red" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rotateButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50
  }
});

RotateButton.propTypes = {
  updateOffsetHeading: PropTypes.func.isRequired,
  rotateClockwise: PropTypes.bool.isRequired,
  iconName: PropTypes.string.isRequired
};

export default RotateButton;
