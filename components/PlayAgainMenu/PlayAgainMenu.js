import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class PlayAgainMenu extends Component {
  state = {
    animatedValue: new Animated.Value(0)
  };

  componentDidMount() {
    this.rotateDeathText();
  }

  rotateDeathText = () => {
    this.state.animatedValue.setValue(0);
    Animated.timing(this.state.animatedValue, {
      toValue: 360,
      duration: 3000,
      useNativeDriver: true
    }).start(() => this.rotateDeathText());
  };

  render() {
    const { animatedValue } = this.state;
    const interpolatedRotateAnimation = animatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "360deg"]
    });

    return (
      <View style={styles.container}>
        <View style={styles.spinnerAndButtonContainer}>
          <Animated.View
            style={{
              transform: [{ rotate: interpolatedRotateAnimation }]
            }}
          >
            <View style={styles.deadTextContainer}>
              <Text style={[{ color: "red" }, styles.deadText]}>Y</Text>
              <Text style={[{ color: "orange" }, styles.deadText]}>o</Text>
              <Text style={[{ color: "yellow" }, styles.deadText]}>u</Text>
              <Text> </Text>
              <Text style={[{ color: "green" }, styles.deadText]}>d</Text>
              <Text style={[{ color: "blue" }, styles.deadText]}>i</Text>
              <Text style={[{ color: "purple" }, styles.deadText]}>e</Text>
              <Text style={[{ color: "red" }, styles.deadText]}>d</Text>
              <Text style={[{ color: "orange" }, styles.deadText]}>!</Text>
            </View>
          </Animated.View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.props.handlePlayAgain}>
              <Text style={styles.button}>play again</Text>
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
    zIndex: 1
  },
  spinnerAndButtonContainer: {
    width: "75%",
    height: "50%",
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  deadTextContainer: {
    display: "flex",
    flexDirection: "row"
  },
  deadText: {
    fontSize: 30
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
