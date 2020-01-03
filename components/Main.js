import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { ScreenOrientation } from "expo";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import TopMenu from "./TopMenu/TopMenu";
import Overlay from "./Overlay/Overlay";
import Controls from "./Controls/Controls";
import { playerWidthAndHeight } from "../constants/constants";

export default class Main extends Component {
  state = {
    latitude: null,
    longitude: null,
    heading: 0,
    enemyLasers: [],
    playerLaserIsFiring: false,
    layoutWidth: null,
    gridLinesX: []
  };

  componentDidUpdate(prevProps, prevState) {
    const { layoutWidth } = prevState;
    if (!layoutWidth && this.state.layoutWidth) {
      this.createGridData();
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

  createGridData = () => {
    const { layoutWidth } = this.state;
    const cellWidth = layoutWidth / 10;

    let gridLines = [];
    let i;

    for (i = 0; i <= layoutWidth; i = i + cellWidth) {
      gridLines.push(i);
    }

    this.setState({ gridLines });
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
      latitude: locationObject.coords.latitude,
      longitude: locationObject.coords.longitude
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

  /*
  startEnemyLaserFire = id => {
    const laserAnimation = { id, x1: 50, y1: 50, x2: 55, y2: 55 };

    this.setState(
      prevState => ({
        enemyLasers: [...prevState.enemyLasers, laserAnimation]
      }),
      () => this.endLaserFire(id)
    );
  };

  endEnemyLaserFire = id => {
    setTimeout(() => {
      console.warn("end laser fire", id);

    }, 1000);
  };
  */

  startPlayerLaserFire = () => {
    this.setState(
      {
        playerLaserIsFiring: true
      },
      this.endPlayerLaserFire
    );
  };

  endPlayerLaserFire = () => {
    setTimeout(() => {
      this.setState({ playerLaserIsFiring: false });
    }, 100);
  };

  handleLaserFire = playerHitByLaser => {
    console.warn("handle laser fire", playerHitByLaser);
  };

  render() {
    const { layoutWidth, gridLines } = this.state;
    const {
      longitude,
      latitude,
      heading,
      enemyLasers,
      playerLaserIsFiring
    } = this.state;
    return (
      <View
        style={styles.container}
        onLayout={e => {
          this.findDimensions(e);
        }}
      >
        <TopMenu />
        {layoutWidth && gridLines && (
          <View style={styles.overlayAndControls}>
            <Overlay
              layoutWidth={layoutWidth}
              gridLines={gridLines}
              heading={heading}
              enemyLasers={enemyLasers}
              playerLaserIsFiring={playerLaserIsFiring}
              handleLaserFire={this.handleLaserFire}
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
