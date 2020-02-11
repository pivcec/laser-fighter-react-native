import React, { Component } from "react";
import { Asset } from "expo-asset";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import { Image, StyleSheet } from "react-native";

const imageSeries = [
  Asset.fromModule(
    require(`../../../../../../../assets/images/splosion/1.png`)
  ),
  Asset.fromModule(
    require(`../../../../../../../assets/images/splosion/2.png`)
  ),
  Asset.fromModule(
    require(`../../../../../../../assets/images/splosion/3.png`)
  ),
  Asset.fromModule(
    require(`../../../../../../../assets/images/splosion/4.png`)
  ),
  Asset.fromModule(
    require(`../../../../../../../assets/images/splosion/5.png`)
  ),
  Asset.fromModule(
    require(`../../../../../../../assets/images/splosion/6.png`)
  ),
  Asset.fromModule(
    require(`../../../../../../../assets/images/splosion/7.png`)
  ),
  Asset.fromModule(
    require(`../../../../../../../assets/images/splosion/8.png`)
  ),
  Asset.fromModule(
    require(`../../../../../../../assets/images/splosion/8.png`)
  ),
  Asset.fromModule(
    require(`../../../../../../../assets/images/splosion/10.png`)
  ),
  Asset.fromModule(
    require(`../../../../../../../assets/images/splosion/11.png`)
  ),
  Asset.fromModule(
    require(`../../../../../../../assets/images/splosion/12.png`)
  )
];

class AnimatedImageSeries extends Component {
  state = {
    animatedValue: new Animated.Value(0),
    activeSlide: 0
  };

  componentDidMount() {
    this.playSlideshow();
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeSlide } = prevState;
    const { removeEnemy, id } = this.props;
    if (activeSlide !== this.state.activeSlide) {
      this.playSlideshow();
    }

    if (activeSlide === 12) {
      removeEnemy(id);
    }
  }

  playSlideshow = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true
    }).start(this.handleNextSlide);
  };

  handleNextSlide = () => {
    const { activeSlide } = this.state;
    if (activeSlide < 12) {
      this.setState(prevState => ({ activeSlide: prevState.activeSlide + 1 }));
    }
  };

  render() {
    const { activeSlide } = this.state;
    return <Image style={styles.image} source={imageSeries[activeSlide]} />;
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%"
  }
});

export default AnimatedImageSeries;

AnimatedImageSeries.propTypes = {
  id: PropTypes.string.isRequired,
  removeEnemy: PropTypes.func.isRequired
};
