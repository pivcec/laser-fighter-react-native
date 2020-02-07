import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, StatusBar } from "react-native";
import exactMath from "exact-math";
import { exactMathConfig } from "../../constants/constants";
import { getPositionRotatedAroundPrevious } from "../../helpers/coordsCalculations";
import {
  checkWallDistanceX,
  checkWallDistanceY
} from "../../helpers/playerLogic";
import { ScreenOrientation } from "expo";
import { Asset } from "expo-asset";
import { Audio } from "expo-av";
import throttle from "lodash.throttle";
import debounce from "lodash.debounce";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import PlayAgainMenu from "./PlayAgainMenu/PlayAgainMenu";
import FieldLayers from "./FieldLayers/FieldLayers";
import Controls from "./Controls/Controls";

const playerPain = Asset.fromModule(
  require("../../assets/sounds/playerPain.wav")
);

const zenMusic = Asset.fromModule(require("../../assets/sounds/zenMusic.mp3"));

class Loaded extends Component {
  state = {
    playerPosition: [],
    heading: null,
    offsetHeading: null,
    layoutWidth: null,
    playerLaserCharge: { isCharging: false, timestamp: null },
    chi: 100,
    karma: 0
  };

  componentDidUpdate(prevProps, prevState) {
    const { heading, layoutWidth } = prevState;

    if (!heading && this.state.heading) {
      this.setState({ offsetHeading: this.state.heading });
    }

    if (!layoutWidth && this.state.layoutWidth) {
      this.setPlayerPosition(this.state.layoutWidth);
    }
  }

  setPlayerPosition = layoutWidth => {
    this.setState({
      playerPosition: [layoutWidth / 2, layoutWidth / 2]
    });
  };

  findDimensions = e => {
    const {
      nativeEvent: {
        layout: { width }
      }
    } = e;
    this.setState({
      layoutWidth: width
    });
  };

  async componentDidMount() {
    this.lockScreenOrientation();
    this.watchHeading();
    this.playSound(zenMusic);
  }

  lockScreenOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  watchHeading = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      Location.watchHeadingAsync(this.debouncedUpdateHeading);
    }
  };

  updateHeading = headingObject => {
    this.setState({ heading: headingObject.trueHeading });
  };

  updatePlayerPosition = newPlayerPosition => {
    this.setState({
      playerPosition: newPlayerPosition
    });
  };

  handleTouchMovement = movement => {
    const { activeCellData } = this.props;
    const { playerPosition } = this.state;

    const intendedPlayerPosition = [
      playerPosition[0] + movement[0],
      playerPosition[1] + movement[1]
    ];

    const intendedPositionRotated = this.getRotatedPosition(
      intendedPlayerPosition
    );

    /*
    const wallDistanceAdjusted = [
      checkWallDistanceX(movement[0], activeCellData),
      checkWallDistanceY(movement[1], activeCellData)
    ];

    this.setState(prevState => ({
      playerPosition: [
        prevState.playerPosition[0] - wallDistanceAdjusted[0],
        prevState.playerPosition[1] - wallDistanceAdjusted[1]
      ]
    }));
    */

    this.setState({
      playerPosition: intendedPositionRotated
    });
  };

  getRotatedPosition = intendedPlayerPosition => {
    const { heading, offsetHeading, playerPosition } = this.state;
    const differenceFromOffset = offsetHeading - heading;
    return getPositionRotatedAroundPrevious(
      playerPosition,
      intendedPlayerPosition,
      differenceFromOffset
    );
  };

  debouncedUpdateHeading = debounce(this.updateHeading, 0);

  togglePlayerLaserIsCharging = toggle => {
    const timestamp = Date.now();
    this.setState({ playerLaserCharge: { isCharging: toggle, timestamp } });
  };

  playSound = async sound => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(sound);
      await soundObject.playAsync();
    } catch (error) {
      console.warn("error playing sound", error);
    }
  };

  throttledPlaySound = throttle(this.playSound, 1000);

  handlePlayAgain = () => {
    this.setState({ chi: 100, karma: 0 });
  };

  increaseKarma = () => {
    this.setState(prevState => ({
      karma: prevState.karma + 1
    }));
  };

  handleEnemyCollision = () => {
    this.throttledPlaySound(playerPain);
    this.setState(prevState => ({
      chi: prevState.chi - 5
    }));
  };

  valueOrZero = value => {
    if (value <= 0) {
      return 360;
    }
    if (value >= 360) {
      return 1;
    }
    return value;
  };

  updateOffsetHeading = rotateClockwise => {
    this.setState(prevState => ({
      offsetHeading: rotateClockwise
        ? this.valueOrZero(prevState.offsetHeading + 30)
        : this.valueOrZero(prevState.offsetHeading - 30)
    }));
  };

  render() {
    const {
      layoutWidth,
      playerPosition,
      heading,
      playerLaserCharge,
      playerLaserCharge: { isCharging },
      chi,
      karma,
      offsetHeading
    } = this.state;
    const playerIsDead = chi < 1;

    return (
      <View
        style={styles.container}
        onLayout={e => {
          this.findDimensions(e);
        }}
      >
        {layoutWidth && offsetHeading && (
          <>
            <StatusBar hidden />
            {playerIsDead && (
              <PlayAgainMenu handlePlayAgain={this.handlePlayAgain} />
            )}
            <View style={{ height: layoutWidth, backgroundColor: "blue" }}>
              <FieldLayers
                layoutWidth={layoutWidth}
                playerPosition={playerPosition}
                updatePlayerPosition={this.updatePlayerPosition}
                heading={heading}
                playerLaserCharge={playerLaserCharge}
                playSound={this.playSound}
                handleEnemyCollision={this.handleEnemyCollision}
                increaseKarma={this.increaseKarma}
                chi={chi}
                karma={karma}
                playerIsDead={playerIsDead}
                offsetHeading={offsetHeading}
                updateOffsetHeading={this.updateOffsetHeading}
                handleTouchMovement={this.handleTouchMovement}
              />
            </View>

            <View style={styles.controls}>
              <Controls
                heading={heading}
                playerPosition={playerPosition}
                playerIsDead={playerIsDead}
                playerLaserIsCharging={isCharging}
                togglePlayerLaserIsCharging={this.togglePlayerLaserIsCharging}
              />
            </View>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  controls: {
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    activeCellData: state.mazePosition.activeCellData
  };
};

export default connect(mapStateToProps)(Loaded);
