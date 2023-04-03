// import { StatusBar } from 'expo-status-bar';
// eas build -p android --profile preview
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, Text, View, StyleSheet, SafeAreaView } from "react-native";
import globalStyles from "./styles/globalStyles.js";
import Home from "./components/Home/Home.js";
import Profile from "./components/Profile/Profile.js";
import { useFonts } from "expo-font";
import { MainClient } from "pokenode-ts";
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [pokemonProfile, setPokemonProfile] = useState("");
  const [pokemonLoaded, setPokemonLoaded] = useState(false);
  // Saved Filters
  const [searchPhrase, setSearchPhrase] = useState("");
  const [sort, setSort] = useState("numLow");
  const [generationFilters, setGenerationFilters] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [typeFilters, setTypeFilters] = useState({
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
  });
  const [heightFilters, setHeightFilters] = useState({
    short: false,
    medium: false,
    tall: false,
  });
  const [weightFilters, setWeightFilters] = useState({
    light: false,
    normal: false,
    heavy: false,
  });
  const [rangeFilter, setRangeFilter] = useState([
    1,
    globalStyles.MAX_POKEMON_NUMBER,
  ]);
  const [appIsReady, setAppIsReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("typeFilters", typeFilters);
  }, [typeFilters]);

  // get data from the api endpoint
  useEffect(() => {
    // Get API Data
    console.log("pokemonLoaded: ", pokemonLoaded);
    if (!pokemonLoaded) {
      pokePromises().then((results) => {
        setAllPokemonData(results);
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        pokePromises().then((results) => {
          setAllPokemonData(results);
          setLoading(false);
        });
        // await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setPokemonLoaded(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (pokemonLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [pokemonLoaded]);

  if (!pokemonLoaded) {
    return null;
  }

  async function pokePromises() {
    const api = new MainClient();
    let promises = [];
    for (let i = 1; i <= globalStyles.MAX_POKEMON_NUMBER; i++) {
      promises.push(api.pokemon.getPokemonById(i));
    }
    return Promise.all(promises);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="#00000060"
      />
      <View style={styles.container} onLayout={onLayoutRootView}>
        {pokemonProfile === "" ? (
          <Home
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            loading={loading}
            setPokemonProfile={setPokemonProfile}
            allPokemonData={allPokemonData}
            sort={sort}
            setSort={setSort}
            generationFilters={generationFilters}
            setGenerationFilters={setGenerationFilters}
            typeFilters={typeFilters}
            setTypeFilters={setTypeFilters}
            heightFilters={heightFilters}
            setHeightFilters={setHeightFilters}
            weightFilters={weightFilters}
            setWeightFilters={setWeightFilters}
            rangeFilter={rangeFilter}
            setRangeFilter={setRangeFilter}
          />
        ) : (
          <Profile setPokemonProfile={setPokemonProfile} mon={pokemonProfile} />
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: StatusBar.currentHeight,
    fontFamily: "serif",
  },
});
