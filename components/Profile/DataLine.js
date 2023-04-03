import React from "react";
import { View, Text, StyleSheet } from "react-native";
import globalStyles from "../../styles/globalStyles.js";
import defencesData from "./defencesData.js";
import TypeDefencesIcon from "./TypeDefencesIcon.js";

const DataLine = (props) => {
  const genderRate = () => {
    console.log("Gender Rate", props.data);
    if (props.tag == "Gender") {
      if (props.data == -1) {
        return <Text style={styles.boxAboutData}>Genderless</Text>;
      }
      let female = (props.data / 8) * 100;
      let male = 100 - female;
      return (
        <View style={[styles.boxAboutData, styles.genderContainer]}>
          <Text style={styles.male}>♂ {male}% / </Text>
          <Text style={styles.female}>♀ {female}%</Text>
        </View>
      );
    }
  };

  const weakness = () => {
    console.log("Weaknesses Data", props.data);
    let weaknesses = [];
    const typeA = props.data[0];
    if (props.data.length == 1) {
      for (let defences in defencesData[typeA]) {
        if (defencesData[typeA][defences] >= 1) {
          weaknesses.push(
            <TypeDefencesIcon
              key={defences}
              type={defences}
              effectiveness={defencesData[typeA][defences]}
            />
          );
        }
      }
    }
    if (props.data.length == 2) {
      const typeB = props.data[1];

      for (let defences in defencesData[typeA]) {
        console.log(defencesData[typeA][defences]);
        if (
          defencesData[typeA][defences] == null ||
          defencesData[typeB][defences] == null
        ) {
          continue;
        }
        if (
          defencesData[typeA][defences] + defencesData[typeB][defences] >=
          1
        ) {
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
    }
    if (weaknesses.length == 0)
      return <Text style={styles.boxAboutData}>No weaknesses!</Text>;
    return weaknesses;
  };

  return (
    <View style={styles.boxAbout}>
      <Text style={styles.boxAboutTag}>{props.tag}</Text>
      {props.tag == "Weaknesses" ? (
        weakness()
      ) : props.tag == "Gender" ? (
        genderRate()
      ) : (
        <Text style={styles.boxAboutData}>{props.data}</Text>
      )}
    </View>
  );
};

export default DataLine;

const styles = StyleSheet.create({
  boxAbout: {
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  boxAboutTagContainer: {},

  boxAboutTag: {
    fontSize: 12,
    fontWeight: "500",
    color: globalStyles.textblack,
    minWidth: 120,
    maxWidth: 125,
    flex: 1,
    flexWrap: "wrap",
  },

  boxAboutDataContainer: {},

  boxAboutData: {
    fontSize: 16,
    fontWeight: "400",
    color: globalStyles.textgrey,
    textTransform: "capitalize",
    flex: 1,
    flexWrap: "wrap",
  },

  genderContainer: {
    display: "flex",
    flexDirection: "row",
    fontSize: 22,
  },

  male: {
    color: globalStyles.typeflying,
  },

  female: {
    color: globalStyles.typefairy,
  },
});
