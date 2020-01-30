import React, { Component } from "react";
import { connect } from "react-redux";
import { updateActiveMazeZoneData } from "../../../../../reduxUtils/actions/actionCreators";
import PropTypes from "prop-types";
import { mazeWidthAndHeight } from "../../../../../constants/constants";
import { View } from "react-native";
import { getMazeData } from "../../../../../helpers/mazeLogic";
import Maze from "./Maze/Maze";

const mazeData = getMazeData();
const initialRowIndex = mazeWidthAndHeight - 2;
const initialColumnIndex = 1;

class MazeZone extends Component {
  state = {
    mazeZoneRowIndex: initialRowIndex,
    mazeZoneColumnIndex: initialColumnIndex,
    mazePosition: [0, 0]
  };

  componentDidUpdate(prevProps, prevState) {
    const { playerPosition } = prevProps;
    const { mazePosition, mazeZoneColumnIndex, mazeZoneRowIndex } = prevState;

    if (
      playerPosition[0] !== this.props.playerPosition[0] ||
      playerPosition[1] !== this.props.playerPosition[1]
    ) {
      this.handleUpdatedPlayerPosition(playerPosition);
    }

    if (
      mazePosition[0] !== this.state.mazePosition[0] ||
      mazePosition[1] !== this.state.mazePosition[1]
    ) {
      this.handleMazePositionUpdate();
    }

    if (
      mazeZoneColumnIndex !== this.state.mazeZoneColumnIndex ||
      mazeZoneRowIndex !== this.state.mazeZoneRowIndex
    ) {
      this.handleMazeZoneUpdate();
    }
  }

  handleUpdatedPlayerPosition = playerPosition => {
    const { mazePosition } = this.state;

    const playerMovementX = this.props.playerPosition[0] - playerPosition[0];
    const playerMovementY = this.props.playerPosition[1] - playerPosition[1];

    const updatedMazePosition = [
      mazePosition[0] + -playerMovementX,
      mazePosition[1] + -playerMovementY
    ];

    this.setState({
      mazePosition: updatedMazePosition
    });
  };

  handleMazePositionUpdate = () => {
    const { playerPosition, layoutWidth } = this.props;
    const { mazeZoneColumnIndex, mazeZoneRowIndex } = this.state;
    const cellWidth = layoutWidth / 3;
    const halfOfCellWidth = cellWidth / 2;
    const initialZone = {
      right: 50 + halfOfCellWidth,
      left: 50 - halfOfCellWidth,
      top: 50 + halfOfCellWidth,
      bottom: 50 - halfOfCellWidth
    };

    const playerIsInsideX =
      playerPosition[0] < initialZone.right &&
      playerPosition[0] > initialZone.left;

    const playerIsInsideY =
      playerPosition[1] < initialZone.top &&
      playerPosition[1] > initialZone.bottom;

    const newMazeZoneColumnIndex = playerIsInsideX
      ? initialColumnIndex
      : initialColumnIndex +
        this.multiplesOfCellWidthOutsideZone(playerPosition[0]);

    const newMazeZoneRowIndex = playerIsInsideY
      ? initialRowIndex
      : initialRowIndex +
        -this.multiplesOfCellWidthOutsideZone(playerPosition[1]);

    if (
      mazeZoneColumnIndex !== newMazeZoneColumnIndex ||
      mazeZoneRowIndex !== newMazeZoneRowIndex
    ) {
      this.setState({
        mazeZoneColumnIndex: newMazeZoneColumnIndex,
        mazeZoneRowIndex: newMazeZoneRowIndex
      });
    }
  };

  handleMazeZoneUpdate = () => {
    const { mazeZoneRowIndex, mazeZoneColumnIndex } = this.state;
    const newActiveMazeZoneData =
      mazeData[mazeZoneRowIndex][mazeZoneColumnIndex];
    this.props.updateActiveMazeZoneData({
      activeMazeZoneData: newActiveMazeZoneData
    });
  };

  multiplesOfCellWidthOutsideZone = playerPosition => {
    const { layoutWidth } = this.props;
    const cellWidth = layoutWidth / 3;
    const movementIsPositive = playerPosition > 0;
    const normalizedPlayerPosition = movementIsPositive
      ? playerPosition - cellWidth
      : Math.abs(playerPosition);
    const multiplesOfCellWidthOutsideInitialZone = Math.ceil(
      normalizedPlayerPosition / cellWidth
    );
    return movementIsPositive
      ? multiplesOfCellWidthOutsideInitialZone
      : -multiplesOfCellWidthOutsideInitialZone;
  };

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

const mapDispatchToProps = {
  updateActiveMazeZoneData
};

export default connect(null, mapDispatchToProps)(MazeZone);
