import React, { Component } from "react";
import { Image } from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import Loaded from "./Loaded/Loaded";

const cacheImages = images => {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

class Main extends Component {
  state = {
    isReady: false
  };

  _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require("../assets/images/rusty.jpg"),
      require("../assets/images/yinyang.png"),
      require("../assets/images/eyeball.png")
    ]);

    await Promise.all(imageAssets);
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return <Loaded />;
  }
}

export default Main;
