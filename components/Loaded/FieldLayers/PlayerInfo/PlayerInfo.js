import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

class PlayerInfo extends Component {
  state = {
    showKarma: true
  };

  componentDidUpdate(prevProps) {
    const { karma } = prevProps;
    if (karma !== this.props.karma) {
      let count = 0;
      const i = setInterval(() => {
        this.blinkKarmaText();
        if (count > 6) clearInterval(i);
        count++;
      }, 300);
    }
  }

  getChiColor = chi => {
    if (chi >= 75) {
      return "#DAA520";
    }

    if (chi >= 50 && chi < 75) {
      return "orange";
    }

    return "red";
  };

  blinkKarmaText = () => {
    this.setState({
      showKarma: !this.state.showKarma
    });
  };

  render() {
    const { showKarma } = this.state;
    const { chi, karma, layoutWidth } = this.props;
    const chiColor = this.getChiColor(chi);

    return (
      <View style={{ width: layoutWidth }}>
        <Text
          style={[
            styles.chi,
            {
              color: chiColor
            }
          ]}
        >{`Chi: ${chi}`}</Text>
        {showKarma && <Text style={styles.karma}>{`Karma: ${karma}`}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chi: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 3,
    zIndex: 4
  },
  karma: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#DAA520",
    margin: 3,
    zIndex: 4
  }
});

PlayerInfo.propTypes = {
  chi: PropTypes.number.isRequired,
  karma: PropTypes.number.isRequired,
  layoutWidth: PropTypes.number.isRequired
};

export default PlayerInfo;
