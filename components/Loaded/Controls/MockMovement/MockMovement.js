import React from "react";
import { Text, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

const MockMovement = ({ heading }) => {
  return (
    <>
      <View>
        <Text>{`player heading: ${heading}`}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});

MockMovement.propTypes = {
  heading: PropTypes.number.isRequired
};

export default MockMovement;
