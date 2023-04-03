import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import globalStyles from "./../../../styles/globalStyles.js";
import DrawerHeader from "./DrawerHeader.js";
import GenerationTile from "./GenerationTile.js";
const Generations = (props) => {
  const [tilesSelected, setTilesSelected] = useState(props.generationFilters);

  useEffect(() => {
    console.log("tilesSelected Updated: ", tilesSelected);
  }, [tilesSelected]);

  const tileHandler = (gen) => {
    console.log("Tile Handler inputs: ", gen);
    let newTiles = [...tilesSelected];
    newTiles[gen - 1] = !newTiles[gen - 1];
    console.log("New Tiles: ", newTiles);
    setTilesSelected(newTiles);
  };

  function reset() {
    console.log("reset");
    for (let i = 0; i < props.generationFilters.length; i++) {
      props.setGenerationFilters([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]);
      setTilesSelected([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]);
    }
  }

  function apply() {
    console.log("apply");
    props.setGenerationFilters(tilesSelected);
    props.pokemonListRef.current.scrollToOffset({ animated: true, y: 0 });
    setTimeout(() => {
      props.bottomSheetRef.current.close();
    }, 250);
  }

  return (
    <View style={styles.container}>
      <DrawerHeader
        title="Generations"
        description="Use search for generations to explore your Pokémon!"
      />
      <View style={styles.tilesContainer}>
        <View style={styles.tile}>
          <GenerationTile
            tilesSelected={tilesSelected}
            tileHandler={tileHandler}
            generationId={1}
          />
        </View>
        <View style={styles.tile}>
          <GenerationTile
            tilesSelected={tilesSelected}
            tileHandler={tileHandler}
            generationId={2}
          />
        </View>
        <View style={styles.tile}>
          <GenerationTile
            tilesSelected={tilesSelected}
            tileHandler={tileHandler}
            generationId={3}
          />
        </View>
        <View style={styles.tile}>
          <GenerationTile
            tilesSelected={tilesSelected}
            tileHandler={tileHandler}
            generationId={4}
          />
        </View>
        <View style={styles.tile}>
          <GenerationTile
            tilesSelected={tilesSelected}
            tileHandler={tileHandler}
            generationId={5}
          />
        </View>
        <View style={styles.tile}>
          <GenerationTile
            tilesSelected={tilesSelected}
            tileHandler={tileHandler}
            generationId={6}
          />
        </View>
        <View style={styles.tile}>
          <GenerationTile
            tilesSelected={tilesSelected}
            tileHandler={tileHandler}
            generationId={7}
          />
        </View>
        <View style={styles.tile}>
          <GenerationTile
            tilesSelected={tilesSelected}
            tileHandler={tileHandler}
            generationId={8}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.btn, styles.btnReset]} onPress={reset}>
          <Text>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnApply]} onPress={apply}>
          <Text>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Generations;

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
    fontWeight: "400",
  },

  tilesContainer: {
    marginHorizontal: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
  },
  tile: {
    flex: 1,
    minWidth: 120,
    maxWidth: 170,
    height: 136,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 25,
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
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
