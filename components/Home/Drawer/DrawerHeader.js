import React from "react";
import { View, Text, StyleSheet } from "react-native";
import globalStyles from "./../../../styles/globalStyles.js";
const DrawerHeader = (props) => {
  return (
    <View>
      <Text style={styles.drawerTitle}>{props.title}</Text>
      <Text style={styles.drawerDesc}>{props.description}</Text>
    </View>
  );
};

export default DrawerHeader;

const styles = StyleSheet.create({
  drawerTitle: {
    fontSize: 26,
    color: globalStyles.textblack,
    marginBottom: 5,
  },

  drawerDesc: {
    fontSize: 16,
    color: globalStyles.textgrey,
    marginBottom: 35,
  },
});
