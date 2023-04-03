import React from "react";
import { View, Dimensions, Animated } from "react-native";
import Svg, {
  Text,
  Rect,
  Use,
  Defs,
  LinearGradient,
  Stop,
  Mask,
} from "react-native-svg";

const GradientNameText = (props) => {
  const monName = props.name.toUpperCase();
  return (
    <Svg width="100%" height="100%">
      <Defs>
        <LinearGradient
          id="Gradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="90"
          x2="0"
          y2="0"
        >
          <Stop offset="0" stopColor="white" stopOpacity="0" />
          <Stop offset="1" stopColor="white" stopOpacity="0.3" />
        </LinearGradient>
        <Mask
          id="Mask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={Dimensions.get("window").width}
          height="120"
        >
          <Rect
            x="0"
            y="0"
            width={Dimensions.get("window").width}
            height="120"
            fill="url(#Gradient)"
          />
        </Mask>
        <Text
          id="Text"
          x={Dimensions.get("window").width / 2}
          y="75"
          fontSize="100"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          {monName}
        </Text>
      </Defs>
      {/* <Use href="#Text" fill="black" mask="url(#Mask)" /> */}
      <Use
        href="#Text"
        fill="none"
        mask="url(#Mask)"
        stroke="white"
        strokeWidth="2"
      />
    </Svg>
  );
};

export default GradientNameText;
