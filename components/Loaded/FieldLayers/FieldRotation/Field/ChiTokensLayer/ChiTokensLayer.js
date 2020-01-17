import React, { Component } from "react";
import PropTypes from "prop-types";
import ChiToken from "./ChiToken/ChiToken";

class ChiTokensLayer extends Component {
  render() {
    const { chiTokens, heading } = this.props;
    return chiTokens.map(({ position, id }) => {
      return <ChiToken position={position} key={id} heading={heading} />;
    });
  }
}

ChiTokensLayer.propTypes = {
  chiTokens: PropTypes.array.isRequired,
  heading: PropTypes.number.isRequired,
  coords: PropTypes.object.isRequired
};

export default ChiTokensLayer;
