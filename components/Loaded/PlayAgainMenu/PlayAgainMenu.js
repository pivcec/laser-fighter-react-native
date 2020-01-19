import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PlayAgainMenu = ({ handlePlayAgain }) => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>you are dead</Text>
        </View>
        <View style={styles.lotusContainer}>
          <Image
            source={require("../../../assets/images/lotus.png")}
            style={styles.player}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlePlayAgain}>
            <Text style={styles.button}>reincarnate now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlayAgainMenu;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    zIndex: 1
  },
  overlay: {
    width: "75%",
    height: "50%",
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  message: {
    color: "white"
  },
  messageContainer: {
    position: "absolute",
    top: 0
  },
  lotusContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0
  },
  button: {
    color: "white",
    margin: 5
  }
});

PlayAgainMenu.propTypes = {
  handlePlayAgain: PropTypes.func.isRequired
};
