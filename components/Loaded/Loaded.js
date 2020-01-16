import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { ScreenOrientation } from "expo";
import { Asset } from "expo-asset";
import { Audio } from "expo-av";
import throttle from "lodash.throttle";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import PlayAgainMenu from "./PlayAgainMenu/PlayAgainMenu";
import FieldLayers from "./FieldLayers/FieldLayers";
import Controls from "./Controls/Controls";

const playerPain = Asset.fromModule(
  require("../../assets/sounds/playerPain.wav")
);

const zenMusic = Asset.fromModule(require("../../assets/sounds/zenMusic.mp3"));

export default class Loaded extends Component {
  state = {
    coords: { latitude: 43.5167427956572, longitude: 16.431551669773466 },
    heading: 0,
    layoutWidth: null,
    playerLaserCharge: { isCharging: false, timestamp: null },
    chi: 100,
    karma: 0
  };

  animateCoords = null;

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
    // this.watchLocation();
    this.watchHeading();
    this.playSound(zenMusic);
  }

  componentDidUpdate(prevProps, prevState) {
    const { layoutWidth } = prevState;
    if (!layoutWidth && this.state.layoutWidth) {
      console.warn("this.props.layoutWidth", this.state.layoutWidth);
    }
  }

  componentWillUnmount() {
    clearInterval(this.animateCoords);
  }

  /*
  animateLocationForDebug = () => {
    this.setState({
      coords: { latitude: 43.5167427956572, longitude: 16.431551669773466 }
    });

    this.animateCoords = setInterval(() => {
      this.setState(prevState => ({
        coords: {
          latitude: prevState.coords.latitude + 0.00001,
          longitude: prevState.coords.longitude + 0.00001
        }
      }));
    }, 1000);
  };
  */

  lockScreenOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  watchLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    const options = {
      accuracy: Location.BestForNavigation,
      timeInterval: 300,
      distanceInterval: 1
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

  render() {
    const {
      layoutWidth,
      coords,
      heading,
      playerLaserCharge,
      playerLaserCharge: { isCharging },
      chi,
      karma
    } = this.state;
    const playerIsDead = chi < 1;

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
            {playerIsDead && (
              <PlayAgainMenu handlePlayAgain={this.handlePlayAgain} />
            )}
            <View style={{ height: layoutWidth }}>
              <FieldLayers
                layoutWidth={layoutWidth}
                heading={heading}
                coords={coords}
                playerLaserCharge={playerLaserCharge}
                playSound={this.playSound}
                increaseKarma={this.increaseKarma}
                handleEnemyCollision={this.handleEnemyCollision}
                chi={chi}
                karma={karma}
                playerIsDead={playerIsDead}
              />
            </View>

            <View style={styles.controls}>
              <Controls
                coords={coords}
                updateLocation={this.updateLocation}
                heading={heading}
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
