import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import globalStyles from "./../../../styles/globalStyles.js";
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

const allTypesFalse = {
  bug: false,
  dark: false,
  dragon: false,
  electric: false,
  fairy: false,
  fighting: false,
  fire: false,
  flying: false,
  ghost: false,
  grass: false,
  ground: false,
  ice: false,
  normal: false,
  poison: false,
  psychic: false,
  rock: false,
  steel: false,
  water: false,
};

const allHeightsFalse = {
  short: false,
  medium: false,
  tall: false,
};

const allWeightsFalse = {
  light: false,
  normal: false,
  heavy: false,
};

const Filters = (props) => {
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

  // Range Slider
  const [nonCollidingMultiSliderValue, setNonCollidingMultiSliderValue] =
    useState(props.rangeFilter);
  const nonCollidingMultiSliderValuesChange = (values) =>
    setNonCollidingMultiSliderValue(values);

  const [typeTilesSelected, setTypeTilesSelected] = useState(props.typeFilters);
  const [heightTilesSelected, setHeightTilesSelected] = useState(
    props.heightFilters
  );
  const [weightTilesSelected, setWeightTilesSelected] = useState(
    props.weightFilters
  );

  useEffect(() => {
    console.log("typeTilesSelected Updated: ", typeTilesSelected);
  }, [typeTilesSelected]);

  useEffect(() => {
    console.log("heightTilesSelected Updated: ", heightTilesSelected);
  }, [heightTilesSelected]);

  useEffect(() => {
    console.log("weightTilesSelected Updated: ", weightTilesSelected);
  }, [weightTilesSelected]);

  // Types
  const typeTileHandler = (id) => {
    console.log("Tile Handler inputs: ", id);
    let newTiles = { ...typeTilesSelected };
    console.log("Old Tiles: ", newTiles);
    newTiles[id] = !newTiles[id];
    console.log("New Tiles: ", newTiles);
    setTypeTilesSelected(newTiles);
  };

  // Heights
  const heightTileHandler = (id) => {
    console.log("Tile Handler inputs: ", id);
    let newTiles = { ...heightTilesSelected };
    console.log("Old Tiles: ", newTiles);
    newTiles[id] = !newTiles[id];
    console.log("New Tiles: ", newTiles);
    setHeightTilesSelected(newTiles);
  };

  // Weights
  const weightTileHandler = (id) => {
    console.log("Tile Handler inputs: ", id);
    let newTiles = { ...weightTilesSelected };
    console.log("Old Tiles: ", newTiles);
    newTiles[id] = !newTiles[id];
    console.log("New Tiles: ", newTiles);
    setWeightTilesSelected(newTiles);
  };

  //render Icons
  const typeIcons = Object.keys(typeTilesSelected).map((item, i) => (
    <TypeSvgIcon
      key={i}
      id={item}
      typeTilesSelected={typeTilesSelected}
      typeTileHandler={typeTileHandler}
    />
  ));

  const heightIcons = Object.keys(heightTilesSelected).map((item, i) => (
    <HeightSvgIcon
      key={i}
      id={item}
      heightTilesSelected={heightTilesSelected}
      heightTileHandler={heightTileHandler}
    />
  ));

  const weightIcons = Object.keys(weightTilesSelected).map((item, i) => (
    <WeightSvgIcon
      key={i}
      id={item}
      weightTilesSelected={weightTilesSelected}
      weightTileHandler={weightTileHandler}
    />
  ));
  // console.warn(item),
  return (
    <BottomSheetScrollView contentContainerStyle={styles.container}>
      <DrawerHeader
        title="Filter"
        description="Use advanced search to explore Pokémon by type, weakness, height and more!"
      />
      <Text style={styles.subtitle}>Types</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {typeIcons}
      </ScrollView>

      {/* TODO: Lots of work to calculate weaknesses of each Pokemon for the filter. */}
      {/* <Text style={styles.subtitle}>Weakness</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            </ScrollView> */}

      <Text style={styles.subtitle}>Heights</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {heightIcons}
      </ScrollView>

      <Text style={styles.subtitle}>Weights</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {weightIcons}
      </ScrollView>

      <Text style={styles.subtitle}>Number Range</Text>
      <View style={styles.slider}>
        <Text style={styles.sliderValues}>
          {nonCollidingMultiSliderValue[0]} - {nonCollidingMultiSliderValue[1]}
        </Text>
        <MultiSlider
          values={[
            nonCollidingMultiSliderValue[0],
            nonCollidingMultiSliderValue[1],
          ]}
          selectedStyle={{
            backgroundColor: globalStyles.typepsychic,
          }}
          unselectedStyle={{
            backgroundColor: globalStyles.backgrounddefaultinput,
          }}
          onValuesChange={nonCollidingMultiSliderValuesChange}
          sliderLength={globalStyles.MAX_POKEMON_NUMBER / 3}
          min={1}
          max={globalStyles.MAX_POKEMON_NUMBER}
          step={1}
          allowOverlap={false}
          snapped
          minMarkerOverlapDistance={10}
          customMarker={CustomMarker}
          customLabel={CustomLabel}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.btn, styles.btnReset]} onPress={reset}>
          <Text>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnApply]} onPress={apply}>
          <Text>Apply</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetScrollView>
  );
};

export default Filters;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginLeft: 40,
    marginTop: 5,
    alignItems: "flex-start",
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
    marginRight: 40,
  },

  subtitle: {
    fontSize: 16,
    color: globalStyles.textblack,
    paddingBottom: 5,
    fontWeight: "700",
  },

  horizontalList: {
    marginRight: 0,
    marginBottom: 30,
  },
  tile: {
    flex: 1,
    minWidth: 167,
    maxWidth: 167,
    height: 136,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 25,
  },

  slider: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
    marginRight: 40,
  },

  sliderValues: {
    color: globalStyles.textgrey,
    fontWeight: "400",
    fontSize: 12,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },

  btn: {
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginHorizontal: 10,
    width: 160,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  btnReset: {
    backgroundColor: globalStyles.backgrounddefaultinput,
  },

  btnApply: {
    backgroundColor: globalStyles.typepsychic,
  },
});
