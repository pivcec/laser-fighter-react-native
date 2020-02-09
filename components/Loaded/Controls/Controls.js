import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import rustyMetal from "../../../assets/images/rusty.jpg";
import RotateButton from "./RotateButton/RotateButton";
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
    const { playerLaserIsCharging, heading, updateOffsetHeading } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.rotateContainer}>
          <View style={styles.rotateLeft}>
            <RotateButton
              updateOffsetHeading={updateOffsetHeading}
              rotateClockwise={true}
              iconName={"rotate-ccw"}
            />
          </View>
          <View style={styles.rotateRight}>
            <RotateButton
              updateOffsetHeading={updateOffsetHeading}
              rotateClockwise={false}
              iconName={"rotate-cw"}
            />
          </View>
        </View>
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
  },
  rotateContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black"
  },
  rotateLeft: { flex: 1, alignItems: "flex-start" },
  rotateRight: { flex: 1, alignItems: "flex-end" }
});

Controls.propTypes = {
  playerIsDead: PropTypes.bool.isRequired,
  playerPosition: PropTypes.array.isRequired,
  playerLaserIsCharging: PropTypes.bool.isRequired,
  togglePlayerLaserIsCharging: PropTypes.func.isRequired,
  heading: PropTypes.number.isRequired,
  updateOffsetHeading: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    activeCellData: state.mazePosition.activeCellData
  };
};

export default connect(mapStateToProps)(Controls);
