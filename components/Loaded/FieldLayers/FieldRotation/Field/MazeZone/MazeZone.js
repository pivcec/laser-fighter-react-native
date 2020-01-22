import React, { Component, memo } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import {
  getMazeData,
  getUpdatedMazePosition
} from "../../../../../../helpers/mazeLogic";
import Maze from "./Maze/Maze";

const mazeData = getMazeData();

class MazeZone extends Component {
  state = {
    // activeMazeZone: [0, 0]
    mazePosition: [0, 0]
  };

  componentDidUpdate(prevProps, prevState) {
    const { playerPosition } = prevProps;
    if (
      playerPosition[0] !== this.props.playerPosition[0] ||
      playerPosition[1] !== playerPosition[1]
    ) {
      const updatedMazePosition = getUpdatedMazePosition(
        this.state.mazePosition,
        playerPosition,
        this.props.playerPosition
      );
      this.setState({
        mazePosition: updatedMazePosition
      });
    }
  }

  render() {
    const { layoutWidth } = this.props;
    const { mazePosition } = this.state;
    return (
      <View
        style={{
          position: "absolute",
          left: mazePosition[0],
          bottom: mazePosition[1]
        }}
      >
        <Maze mazeData={mazeData} layoutWidth={layoutWidth} />
      </View>
    );
  }
}

MazeZone.propTypes = {
  playerPosition: PropTypes.array.isRequired,
  layoutWidth: PropTypes.number.isRequired
};

export default MazeZone;
