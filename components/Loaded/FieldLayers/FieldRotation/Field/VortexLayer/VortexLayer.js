import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import {
  generateVortexData,
  getNewCellData
} from "../../../../../../helpers/VortexLayerLogic";
import { vortexCellsPositionPattern } from "../../../../../../constants/constants";
import Vortex from "./Vortex/Vortex";

class VortexLayer extends Component {
  state = {
    vortexData: generateVortexData(),
    currentZone: [1, 1],
    currentZoneCellKeys: []
  };

  componentDidUpdate(prevProps, prevState) {
    const { playerPosition } = prevProps;
    const { vortexData, currentZone } = prevState;
    if (
      playerPosition[0] !== this.props.playerPosition[0] ||
      playerPosition[1] !== this.props.playerPosition[1]
    ) {
      this.setVortexZone();
    }

    if (
      currentZone[0] !== this.state.currentZone[0] ||
      currentZone[1] !== this.state.currentZone[1]
    ) {
      this.handleUpdateVortexData();
    }

    if (JSON.stringify(vortexData) !== JSON.stringify(this.state.vortexData)) {
      this.handleSetCellDataKeys();
    }
  }

  addCellData = cellPositionPattern => {
    const { currentZone, vortexData } = this.state;
    const position = [
      currentZone[0] + cellPositionPattern[0],
      currentZone[1] + cellPositionPattern[1]
    ];
    const cellData = vortexData.find(
      cell => JSON.stringify(cell.position) === JSON.stringify(position)
    );

    if (!cellData) {
      this.setState(prevState => ({
        vortexData: [...prevState.vortexData, getNewCellData(position)]
      }));
    }
  };

  getCellDataKey = cellPositionPattern => {
    const { currentZone, vortexData } = this.state;
    const position = [
      currentZone[0] + cellPositionPattern[0],
      currentZone[1] + cellPositionPattern[1]
    ];
    return vortexData.findIndex(
      cell => JSON.stringify(cell.position) === JSON.stringify(position)
    );
  };

  handleUpdateVortexData = () => {
    this.addCellData(vortexCellsPositionPattern[0]);
    this.addCellData(vortexCellsPositionPattern[1]);
    this.addCellData(vortexCellsPositionPattern[2]);
    this.addCellData(vortexCellsPositionPattern[3]);
    this.addCellData(vortexCellsPositionPattern[4]);
    this.addCellData(vortexCellsPositionPattern[5]);
    this.addCellData(vortexCellsPositionPattern[6]);
    this.addCellData(vortexCellsPositionPattern[7]);
    this.addCellData(vortexCellsPositionPattern[8]);
  };

  handleSetCellDataKeys = () => {
    const currentZoneCellKeys = [
      this.getCellDataKey(vortexCellsPositionPattern[0]),
      this.getCellDataKey(vortexCellsPositionPattern[1]),
      this.getCellDataKey(vortexCellsPositionPattern[2]),
      this.getCellDataKey(vortexCellsPositionPattern[3]),
      this.getCellDataKey(vortexCellsPositionPattern[4]),
      this.getCellDataKey(vortexCellsPositionPattern[5]),
      this.getCellDataKey(vortexCellsPositionPattern[6]),
      this.getCellDataKey(vortexCellsPositionPattern[7]),
      this.getCellDataKey(vortexCellsPositionPattern[8])
    ];
    this.setState({
      currentZoneCellKeys
    });
  };

  setVortexZone = () => {
    const { playerPosition } = this.props;
    const currentZone = [
      Math.floor(Math.floor(playerPosition[0]) / 50),
      Math.floor(Math.floor(playerPosition[1]) / 50)
    ];
    this.setState({
      currentZone
    });
  };

  render() {
    const { layoutWidth } = this.props;
    const { vortexData, currentZoneCellKeys } = this.state;
    const cellOne = vortexData[currentZoneCellKeys[0]];
    const cellTwo = vortexData[currentZoneCellKeys[1]];
    const cellThree = vortexData[currentZoneCellKeys[2]];
    const cellFour = vortexData[currentZoneCellKeys[3]];
    const cellFive = vortexData[currentZoneCellKeys[4]];
    const cellSix = vortexData[currentZoneCellKeys[5]];
    const cellSeven = vortexData[currentZoneCellKeys[6]];
    const cellEight = vortexData[currentZoneCellKeys[7]];
    const cellNine = vortexData[currentZoneCellKeys[8]];
    return <>{currentZoneCellKeys.length > 0 && <Vortex />}</>;
  }
}

const styles = StyleSheet.create({
  text: { color: "red" }
});

VortexLayer.propTypes = {
  playerPosition: PropTypes.array.isRequired,
  layoutWidth: PropTypes.number.isRequired
};

export default VortexLayer;
