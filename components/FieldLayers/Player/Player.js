import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { playerWidthAndHeight } from "../../../constants/constants";
import PlayerLaser from "./PlayerLaser/PlayerLaser";

const playerPositionOffset = playerWidthAndHeight / 2;

const getChiColor = chi => {
  if (chi >= 75) {
    return "white";
  }

  if (chi >= 50 && chi < 75) {
    return "yellow";
  }

  return "red";
};

class Player extends Component {
  state = {
    showKarma: true
  };

  componentDidUpdate(prevProps) {
    const { chi, karma } = prevProps;
    if (karma !== this.props.karma) {
      let count = 0;
      const i = setInterval(() => {
        this.blinkKarmaText();
        if (count > 6) clearInterval(i);
        count++;
      }, 300);
    }
  }

  blinkKarmaText = () => {
    this.setState({
      showKarma: !this.state.showKarma
    });
  };

  render() {
    const { showKarma } = this.state;
    const {
      layoutWidth,
      playerLaserCharge,
      heading,
      updateEnemy,
      playSound,
      enemies,
      chi,
      karma
    } = this.props;
    const chiColor = getChiColor(chi);
    return (
      <>
        <Text
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            color: chiColor,
            margin: 3
          }}
        >{`Chi: ${chi}`}</Text>
        {showKarma && <Text style={styles.karma}>{`Karma: ${karma}`}</Text>}
        <View
          style={{
            position: "absolute",
            top: `${50 - playerPositionOffset}%`,
            left: `${50 - playerPositionOffset}%`,
            width: `${playerWidthAndHeight}%`,
            height: `${playerWidthAndHeight}%`,
            borderRadius: 20,
            zIndex: 1
          }}
        >
          <Image
            source={require("../../../assets/images/yinyang.png")}
            style={styles.player}
          />
        </View>
        <PlayerLaser
          layoutWidth={layoutWidth}
          playerLaserCharge={playerLaserCharge}
          heading={heading}
          updateEnemy={updateEnemy}
          playSound={playSound}
          enemies={enemies}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  player: {
    width: "100%",
    height: "100%"
  },
  karma: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "white",
    margin: 3
  }
});

Player.propTypes = {
  playerLaserCharge: PropTypes.object.isRequired,
  heading: PropTypes.number.isRequired,
  updateEnemy: PropTypes.func.isRequired,
  playSound: PropTypes.func.isRequired,
  enemies: PropTypes.array.isRequired,
  chi: PropTypes.number.isRequired,
  karma: PropTypes.number.isRequired
};

export default Player;
