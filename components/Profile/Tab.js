import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import globalStyles from "../../styles/globalStyles.js";
import Pokeball from "../../images/vectors/patterns/PokeballTab.png";
const Tab = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.setTab(props.name)}
    >
      <View style={styles.tab}>
        {props.tab === props.name ? (
          <>
            <Image style={styles.tabPokeball} source={Pokeball} />
            <Text style={styles.tabActive}>{props.name}</Text>
          </>
        ) : (
          <Text style={styles.tabInactive}>{props.name}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default Tab;

const styles = StyleSheet.create({
  tab: {
    display: "flex",
    alignItems: "center",
    height: 50,
    width: 70,
  },

  tabActive: {
    color: globalStyles.textwhite,
    fontSize: 16,
    fontWeight: "700",
    paddingTop: 16,
  },

  tabInactive: {
    color: globalStyles.textwhite,
    fontSize: 16,
    fontWeight: "400",
    paddingTop: 16,
  },

  tabPokeball: {
    position: "absolute",
    height: 100,
    width: 100,
  },
});
