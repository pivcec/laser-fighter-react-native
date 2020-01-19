import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import {
  generateLavaData,
  getNewCellData
} from "../../../../../../helpers/lavaLayerLogic";
import { lavaCellPositionPattern } from "../../../../../../constants/constants";

class LavaLayer extends Component {
  state = {
    lavaData: generateLavaData(),
    currentLavaZone: [],
    currentLavaZoneKeys: []
  };

  componentDidMount() {
    this.setState({
      currentLavaZone: [1, 1]
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { playerPosition } = prevProps;
    const { lavaData, currentLavaZone } = prevState;
    if (
      playerPosition[0] !== this.props.playerPosition[0] ||
      playerPosition[1] !== this.props.playerPosition[1]
    ) {
      this.setLavaZone();
    }

    if (
      currentLavaZone[0] !== this.state.currentLavaZone[0] ||
      currentLavaZone[1] !== this.state.currentLavaZone[1]
    ) {
      this.handleUpdateLavaData();
    }

    if (JSON.stringify(lavaData) !== JSON.stringify(this.state.lavaData)) {
      this.handleSetCellDataKeys();
    }
  }

  addCellData = lavaCellPositionPattern => {
    const { currentLavaZone, lavaData } = this.state;
    const position = [
      currentLavaZone[0] + lavaCellPositionPattern[0],
      currentLavaZone[1] + lavaCellPositionPattern[1]
    ];
    const cellData = lavaData.find(
      cell => JSON.stringify(cell.position) === JSON.stringify(position)
    );

    if (!cellData) {
      this.setState(prevState => ({
        lavaData: [...prevState.lavaData, getNewCellData(position)]
      }));
    }
  };

  setCellDataKey = lavaCellPositionPattern => {
    const { currentLavaZone, lavaData } = this.state;
    const position = [
      currentLavaZone[0] + lavaCellPositionPattern[0],
      currentLavaZone[1] + lavaCellPositionPattern[1]
    ];
    return lavaData.findIndex(
      cell => JSON.stringify(cell.position) === JSON.stringify(position)
    );
  };

  handleUpdateLavaData = () => {
    this.addCellData(lavaCellPositionPattern[0]);
    this.addCellData(lavaCellPositionPattern[1]);
    this.addCellData(lavaCellPositionPattern[2]);
    this.addCellData(lavaCellPositionPattern[3]);
    this.addCellData(lavaCellPositionPattern[4]);
    this.addCellData(lavaCellPositionPattern[5]);
    this.addCellData(lavaCellPositionPattern[6]);
    this.addCellData(lavaCellPositionPattern[7]);
    this.addCellData(lavaCellPositionPattern[8]);
  };

  handleSetCellDataKeys = () => {
    const currentLavaZoneKeys = [
      this.setCellDataKey(lavaCellPositionPattern[0]),
      this.setCellDataKey(lavaCellPositionPattern[1]),
      this.setCellDataKey(lavaCellPositionPattern[2]),
      this.setCellDataKey(lavaCellPositionPattern[3]),
      this.setCellDataKey(lavaCellPositionPattern[4]),
      this.setCellDataKey(lavaCellPositionPattern[5]),
      this.setCellDataKey(lavaCellPositionPattern[6]),
      this.setCellDataKey(lavaCellPositionPattern[7]),
      this.setCellDataKey(lavaCellPositionPattern[8])
    ];
    this.setState({
      currentLavaZoneKeys
    });
  };

  setLavaZone = () => {
    const { playerPosition } = this.props;
    const currentLavaZone = [
      Math.floor(Math.floor(playerPosition[0]) / 50),
      Math.floor(Math.floor(playerPosition[1]) / 50)
    ];
    this.setState({
      currentLavaZone
    });
  };

  render() {
    const { lavaData, currentLavaZoneKeys } = this.state;
    const cellOne = lavaData[currentLavaZoneKeys[0]];
    const cellTwo = lavaData[currentLavaZoneKeys[1]];
    const cellThree = lavaData[currentLavaZoneKeys[2]];
    const cellFour = lavaData[currentLavaZoneKeys[3]];
    const cellFive = lavaData[currentLavaZoneKeys[4]];
    const cellSix = lavaData[currentLavaZoneKeys[5]];
    const cellSeven = lavaData[currentLavaZoneKeys[6]];
    const cellEight = lavaData[currentLavaZoneKeys[7]];
    const cellNine = lavaData[currentLavaZoneKeys[8]];
    return (
      <>
        {currentLavaZoneKeys.length > 0 && (
          <>
            <View>
              <Text style={styles.text}>{cellOne.text}</Text>
            </View>
            <View>
              <Text style={styles.text}>{cellTwo.text}</Text>
            </View>
            <View>
              <Text style={styles.text}>{cellThree.text}</Text>
            </View>
            <View>
              <Text style={styles.text}>{cellFour.text}</Text>
            </View>
            <View>
              <Text style={styles.text}>{cellFive.text}</Text>
            </View>
            <View>
              <Text style={styles.text}>{cellSix.text}</Text>
            </View>
            <View>
              <Text style={styles.text}>{cellSeven.text}</Text>
            </View>
            <View>
              <Text style={styles.text}>{cellEight.text}</Text>
            </View>
            <View>
              <Text style={styles.text}>{cellNine.text}</Text>
            </View>
          </>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  text: { color: "red" }
});

LavaLayer.propTypes = {
  playerPosition: PropTypes.array.isRequired
};

export default LavaLayer;
