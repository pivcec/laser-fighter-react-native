import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { playerWidthAndHeight } from "../../../../constants/constants";
import PlayerLaser from "./PlayerLaser/PlayerLaser";

const playerPositionOffset = playerWidthAndHeight / 2;

const getChiColor = chi => {
  if (chi >= 75) {
    return "#DAA520";
  }

  if (chi >= 50 && chi < 75) {
    return "orange";
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
          style={[
            styles.chi,
            {
              color: chiColor
            }
          ]}
        >{`Chi: ${chi}`}</Text>
        {showKarma && <Text style={styles.karma}>{`Karma: ${karma}`}</Text>}
        <View
          style={[
            styles.playerContainer,
            {
              top: `${50 - playerPositionOffset}%`,
              left: `${50 - playerPositionOffset}%`,
              width: `${playerWidthAndHeight}%`,
              height: `${playerWidthAndHeight}%`
            }
          ]}
        >
          <Image
            source={require("../../../../assets/images/yinyang.png")}
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
  playerContainer: {
    position: "absolute",
    zIndex: 3
  },
  player: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 3
  },
  chi: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 3,
    zIndex: 3
  },
  karma: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#DAA520",
    margin: 3,
    zIndex: 3
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
