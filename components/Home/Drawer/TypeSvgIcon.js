import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import globalStyles from "../../../styles/globalStyles.js";
import Svg, { Circle } from "react-native-svg";
import svgTypes from "../../../images/vectors/types/index.js";

const TypeSvgIcon = (props) => {
  const [isActive, setIsActive] = useState(props.typeTilesSelected[props.id]);
  const SvgComp = svgTypes[props.id];

  useEffect(() => {
    setIsActive(props.typeTilesSelected[props.id]);
    console.log("Now Active", props.id);
  }, [props.typeTilesSelected]);

  const handleClick = () => {
    console.log(props.id);
    props.typeTileHandler(props.id);
  };

  return (
    <TouchableOpacity onPress={() => handleClick()}>
      <View style={styles.container}>
        {isActive && (
          <Svg height={40} width={40} viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r="50"
              {...(isActive
                ? { fill: globalStyles["type" + props.id] }
                : { fill: "none" })}
            />
          </Svg>
        )}
        <SvgComp
          height={25}
          style={[
            styles.icon,
            {
              ...(isActive
                ? { color: globalStyles.backgroundwhite }
                : { color: globalStyles["type" + props.id] }),
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TypeSvgIcon;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginHorizontal: 2,
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
  },
  circle: {
    position: "absolute",
  },
});
