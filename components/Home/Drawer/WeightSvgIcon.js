import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import globalStyles from "../../../styles/globalStyles.js";
import Svg, { Circle } from "react-native-svg";
import svgWeights from "../../../images/vectors/weights/index.js";

const WeightSvgIcon = (props) => {
  const [isActive, setIsActive] = useState(props.weightTilesSelected[props.id]);
  const SvgComp = svgWeights[props.id];

  useEffect(() => {
    setIsActive(props.weightTilesSelected[props.id]);
    console.log("Now Active", props.id);
  }, [props.weightTilesSelected]);

  const handleClick = () => {
    console.log(props.id);
    props.weightTileHandler(props.id);
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
                ? { fill: globalStyles["weight" + props.id] }
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
                : { color: globalStyles["weight" + props.id] }),
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default WeightSvgIcon;

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
