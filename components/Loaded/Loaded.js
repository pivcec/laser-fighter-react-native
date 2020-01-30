import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { getPositionRotatedAroundPrevious } from "../../helpers/coordsCalculations";
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
    playerPosition: [50, 50],
    heading: null,
    offsetHeading: null,
    layoutWidth: null,
    playerLaserCharge: { isCharging: false, timestamp: null },
    chi: 100,
    karma: 0
  };

  componentDidUpdate(prevProps, prevState) {
    const { heading } = prevState;

    if (!heading && this.state.heading) {
      this.setState({ offsetHeading: this.state.heading });
    }
  }

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

  updatePlayerPositionRotated = newPlayerPosition => {
    const { heading, offsetHeading } = this.state;
    const differenceFromOffset = offsetHeading - heading;
    this.setState(prevState => ({
      playerPosition: getPositionRotatedAroundPrevious(
        prevState.playerPosition,
        newPlayerPosition,
        -differenceFromOffset
      )
    }));
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
              />
            </View>

            <View style={styles.controls}>
              <Controls
                heading={heading}
                playerPosition={playerPosition}
                updatePlayerPositionRotated={this.updatePlayerPositionRotated}
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

export default Loaded;
