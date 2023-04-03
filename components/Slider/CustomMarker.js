import React from "react";
import { StyleSheet, Image } from "react-native";

class CustomMarker extends React.Component {
  render() {
    return (
      <Image
        style={styles.image}
        source={require("./rangeMarker.png")}
        resizeMode="contain"
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 22,
    width: 22,
  },
});

export default CustomMarker;
