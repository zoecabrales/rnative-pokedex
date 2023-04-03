import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import globalStyles from "../../styles/globalStyles.js";

export default function TypeBadge(props) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: globalStyles["type" + props.type] },
      ]}
    >
      {/* <Image className="typebadge-icon" src={require(`../images/vectors/types/${props.type}.svg`)} style={{  color:"var(--text-white)"}}/> */}
      <Text style={styles.text}>{props.type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    gap: 5,
    backgroundColor: globalStyles.typenormal,
    height: 25,
    borderRadius: 3,
    marginVertical: 5,
    marginHorizontal: 2,
  },

  icon: {
    width: 15,
    height: 15,

    /* Cant seem to use fill, color or background-color. 
        Use https://codepen.io/sosuke/pen/Pjoqqp to match colors for filter.
        This is colour matched to --text-white. */
    filter:
      "invert(99%) sepia(0%) saturate(2%) hue-rotate(224deg) brightness(101%) contrast(100%)",
  },

  text: {
    color: globalStyles.textwhite,
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 14,
  },
});
