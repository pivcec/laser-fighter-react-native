import React, { Component, memo } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { getMazeData } from "../../../../../../helpers/mazeLogic";
import { getPositionRotatedAroundPrevious } from "../../../../../../helpers/coordsCalculations";
import Maze from "./Maze/Maze";

const mazeData = getMazeData();

class MazeZone extends Component {
  state = {
    // activeMazeZone: [0, 0]
    mazePosition: [0, 0]
  };

  componentDidUpdate(prevProps) {
    const { playerPosition } = prevProps;
    if (
      playerPosition[0] !== this.props.playerPosition[0] ||
      playerPosition[1] !== this.props.playerPosition[1]
    ) {
      this.handleUpdatedPlayerPosition(playerPosition);
    }
  }

  handleUpdatedPlayerPosition = playerPosition => {
    const { mazePosition } = this.state;
    const { rotateTo } = this.props;

    const rotatedPlayerPosition = getPositionRotatedAroundPrevious(
      playerPosition[0],
      playerPosition[1],
      this.props.playerPosition[0],
      this.props.playerPosition[1],
      -rotateTo
    );

    const playerMovementX = rotatedPlayerPosition[0] - playerPosition[0];
    const playerMovementY = rotatedPlayerPosition[1] - playerPosition[1];

    const updatedMazePosition = [
      mazePosition[0] + -playerMovementX,
      mazePosition[1] + -playerMovementY
    ];

    this.setState({
      mazePosition: updatedMazePosition
    });
  };

  render() {
    const { layoutWidth } = this.props;
    const { mazePosition } = this.state;
    return (
      <View
        style={{
          position: "absolute",
          left: mazePosition[0],
          bottom: mazePosition[1],
          zIndex: 1
        }}
      >
        <Maze mazeData={mazeData} layoutWidth={layoutWidth} />
      </View>
    );
  }
}

MazeZone.propTypes = {
  playerPosition: PropTypes.array.isRequired,
  layoutWidth: PropTypes.number.isRequired,
  rotateTo: PropTypes.number.isRequired
};

export default MazeZone;
