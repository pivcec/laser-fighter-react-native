import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import Grid from "./Grid/Grid";
import PlayerLaser from "./PlayerLaser/PlayerLaser";
import FieldRotation from "./FieldRotation/FieldRotation";

export default class Overlay extends Component {
  state = {
    width: null,
    height: null,
    gridLinesX: [],
    gridLinesY: []
  };

  componentDidUpdate(prevProps, prevState) {
    const { width, height } = prevState;
    if (!width && !height && this.state.width && this.state.height) {
      this.createGridData();
    }
  }

  findDimensions = e => {
    const {
      nativeEvent: {
        layout: { width, height }
      }
    } = e;
    this.setState({
      width,
      height
    });
  };

  createGridData = () => {
    const { width, height } = this.state;
    const cellWidthOrHeight = width / 10;

    let gridLinesX = [];
    let gridLinesY = [];
    let i;

    for (i = 0; i <= height; i = i + cellWidthOrHeight) {
      if (i <= width) {
        gridLinesX.push(i);
      }
      gridLinesY.push(i);
    }

    this.setState({ gridLinesX, gridLinesY });
  };

  render() {
    const { heading, enemyLasers, playerLaserIsFiring } = this.props;
    const { width, height, gridLinesX, gridLinesY } = this.state;

    return (
      <View
        style={styles.container}
        onLayout={e => {
          this.findDimensions(e);
        }}
        style={styles.container}
      >
        {height && (
          <>
            <Grid
              height={height}
              width={width}
              gridLinesX={gridLinesX}
              gridLinesY={gridLinesY}
            />
            <PlayerLaser
              height={height}
              width={width}
              playerLaserIsFiring={playerLaserIsFiring}
              heading={heading}
            />
            <FieldRotation
              heading={heading}
              height={height}
              enemyLasers={enemyLasers}
            />
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  }
});

Overlay.propTypes = {
  heading: PropTypes.number.isRequired,
  enemyLasers: PropTypes.array.isRequired,
  playerLaserIsFiring: PropTypes.bool.isRequired,
  heading: PropTypes.number.isRequired
};
