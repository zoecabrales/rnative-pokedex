import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import globalStyles from "./../../../styles/globalStyles.js";
import Dots from "./../../../images/vectors/patterns/6x3GenerationTile.png";
import Pokeball from "./../../../images/vectors/patterns/PokeballGenerationTile.png";

const GenerationTile = (props) => {
  const [isActive, setIsActive] = useState(
    props.tilesSelected[props.generationId - 1]
  );

  useEffect(() => {
    setIsActive(props.tilesSelected[props.generationId - 1]);
  }, [props.tilesSelected]);

  function romanize(num) {
    if (isNaN(num)) return NaN;
    var digits = String(+num).split(""),
      key = [
        "",
        "C",
        "CC",
        "CCC",
        "CD",
        "D",
        "DC",
        "DCC",
        "DCCC",
        "CM",
        "",
        "X",
        "XX",
        "XXX",
        "XL",
        "L",
        "LX",
        "LXX",
        "LXXX",
        "XC",
        "",
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
      ],
      roman = "",
      i = 3;
    while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
  }

  const images = {
    1: require("../../../images/generations/Generation1.png"),
    2: require("../../../images/generations/Generation2.png"),
    3: require("../../../images/generations/Generation3.png"),
    4: require("../../../images/generations/Generation4.png"),
    5: require("../../../images/generations/Generation5.png"),
    6: require("../../../images/generations/Generation6.png"),
    7: require("../../../images/generations/Generation7.png"),
    8: require("../../../images/generations/Generation8.png"),
  };

  const handleClick = () => {
    props.tileHandler(props.generationId, !isActive);
  };

  return (
    <TouchableOpacity onPress={() => handleClick()}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: isActive
              ? globalStyles.typepsychic
              : globalStyles.backgrounddefaultinput,
          },
        ]}
      >
        <Image style={styles.pokeball} source={Pokeball} />
        <Image style={styles.dots} source={Dots} />
        <View style={styles.imgContainer}>
          <Image
            source={images[props.generationId]}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
        <Text
          style={[
            styles.title,
            {
              color: isActive ? globalStyles.textwhite : globalStyles.textgrey,
            },
          ]}
        >
          Generation {romanize(props.generationId)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GenerationTile;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: globalStyles.backgrounddefaultinput,
    height: 129,
    width: 160,
    margin: 7,
  },
  imgContainer: {
    width: 145,
    height: 45,
  },
  title: {
    paddingTop: 15,
    fontSize: 16,
    color: globalStyles.textgrey,
  },

  pokeball: {
    position: "absolute",
    right: 0,
    bottom: 0,
    height: 59,
    width: 100,
    zIndex: -1,
  },

  dots: {
    position: "absolute",
    top: 10,
    left: 15,
    height: 35,
    width: 80,
    zIndex: -1,
  },
});
