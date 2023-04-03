import React from "react";
import { View, Text, StyleSheet } from "react-native";
import globalStyles from "../../styles/globalStyles.js";

const Evolution = (props) => {
  console.log(props.evolutionChainData);
  return (
    <Text style={styles.boxAbout}>
      <View style={styles.boxAboutTagContainer}>
        <Text style={styles.boxAboutTag}>{props.tag}</Text>
      </View>
      <Text style={styles.boxAboutData}>{props.data}</Text>
    </Text>
  );
};

export default Evolution;

const styles = StyleSheet.create({
  boxAbout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  boxAboutTagContainer: {
    width: 85,
  },
  boxAboutTag: {
    fontSize: 12,
    fontWeight: "500",
    color: globalStyles.textblack,
  },

  boxAboutData: {
    fontSize: 16,
    fontWeight: "400",
    color: globalStyles.textgrey,
    textTransform: "capitalize",
  },
});
