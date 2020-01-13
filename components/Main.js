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

const cacheAudio = audioFiles => {
  return audioFiles.map(audioFile => {
    return Asset.fromModule(audioFile).downloadAsync();
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
      require("../assets/images/eyeball.png"),
      require("../assets/images/splosion2/1.png"),
      require("../assets/images/splosion2/2.png"),
      require("../assets/images/splosion2/3.png"),
      require("../assets/images/splosion2/4.png"),
      require("../assets/images/splosion2/5.png"),
      require("../assets/images/splosion2/6.png"),
      require("../assets/images/splosion2/7.png"),
      require("../assets/images/splosion2/8.png"),
      require("../assets/images/splosion2/9.png"),
      require("../assets/images/splosion2/10.png"),
      require("../assets/images/splosion2/11.png"),
      require("../assets/images/splosion2/12.png")
    ]);

    const audioAssets = cacheAudio([require("../assets/sounds/zenMusic.mp3")]);

    await Promise.all([...imageAssets, ...audioAssets]);
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
