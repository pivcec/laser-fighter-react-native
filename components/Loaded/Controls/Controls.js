import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import rustyMetal from "../../../assets/images/rusty.jpg";
import Charger from "./Charger/Charger";
import FireLaser from "./FireLaser/FireLaser";

class Controls extends Component {
  state = {
    fireLaserButtonIsPressed: false
  };

  componentDidUpdate(prevProps, prevState) {
    const { fireLaserButtonIsPressed } = prevState;

    if (!fireLaserButtonIsPressed && this.state.fireLaserButtonIsPressed) {
      this.props.togglePlayerLaserIsCharging(true);
    }

    if (fireLaserButtonIsPressed && !this.state.fireLaserButtonIsPressed) {
      this.props.togglePlayerLaserIsCharging(false);
    }

    if (this.state.fireLaserButtonIsPressed && this.props.playerIsDead) {
      this.handleFireLaserOnPressOut();
    }
  }

  handleFireLaserOnPressIn = () => {
    this.setState({ fireLaserButtonIsPressed: true });
  };

  handleFireLaserOnPressOut = () => {
    this.setState({ fireLaserButtonIsPressed: false });
  };

  render() {
    const { playerLaserIsCharging, heading } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.chargerContainer}>
          <Charger playerLaserIsCharging={playerLaserIsCharging} />
        </View>
        <ImageBackground source={rustyMetal} style={styles.imageBackground}>
          <FireLaser
            handleOnPressIn={this.handleFireLaserOnPressIn}
            handleOnPressOut={this.handleFireLaserOnPressOut}
          />
        </ImageBackground>
        {/* <Text style={{ color: "white" }}>{heading}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  chargerContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: "black"
  },
  imageBackground: {
    flex: 3,
    width: "100%",
    height: "100%",
    flexDirection: "row"
  }
});

Controls.propTypes = {
  playerIsDead: PropTypes.bool.isRequired,
  playerPosition: PropTypes.array.isRequired,
  // updatePlayerPositionRotated: PropTypes.func.isRequired,
  playerLaserIsCharging: PropTypes.bool.isRequired,
  togglePlayerLaserIsCharging: PropTypes.func.isRequired,
  heading: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    activeMazeZoneData: state.mazeZone.activeMazeZoneData
  };
};

export default connect(mapStateToProps)(Controls);
