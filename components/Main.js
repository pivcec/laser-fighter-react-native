import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { ScreenOrientation } from "expo";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Audio } from "expo-av";
import { Asset } from "expo-asset";
import TopMenu from "./TopMenu/TopMenu";
import FieldOverlay from "./FieldOverlay/FieldOverlay";
import Controls from "./Controls/Controls";

const laserFire = Asset.fromModule(require("../assets/sounds/laser_01.wav"));
const buzz = Asset.fromModule(require("../assets/sounds/buzz.wav"));

export default class Main extends Component {
  state = {
    coords: {},
    heading: 0,
    enemyLasers: [],
    playerLaserIsFiring: false,
    layoutWidth: null
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

  handleLaserCollision = playerHitByLaser => {
    if (playerHitByLaser) {
      this.playSound(buzz);
    }
  };

  render() {
    const { layoutWidth } = this.state;
    const { coords, heading, enemyLasers, playerLaserIsFiring } = this.state;
    return (
      <View
        style={styles.container}
        onLayout={e => {
          this.findDimensions(e);
        }}
      >
        <TopMenu />
        {layoutWidth && (
          <View style={styles.overlayAndControls}>
            <FieldOverlay
              layoutWidth={layoutWidth}
              heading={heading}
              enemyLasers={enemyLasers}
              coords={coords}
              playerLaserIsFiring={playerLaserIsFiring}
              handleLaserCollision={this.handleLaserCollision}
            />
            <Controls
              startPlayerLaserFire={this.startPlayerLaserFire}
              heading={heading}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlayAndControls: {
    flex: 1
  }
});
