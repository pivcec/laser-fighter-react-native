import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

export default Charger = props => {
  const { buttonIsPressed, laserCharge } = props;
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          height: "100%",
          width: `${laserCharge}%`,
          backgroundColor: buttonIsPressed ? "red" : "black"
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "black"
  }
});

Charger.propTypes = {
  buttonIsPressed: PropTypes.bool.isRequired,
  laserCharge: PropTypes.number.isRequired
};
