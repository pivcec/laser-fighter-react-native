import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated, Easing } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class PlayAgainMenu extends Component {
  animatedValue = new Animated.Value(0);

  componentDidMount() {
    this.scaleView();
  }

  scaleView = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.bounce,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { handlePlayAgain } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.overlay}>
          {/*
          <View style={styles.messageContainer}>
            <Text style={styles.message}>you died, loser</Text>
          </View>
          */}
          <View style={styles.lotusContainer}>
            <Animated.Image
              source={require("../../../assets/images/lotus.png")}
              style={{
                transform: [
                  {
                    translateX: this.animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1]
                    })
                  },
                  {
                    translateY: this.animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1]
                    })
                  },
                  {
                    scaleX: this.animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.2, 0.8]
                    })
                  },
                  {
                    scaleY: this.animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.2, 0.8]
                    })
                  }
                ]
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlePlayAgain}>
              <Text style={styles.button}>reincarnate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default PlayAgainMenu;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1
  },
  overlay: {
    width: "75%",
    height: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  /*
  message: {
    color: "white"
  },
  messageContainer: {
    position: "absolute",
    top: 0
  },
  */
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
