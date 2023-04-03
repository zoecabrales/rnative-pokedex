import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import globalStyles from "../../styles/globalStyles.js";
import TypeDefencesIcon from "./TypeDefencesIcon.js";
import defencesData from "./defencesData.js";

const TypeDefences = (props) => {
  let weaknesses = [];
  const typeA = props.types[0];
  if (props.types.length == 1) {
    for (let defences in defencesData[typeA]) {
      weaknesses.push(
        <TypeDefencesIcon
          key={defences}
          type={defences}
          effectiveness={defencesData[typeA][defences]}
        />
      );
    }
  }
  if (props.types.length == 2) {
    const typeB = props.types[1];

    for (let defences in defencesData[typeA]) {
      if (
        defencesData[typeA][defences] == null ||
        defencesData[typeB][defences] == null
      ) {
        weaknesses.push(
          <TypeDefencesIcon
            key={defences}
            type={defences}
            effectiveness={null}
          />
        );
        continue;
      }
      weaknesses.push(
        <TypeDefencesIcon
          key={defences}
          type={defences}
          effectiveness={
            defencesData[typeA][defences] + defencesData[typeB][defences]
          }
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      {weaknesses}
      <Text></Text>
    </View>
  );
};

export default TypeDefences;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    flex: 9,
  },
});
