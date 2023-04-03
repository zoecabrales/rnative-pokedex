import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import globalStyles from "../../styles/globalStyles.js";
import Svg, { Rect } from "react-native-svg";
import svgTypes from "../../images/vectors/types/index.js";

const TypeDefencesIcon = (props) => {
  const SvgComp = svgTypes[props.type];
  function convertEffectivenessToMultiplier(eff) {
    switch (eff) {
      case -2:
        return "¼";
      case -1:
        return "½";
      case 0:
        return " ";
      case 1:
        return "2";
      case 2:
        return "4";
      case null:
        return "0";
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Svg height={32} width={32} viewBox="0 0 100 100">
          <Rect
            width="100"
            height="100"
            rx="20"
            {...{ fill: globalStyles["type" + props.type] }}
          />
        </Svg>
        <SvgComp
          width={20}
          style={[styles.icon, { ...{ color: globalStyles.backgroundwhite } }]}
        />
      </View>
      <Text style={styles.effectiveness}>
        {convertEffectivenessToMultiplier(props.effectiveness)}
      </Text>
    </View>
  );
};

export default TypeDefencesIcon;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginHorizontal: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconContainer: {
    position: "relative",
    marginHorizontal: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
  },
  effectiveness: {
    fontSize: 16,
    fontWeight: "400",
    color: globalStyles.textgrey,
  },
});
