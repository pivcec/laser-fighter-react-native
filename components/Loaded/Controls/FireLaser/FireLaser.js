import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

const FireLaser = ({ handleOnPressIn, handleOnPressOut }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonBackground}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
        >
          <Image
            source={require("../../../../assets/images/luck.png")}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  buttonBackground: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DAA520",
    borderRadius: 60,
    height: 60,
    width: 60,
    borderWidth: 1
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 50,
    height: 50,
    width: 50
  },
  buttonImage: {
    width: 45,
    height: 45
  }
});

FireLaser.propTypes = {
  handleOnPressIn: PropTypes.func.isRequired,
  handleOnPressOut: PropTypes.func.isRequired
};

export default FireLaser;
