import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { chiTokenWidthAndHeight } from "../../../../../../../constants/constants";
import { checkForCollisionWithPlayer } from "../../../../../../../helpers/playerLogic";

class ChiToken extends Component {
  componentDidUpdate(prevProps) {
    const { position } = prevProps;

    if (
      position[0] !== this.props.position[0] ||
      position[1] !== this.props.position[1]
    ) {
      const hasCollided = checkForCollisionWithPlayer(
        this.props.position,
        chiTokenWidthAndHeight
      );
      if (hasCollided) {
        this.handlePlayerCollision();
      }
    }
  }

  handlePlayerCollision = () => {
    this.props.updateChiToken(null);
    this.props.handleChiTokenCollision();
  };

  render() {
    return (
      <Image
        source={require("../../../../../../../assets/images/lotus.png")}
        style={{
          width: "100%",
          height: "75%"
        }}
      />
    );
  }
}

export default ChiToken;

ChiToken.propTypes = {
  position: PropTypes.array.isRequired,
  updateChiToken: PropTypes.func.isRequired,
  handleChiTokenCollision: PropTypes.func.isRequired
};
