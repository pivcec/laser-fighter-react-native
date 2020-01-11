import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { ScreenOrientation } from "expo";
import { Audio } from "expo-av";
import throttle from "lodash.throttle";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Menu from "./Menu/Menu";
import FieldLayers from "./FieldLayers/FieldLayers";
import Controls from "./Controls/Controls";

export default class Main extends Component {
  state = {
    coords: {},
    heading: 0,
    layoutWidth: null,
    playerLaserCharge: { isCharging: false, timestamp: null },
    showMenu: false
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
    this.watchLocation();
    this.watchHeading();
  }

  componentWillUnmount() {
    console.log("cancel listeners");
  }

  lockScreenOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  watchLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    const options = {
      accuracy: 10,
      timeInterval: 100,
      mayShowUserSettingsDialog: false
    };

    if (status === "granted") {
      Location.watchPositionAsync(options, this.updateLocation);
    }
  };

  updateLocation = locationObject => {
    this.setState({
      coords: locationObject.coords
    });
  };

  watchHeading = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      Location.watchHeadingAsync(this.throttledUpdateHeading);
    }
  };

  updateHeading = headingObject => {
    this.setState({ heading: headingObject.trueHeading });
  };

  throttledUpdateHeading = throttle(this.updateHeading, 64);

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
      console.log("error playing sound", error);
    }
  };

  handlePlayerDeath = () => {
    this.setState({ showMenu: true });
  };

  handlePlayAgain = () => {
    console.warn("play again");
  };

  render() {
    const {
      layoutWidth,
      coords,
      heading,
      playerLaserCharge,
      playerLaserCharge: { isCharging },
      showMenu
    } = this.state;
    return (
      <View
        style={styles.container}
        onLayout={e => {
          this.findDimensions(e);
        }}
      >
        {layoutWidth && (
          <>
            <StatusBar hidden />
            {showMenu && <Menu handlePlayAgain={this.handlePlayAgain} />}
            <View style={{ height: layoutWidth }}>
              <FieldLayers
                layoutWidth={layoutWidth}
                heading={heading}
                coords={coords}
                playerLaserCharge={playerLaserCharge}
                playSound={this.playSound}
                handlePlayerDeath={this.handlePlayerDeath}
              />
            </View>

            <View style={styles.controls}>
              <Controls
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
