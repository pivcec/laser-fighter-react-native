import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { ScreenOrientation } from "expo";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Audio } from "expo-av";
import { Asset } from "expo-asset";
import FieldLayers from "./FieldLayers/FieldLayers";
import Controls from "./Controls/Controls";

const laserFire = Asset.fromModule(require("../assets/sounds/laserFire.wav"));

export default class Main extends Component {
  state = {
    coords: {},
    heading: 0,
    layoutWidth: null,
    playerLaserIsFiring: false,
    laserCharge: 0
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
      Location.watchHeadingAsync(this.updateHeading);
    }
  };

  updateHeading = headingObject => {
    this.setState({ heading: headingObject.trueHeading });
  };

  startPlayerLaserFire = () => {
    this.playSound(laserFire),
      this.setState(
        {
          playerLaserIsFiring: true
        },
        this.endPlayerLaserFire
      );
  };

  increaseLaserCharge = () => {
    this.setState(prevState => ({ laserCharge: prevState.laserCharge + 1 }));
  };

  resetLaserCharge = () => {
    this.setState({ laserCharge: 0 });
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

  endPlayerLaserFire = () => {
    setTimeout(() => {
      this.setState({ playerLaserIsFiring: false });
    }, 100);
  };

  render() {
    const {
      layoutWidth,
      playerLaserIsFiring,
      laserCharge,
      coords,
      heading
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
            <View style={{ height: layoutWidth }}>
              <FieldLayers
                layoutWidth={layoutWidth}
                heading={heading}
                coords={coords}
                playerLaserIsFiring={playerLaserIsFiring}
                laserCharge={laserCharge}
                playSound={this.playSound}
              />
            </View>

            <View style={styles.controls}>
              <Controls
                startPlayerLaserFire={this.startPlayerLaserFire}
                laserCharge={laserCharge}
                increaseLaserCharge={this.increaseLaserCharge}
                resetLaserCharge={this.resetLaserCharge}
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
