import React from "react";
import { StyleSheet, View } from "react-native";

export default TopMenu = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 2,
    height: 20,
    width: "100%",
    backgroundColor: "white"
  }
});
