import React, { Component } from "react";
import { connect } from "react-redux";
import { updateActiveCellData } from "../../../../../reduxUtils/actions/actionCreators";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import {
  getMazeData,
  getActiveCellData
} from "../../../../../helpers/mazeLogic";
import Maze from "./Maze/Maze";

const mazeData = getMazeData();

class PositionMaze extends Component {
  state = {
    mazePosition: [0, 0],
    animatedMazePositionX: new Animated.Value(0),
    animatedMazePositionY: new Animated.Value(0)
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
      this.handleMazePositionUpdate();
    }
  }

  moveMazePositionX = moveTo => {
    const { animatedMazePositionX } = this.state;

    Animated.timing(animatedMazePositionX, {
      toValue: moveTo,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  moveMazePositionY = moveTo => {
    const { animatedMazePositionY } = this.state;

    Animated.timing(animatedMazePositionY, {
      toValue: -moveTo,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  handlePlayerPositionUpdate = playerPosition => {
    const movementX = this.props.playerPosition[0] - playerPosition[0];
    const movementY = this.props.playerPosition[1] - playerPosition[1];

    this.setState(prevState => ({
      mazePosition: [
        prevState.mazePosition[0] + -movementX,
        prevState.mazePosition[1] + -movementY
      ]
    }));
  };

  handleMazePositionUpdate = () => {
    const { mazePosition } = this.state;
    this.moveMazePositionX(mazePosition[0]);
    this.moveMazePositionY(mazePosition[1]);
    this.updateActiveCellData();
  };

  updateActiveCellData = () => {
    const { layoutWidth, playerPosition } = this.props;

    const activeCellData = getActiveCellData(
      playerPosition,
      layoutWidth,
      mazeData
    );

    this.props.updateActiveCellData(activeCellData);
  };

  render() {
    const { layoutWidth } = this.props;
    const { animatedMazePositionX, animatedMazePositionY } = this.state;
    return (
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          transform: [
            {
              translateX: animatedMazePositionX
            },
            {
              translateY: animatedMazePositionY
            }
          ]
        }}
      >
        <Maze mazeData={mazeData} layoutWidth={layoutWidth} />
      </Animated.View>
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
