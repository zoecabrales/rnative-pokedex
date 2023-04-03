import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import globalStyles from "../../../styles/globalStyles.js";
import DrawerHeader from "./DrawerHeader.js";
import GenerationTile from "./GenerationTile.js";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import CustomMarker from "../../Slider/CustomMarker";
import CustomLabel from "../../Slider/CustomLabel";
import Svg, { SvgUri, Circle } from "react-native-svg";
import svgTypes from "../../../images/vectors/types/index.js";
import TypeSvgIcon from "./TypeSvgIcon.js";
import HeightSvgIcon from "./HeightSvgIcon.js";
import WeightSvgIcon from "./WeightSvgIcon.js";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { NativeViewGestureHandler } from "react-native-gesture-handler";

const Sort = (props) => {
  function reset() {
    console.log("reset");

    props.setTypeFilters(allTypesFalse);
    setTypeTilesSelected(allTypesFalse);
    props.setHeightFilters(allHeightsFalse);
    setHeightTilesSelected(allHeightsFalse);
    props.setWeightFilters(allWeightsFalse);
    setWeightTilesSelected(allWeightsFalse);
    setNonCollidingMultiSliderValue([1, globalStyles.MAX_POKEMON_NUMBER]);
  }

  function apply() {
    console.log("apply");
    props.setTypeFilters(typeTilesSelected);
    props.setHeightFilters(heightTilesSelected);
    props.setWeightFilters(weightTilesSelected);
    props.setRangeFilter(nonCollidingMultiSliderValue);
    props.pokemonListRef.current &&
      props.pokemonListRef.current.scrollToOffset({ animated: true, y: 0 });
    setTimeout(() => {
      props.bottomSheetRef.current.close();
    }, 250);
  }

  function sortBy(sortType) {
    props.setSort(sortType);
    setTimeout(() => {
      props.bottomSheetRef.current.close();
    }, 250);
  }
  return (
    <BottomSheetScrollView contentContainerStyle={styles.container}>
      <DrawerHeader
        title="Sort"
        description="Sort Pokémons alphabetically or by National Pokédex number!"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.btn,
            props.sort == "numLow" ? styles.btnSelected : styles.btnUnselected,
          ]}
          onPress={() => sortBy("numLow")}
        >
          <Text
            style={[
              styles.btnText,
              props.sort == "numLow"
                ? { color: globalStyles.textwhite }
                : { color: globalStyles.textgrey },
            ]}
          >
            Smallest number first
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            props.sort == "numHigh" ? styles.btnSelected : styles.btnUnselected,
          ]}
          onPress={() => sortBy("numHigh")}
        >
          <Text
            style={[
              styles.btnText,
              props.sort == "numHigh"
                ? { color: globalStyles.textwhite }
                : { color: globalStyles.textgrey },
            ]}
          >
            Highest number first
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            props.sort == "a-to-z" ? styles.btnSelected : styles.btnUnselected,
          ]}
          onPress={() => sortBy("a-to-z")}
        >
          <Text
            style={[
              styles.btnText,
              props.sort == "a-to-z"
                ? { color: globalStyles.textwhite }
                : { color: globalStyles.textgrey },
            ]}
          >
            A-Z
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            props.sort == "z-to-a" ? styles.btnSelected : styles.btnUnselected,
          ]}
          onPress={() => sortBy("z-to-a")}
        >
          <Text
            style={[
              styles.btnText,
              props.sort == "z-to-a"
                ? { color: globalStyles.textwhite }
                : { color: globalStyles.textgrey },
            ]}
          >
            Z-A
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheetScrollView>
  );
};

export default Sort;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginHorizontal: 40,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  drawerTitle: {
    fontSize: 26,
    color: globalStyles.textblack,
    fontWeight: "700",
  },

  drawerDesc: {
    fontSize: 16,
    color: globalStyles.textgrey,
    paddingBottom: 30,
    fontWeight: "400",
  },

  buttonContainer: {
    display: "flex",
    marginBottom: 10,
    width: "100%",
  },

  btn: {
    borderRadius: 10,
    paddingVertical: 20,
    marginBottom: 20,
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  btnUnselected: {
    backgroundColor: globalStyles.backgrounddefaultinput,
  },

  btnSelected: {
    backgroundColor: globalStyles.typepsychic,
    color: globalStyles.textwhite,
  },
});
