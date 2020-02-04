import React, { Component } from "react";
import { connect } from "react-redux";
import { updateActiveCellData } from "../../../../../reduxUtils/actions/actionCreators";
import PropTypes from "prop-types";
import { View } from "react-native";
import {
  getMazeData,
  getActiveCellData
} from "../../../../../helpers/mazeLogic";
import Maze from "./Maze/Maze";

const mazeData = getMazeData();

class PositionMaze extends Component {
  state = {
    mazePosition: [0, 0]
  };

  componentDidMount() {
    this.updateActiveCellData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { playerPosition } = prevProps;
    const { mazePosition } = prevState;

    if (
      playerPosition[0] !== this.props.playerPosition[0] ||
      playerPosition[1] !== this.props.playerPosition[1]
    ) {
      this.handlePlayerPositionUpdate(playerPosition);
    }

    if (
      mazePosition[0] !== this.state.mazePosition[0] ||
      mazePosition[1] !== this.state.mazePosition[1]
    ) {
      this.updateActiveCellData();
    }
  }

  updateActiveCellData = () => {
    const { layoutWidth } = this.props;
    const { mazePosition } = this.state;
    const activeCellData = getActiveCellData(
      mazePosition,
      layoutWidth,
      mazeData
    );
    this.props.updateActiveCellData(activeCellData);
  };

  handlePlayerPositionUpdate = playerPosition => {
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

PositionMaze.propTypes = {
  playerPosition: PropTypes.array.isRequired,
  layoutWidth: PropTypes.number.isRequired
};

const mapDispatchToProps = {
  updateActiveCellData
};

export default connect(null, mapDispatchToProps)(PositionMaze);
