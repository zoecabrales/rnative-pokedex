import React, { memo } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import globalStyles from "../../styles/globalStyles.js";
import TypeBadge from "./TypeBadge";
import Pokeball from "../../images/vectors/patterns/Pokeball.png";
import DotsSixByThree from "../../images/vectors/patterns/6x3.png";
import FastImage from "react-native-fast-image";

function Pokemon(props) {
  function formatId(id) {
    var num = "" + id;
    while (num.length < 3) {
      num = "0" + num;
    }
    num = "#" + num;
    return num;
  }
  return (
    //    console.log(props.sprites.other["official-artwork"].front_default),
    <TouchableOpacity onPress={() => props.setPokemonProfile(props.mon)}>
      <View style={styles.container}>
        <View
          style={[
            styles.card,
            {
              backgroundColor:
                globalStyles["backgroundtype" + props.mon.types[0].type.name],
            },
          ]}
        >
          <Image style={styles.pokeball} source={Pokeball} />
          <Image style={styles.dotsSixByThree} source={DotsSixByThree} />
          <Image
            onError={(e) => console.log(e.nativeEvent.error)}
            style={styles.sprite}
            source={{
              uri: `${props.mon.sprites.other["official-artwork"].front_default}`,
            }}
          />
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
      </View>
    </TouchableOpacity>
  );
}

export default memo(Pokemon);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    margin: 0,
  },

  card: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    marginTop: 30,
    height: 115,
    padding: 20,
    backgroundColor: globalStyles.typenormal,
  },

  pokeball: {
    position: "absolute",
    right: 0,
    bottom: 0,
    height: 115,
    width: 130,
  },

  dotsSixByThree: {
    position: "absolute",
    top: 5,
    left: 90,
    height: 32,
    width: 74,
  },

  sprite: {
    position: "absolute",
    right: 10,
    bottom: 10,
    height: 130,
    width: 130,
  },

  cardData: {
    display: "flex",
    flexDirection: "column",
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

  cardImg: {
    position: "absolute",
    right: 10,
    bottom: 25,
    height: 130,
    width: 130,
  },
});
