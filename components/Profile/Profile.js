import React, { useState, useEffect, version } from "react";
import {
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
  View,
  Text,
  StyleSheet,
  BackHandler,
} from "react-native";
import TypeBadge from "../Home/TypeBadge";
import globalStyles from "../../styles/globalStyles.js";
import GradientNameText from "../GradientNameText";
import DotsSixByThree from "../../images/vectors/patterns/6x3.png";
import Circle from "../../images/vectors/patterns/Circle.png";
import Back from "../../images/vectors/icons/Back.png";
import { MainClient, EvolutionClient } from "pokenode-ts";
import StatsTable from "./StatsTable";
import DataLine from "./DataLine";
import Tab from "./Tab";
import Evolution from "./Evolution";
import TypeDefences from "./TypeDefences";

const Profile = (props) => {
  const type = props.mon.types[0].type.name;
  const defaultPhrase = "Unknown";
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("About");
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState([]);
  const [pokedexEntry, setPokedexEntry] = useState();
  const [species, setSpecies] = useState(defaultPhrase);
  const [weight, setWeight] = useState(defaultPhrase);
  const [height, setHeight] = useState(defaultPhrase);
  const [abilities, setAbilities] = useState(defaultPhrase);
  const [growthRate, setGrowthRate] = useState(defaultPhrase);
  const [catchRate, setCatchRate] = useState(defaultPhrase);
  const [eggCycles, setEggCycles] = useState(defaultPhrase);
  const [eggGroups, setEggGroups] = useState(defaultPhrase);
  const [gender, setGender] = useState(defaultPhrase);
  const [evYield, setEvYield] = useState(defaultPhrase);
  const [evolutionChainId, setEvolutionChainId] = useState();
  const [evolutionChainData, setEvolutionChainData] = useState();
  const [locations, setLocations] = useState();
  const [types, setTypes] = useState([]);

  function cmToFtInches(num) {
    const realFeet = (num * 0.3937) / 12;
    const feet = Math.floor(realFeet);
    let inches = (Math.round(10 * ((realFeet - feet) * 12)) / 10).toFixed(0);
    inches = inches.toString().padStart(2, "0");
    return feet + "'" + inches + '"';
  }

  const backAction = () => {
    props.setPokemonProfile("");
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    const getPokemonSpeciesData = async () => {
      setWeight(
        props.mon.weight / 10 +
          "kg (" +
          ((props.mon.weight / 10) * 2.20462).toFixed(1) +
          " lbs)"
      );
      setHeight(
        props.mon.height / 10 +
          "m (" +
          cmToFtInches(props.mon.height * 10) +
          ")"
      );
      const api = new MainClient();
      await api.pokemon.getPokemonSpeciesById(props.mon.id).then((data) => {
        setPokemonSpeciesData(data);
        setGrowthRate(data.growth_rate.name.replace(/\-/g, " "));
        setCatchRate(data.capture_rate);
        setGender(data.gender_rate);
        setEggCycles(
          data.hatch_counter +
            " (" +
            (data.hatch_counter * 255)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
            " - " +
            (data.hatch_counter * 257)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
            " steps)"
        );
        for (let i = 0; i < data.genera.length; i++) {
          if (data.genera[i].language.name === "en") {
            setSpecies(data.genera[i].genus);
          }
          if (data.flavor_text_entries[i].language.name === "en") {
            setPokedexEntry(
              data.flavor_text_entries[i].flavor_text.replace(/[\n\f]/g, " ")
            );
          }
        }
        const eggGroupsArr = data.egg_groups.map((x) => x.name);
        setEggGroups(eggGroupsArr.join(", "));

        let evArr = [];
        for (let i = 0; i < props.mon.stats.length; i++) {
          if (props.mon.stats[i].effort > 0) {
            evArr.push(
              props.mon.stats[i].effort +
                " " +
                formatStat(props.mon.stats[i].stat.name)
            );
          }
        }
        console.log(evArr);
        setEvYield(evArr.join("\n"));

        let abilitiesArr = [];
        for (let i = 0; i < props.mon.abilities.length; i++) {
          if (props.mon.abilities[i].is_hidden) {
            abilitiesArr.push(
              props.mon.abilities[i].ability.name + " (hidden ability)"
            );
          }
          if (!props.mon.abilities[i].is_hidden) {
            abilitiesArr.push(props.mon.abilities[i].ability.name);
          }
        }
        setAbilities(abilitiesArr.join("\n"));

        let typesArr = [];
        for (let i = 0; i < props.mon.types.length; i++) {
          typesArr.push(props.mon.types[i].type.name);
        }
        setTypes(typesArr);

        // Get Evolution Data
        const urlPath = data.evolution_chain.url;
        setEvolutionChainId(
          urlPath.substring(urlPath.indexOf("chain/") + 6).slice(0, -1)
        );
      });
      let locArr = [];
      await api.pokemon
        .getPokemonLocationAreaById(props.mon.id)
        .then((data) => {
          let tempLocations = data.map((locs) => {
            let games = [];
            for (let x of locs.version_details) {
              // Remove '-' from games, and capitalise
              games.push(
                x.version.name
                  .replace(/-/g, " ")
                  .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                    letter.toUpperCase()
                  )
              );
            }

            let loc = {
              // Remove '-' from names, and capitalise
              locationName: locs.location_area.name
                .replace(/-/g, " ")
                .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                  letter.toUpperCase()
                ),
              games: games,
            };
            locArr.push(loc);
          });
        });

      setLocations(locArr);
      setLoading(false);
    };
    getPokemonSpeciesData();
  }, []);

  const LocationComponent = ({ locArr }) => (
    <>
      {locArr.length > 0 ? (
        locArr.map((loc) => (
          <DataLine
            key={loc.locationName}
            tag={loc.locationName}
            data={loc.games.join(", ")}
          />
        ))
      ) : (
        <Text>No locations found.</Text>
      )}
    </>
  );

  useEffect(() => {
    const getEvolutionChainData = async () => {
      if (evolutionChainId != null) {
        console.log(evolutionChainId);
        const api = new EvolutionClient();
        await api.getEvolutionChainById(evolutionChainId).then((data) => {
          setEvolutionChainData(data);
        });
      }
    };
    getEvolutionChainData();
  }, [evolutionChainId]);

  function formatStat(stat) {
    switch (stat) {
      case "hp":
        return "HP";
      case "attack":
        return "Attack";
      case "defense":
        return "Defense";
      case "special-attack":
        return "Special Attack";
      case "special-defense":
        return "Special Defence";
      case "speed":
        return "Speed";
      default:
        return "";
    }
  }

  // console.log(props);
  // console.log(pokemonSpeciesData);
  // console.log(growthRate);
  // console.log(pokedexEntry);
  // console.log(props.mon);
  function formatId(id) {
    var num = "" + id;
    while (num.length < 3) {
      num = "0" + num;
    }
    num = "#" + num;
    return num;
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: globalStyles["backgroundtype" + type] },
      ]}
    >
      <TouchableOpacity
        style={styles.backArrowTouchable}
        activeOpacity={0.8}
        onPress={() => props.setPokemonProfile("")}
      >
        <Image style={styles.backArrow} source={Back} />
      </TouchableOpacity>
      <View style={styles.pokemonTitleContainerContainer}>
        <View style={styles.pokemonTitleContainer}>
          <GradientNameText
            style={styles.pokemonTitle}
            color={globalStyles["backgroundtype" + type]}
            name={props.mon.species.name}
          />
        </View>
      </View>
      <View style={styles.Profile}>
        <View style={styles.top}>
          <View style={styles.topImage}>
            <Image style={styles.circle} source={Circle} />
            <Image
              onError={(e) => console.log(e.nativeEvent.error)}
              style={styles.sprite}
              source={{
                uri: `${props.mon.sprites.other["official-artwork"].front_default}`,
              }}
            />
          </View>
          <View style={styles.cardData}>
            <Text style={styles.cardId}>{formatId(props.mon.id)}</Text>
            <Text style={styles.cardName}>{props.mon.species.name}</Text>
            <View style={styles.cardTypes}>
              <TypeBadge type={props.mon.types[0].type.name} />
              {props.mon.types.length === 2 && (
                <TypeBadge type={props.mon.types[1].type.name} />
              )}
            </View>
          </View>
        </View>
        <View style={styles.tabs}>
          <Tab tab={tab} setTab={setTab} name="About" />
          <Tab tab={tab} setTab={setTab} name="Stats" />
          <Tab tab={tab} setTab={setTab} name="Evolution" />
        </View>
      </View>
      <View style={styles.box}>
        {!loading && (
          <>
            {tab == "About" && (
              <View style={styles.boxContent}>
                {/* TODO: Fix Pokedex Entry language to be English on all. Eg. 746 Wishiwashi is Japanese*/}
                <Text style={styles.boxPokedexEntry}>{pokedexEntry}</Text>

                <Text
                  style={[
                    styles.boxTitle,
                    { color: globalStyles["type" + type] },
                  ]}
                >
                  Pokédex Data
                </Text>
                <DataLine tag={"Species"} data={species} />
                <DataLine tag={"Height"} data={height} />
                <DataLine tag={"Weight"} data={weight} />
                <DataLine tag={"Abilities"} data={abilities} />
                <DataLine tag={"Weaknesses"} data={types} types={types} />

                <Text
                  style={[
                    styles.boxTitle,
                    { color: globalStyles["type" + type] },
                  ]}
                >
                  Training
                </Text>
                <DataLine tag={"EV Yield"} data={evYield} />
                <DataLine tag={"Catch Rate"} data={catchRate} />
                <DataLine
                  tag={"Base Friendship"}
                  data={pokemonSpeciesData.base_happiness}
                />
                <DataLine tag={"Base Exp"} data={props.mon.base_experience} />
                <DataLine tag={"Growth Rate"} data={growthRate} />

                <Text
                  style={[
                    styles.boxTitle,
                    { color: globalStyles["type" + type] },
                  ]}
                >
                  Breeding
                </Text>
                <DataLine tag={"Gender"} data={gender} />
                <DataLine tag={"Egg Groups"} data={eggGroups} />
                <DataLine tag={"Egg Cycles"} data={eggCycles} />

                <Text
                  style={[
                    styles.boxTitle,
                    { color: globalStyles["type" + type] },
                  ]}
                >
                  Locations
                </Text>
                <LocationComponent locArr={locations} />
              </View>
            )}
            {tab == "Stats" && (
              <View style={styles.boxContent}>
                <Text
                  style={[
                    styles.boxTitle,
                    { color: globalStyles["type" + type] },
                  ]}
                >
                  Base Stats
                </Text>
                <View style={styles.statGrid}>
                  <StatsTable stats={props.mon.stats} type={type} />
                </View>
                <Text style={styles.statsExplained}>
                  The ranges shown on the right are for a level 100 Pokémon.
                  Maximum values are based on a beneficial nature, 252 EVs, 31
                  IVs; minimum values are based on a hindering nature, 0 EVs, 0
                  IVs
                </Text>
                <Text
                  style={[
                    styles.boxTitle,
                    { color: globalStyles["type" + type] },
                  ]}
                >
                  Type Defences
                </Text>
                <Text style={[styles.boxPokedexEntry, { marginBottom: 20 }]}>
                  The effectiveness of each type on{" "}
                  {props.mon.species.name[0].toUpperCase() +
                    props.mon.species.name.slice(1)}
                  .
                </Text>
                <TypeDefences types={types} />
              </View>
            )}
            {tab == "Evolution" && (
              <View style={styles.boxContent}>
                <Text
                  style={[
                    styles.boxTitle,
                    { color: globalStyles["type" + type] },
                  ]}
                >
                  Evolution Chart
                </Text>
                <Evolution evolutionChainData={evolutionChainData} />
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  root: {
    // boxSizing: 'border-box',
  },

  container: {
    width: "100%",
    backgroundColor: globalStyles.backgroundtypenormal,
  },

  backArrowTouchable: {
    position: "absolute",
    top: 42.5,
    left: 42.5,
    height: 20,
    width: 20,
    zIndex: 1,
  },

  backArrow: {
    height: 20,
    width: 20,
  },

  pokemonTitleContainer: {
    position: "absolute",
    top: 15,
    left: 0,
    height: 120,
    width: Dimensions.get("window").width,
  },

  pokemonTitle: {
    position: "relative",
    textTransform: "capitalize",
    fontWeight: "700",
    fontSize: 100,
    alignSelf: "center",
    color: "rgba(255, 255, 255, 1.0)",
    fontFamily: "Outline",
  },

  Profile: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 40,
    marginTop: 55,
  },

  top: {
    display: "flex",
    flexDirection: "row",
    height: 155,
    padding: 0,
    justifyContent: "center",
  },

  topImage: {
    width: 125,
    height: 125,
    marginRight: 25,
  },

  circle: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 125,
    width: 125,
  },

  //   dotsSixByThree: {
  //     position: 'absolute',
  //     top: 5,
  //     left: 90,
  //     height: 32,
  //     width: 74
  //   },

  sprite: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 125,
    width: 125,
  },

  cardData: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: 125,
    margin: 0,
  },

  cardTypes: {
    display: "flex",
    flexDirection: "row",
  },

  cardId: {
    fontWeight: "700",
    fontSize: 12,
    color: globalStyles.textnumber,
  },

  cardName: {
    textTransform: "capitalize",
    fontWeight: "700",
    fontSize: 26,
    color: globalStyles.textwhite,
  },

  tabs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
    alignItems: "center",
  },

  box: {
    flexGrow: 1,
    backgroundColor: globalStyles.backgroundwhite,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 40,
  },

  boxContent: {
    marginTop: 40,
    paddingBottom: 40,
    flexGrow: 0,
  },

  boxTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: globalStyles.typenormal,
    marginBottom: 22.5,
  },

  boxPokedexEntry: {
    fontSize: 16,
    fontWeight: "400",
    color: globalStyles.textgrey,
    marginBottom: 30,
  },

  boxAbout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  boxAboutTagContainer: {
    width: 85,
  },
  boxAboutTag: {
    fontSize: 12,
    fontWeight: "500",
    color: globalStyles.textblack,
  },

  boxAboutData: {
    fontSize: 16,
    fontWeight: "400",
    color: globalStyles.textgrey,
    textTransform: "capitalize",
  },

  statsExplained: {
    fontWeight: "500",
    fontSize: 12,
    marginBottom: 20,
    color: globalStyles.textgrey,
  },

  statGrid: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignSelf: "stretch",
  },
});
