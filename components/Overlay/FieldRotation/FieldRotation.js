import React, { Component } from "react";
import { connect } from "react-redux";
import { createRefToPlayer } from "../../../reduxUtils/actions/actionCreators";
import PropTypes from "prop-types";
import { StyleSheet, View, Animated } from "react-native";
import { vh } from "react-native-expo-viewport-units";
import Field from "./Field/Field";

class FieldRotation extends Component {
  state = {
    animatedValue: new Animated.Value(0)
  };

  componentDidMount() {
    this.rotateGrid();
  }

  componentDidUpdate(prevProps) {
    const { heading } = prevProps;

    if (heading !== this.props.heading) {
      this.rotateGrid();
    }
  }

  rotateGrid = () => {
    const { animatedValue } = this.state;

    Animated.timing(animatedValue, {
      toValue: this.props.heading,
      duration: 0,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { animatedValue } = this.state;
    const { height, enemyLasers } = this.props;

    const interpolatedRotateAnimation = animatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ["360deg", "0deg"]
    });

    return (
      <Animated.View
        style={[
          styles.rotator,
          {
            transform: [{ rotate: interpolatedRotateAnimation }]
          }
        ]}
      >
        <Field height={height} enemyLasers={enemyLasers} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  rotator: {
    zIndex: 1,
    width: vh(100),
    height: vh(100)
  }
});

FieldRotation.propTypes = {
  heading: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  enemyLasers: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    refsToPlayers: state.players.refsToPlayers
  };
};

const mapDispatchToProps = {
  createRefToPlayer
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldRotation);
