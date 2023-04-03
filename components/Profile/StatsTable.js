import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import globalStyles from "../../styles/globalStyles.js";

const StatsTable = (props) => {
  const [statsTable, setStatsTable] = useState();
  const [statsTotal, setStatsTotal] = useState(0);

  function addStatsToTotal() {
    let statTotal = 0;
    for (var i = 0; i < props.stats.length; i++) {
      statTotal += Number(props.stats[i].base_stat);
    }
    setStatsTotal(statTotal);
  }

  function formatStat(stat) {
    switch (stat) {
      case "hp":
        return "HP";
      case "attack":
        return "Attack";
      case "defense":
        return "Defense";
      case "special-attack":
        return "Sp. Att";
      case "special-defense":
        return "Sp. Def";
      case "speed":
        return "Speed";
      default:
        return "";
    }
  }

  function calcStatBarWidth(name, value) {
    switch (name) {
      case "hp":
        return (value / 255) * 100 + "%";
      case "attack":
        return (value / 181) * 100 + "%";
      case "defense":
        return (value / 230) * 100 + "%";
      case "special-attack":
        return (value / 180) * 100 + "%";
      case "special-defense":
        return (value / 230) * 100 + "%";
      case "speed":
        return (value / 200) * 100 + "%";
      case "total":
        return ((value - 170) / (720 - 170)) * 100 + "%";
      default:
        return 0;
    }
  }
  useEffect(() => {
    addStatsToTotal();
    const createStatsTable = props.stats.map((stat) => (
      <View key={stat.stat.name} style={styles.rowContainer}>
        <Text style={styles.statName}>{formatStat(stat.stat.name)}</Text>
        <Text style={styles.statBaseStat}>{stat.base_stat}</Text>
        <View style={styles.statBarContainer}>
          <View
            style={[
              styles.statBar,
              {
                backgroundColor: globalStyles["type" + props.type],
                width: calcStatBarWidth(stat.stat.name, stat.base_stat),
              },
            ]}
          ></View>
        </View>
        <Text style={styles.statLow}>
          {stat.stat.name === "hp"
            ? // HP Calulator: (((2x Base+ IV + (EV/4)*Level)/100)+Level+10)
              Math.floor(((2 * stat.base_stat + 0 + 0 / 4) * 100) / 100 + 110)
            : //  Stat Calulator: ((((2*Base+IV+(EV/4)*Level)/100)+5)*Nature)
              Math.floor(
                (((2 * stat.base_stat + 0 + 0 / 4) * 100) / 100 + 5) * 0.9
              )}
        </Text>
        <Text style={styles.statHigh}>
          {stat.stat.name === "hp"
            ? // HP Calulator: (((2x Base+ IV + (EV/4)*Level)/100)+Level+10)
              Math.floor(
                ((2 * stat.base_stat + 31 + 252 / 4) * 100) / 100 + 110
              )
            : //  Stat Calulator: ((((2*Base+IV+(EV/4)*Level)/100)+5)*Nature)
              Math.floor(
                (((2 * stat.base_stat + 31 + 252 / 4) * 100) / 100 + 5) * 1.1
              )}
        </Text>
      </View>
    ));
    setStatsTable(createStatsTable);
  }, []);

  return (
    <View style={styles.container}>
      {statsTable}
      <View style={[styles.rowContainer, { marginTop: 2.5 }]}>
        <Text style={styles.statName}>Total</Text>
        <Text
          style={[styles.statBaseStat, { fontSize: 16 }, { fontWeight: "700" }]}
        >
          {statsTotal}
        </Text>
        <View style={styles.statBarContainer}>
          <View
            style={[
              styles.statBar,
              {
                backgroundColor: globalStyles["backgroundtype" + props.type],
                width: calcStatBarWidth("total", statsTotal),
              },
            ]}
          ></View>
        </View>
        <Text
          style={[
            styles.statLow,
            { fontSize: 12, fontWeight: "500", color: globalStyles.textblack },
          ]}
        >
          Min
        </Text>
        <Text
          style={[
            styles.statHigh,
            { fontSize: 12, fontWeight: "500", color: globalStyles.textblack },
          ]}
        >
          Max
        </Text>
      </View>
    </View>
  );
};

export default StatsTable;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "stretch",
    maxWidth: "100%",
    marginBottom: 22.5,
    paddingHorizontal: 0,
  },

  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  statName: {
    width: "15%",
    textTransform: "capitalize",
    fontSize: 12,
    fontWeight: "500",
    color: globalStyles.textblack,
  },

  statBaseStat: {
    width: "12%",
    minWidth: 28,
    fontSize: 16,
    fontWeight: "400",
    color: globalStyles.textgrey,
    textAlign: "right",
  },

  statBarContainer: {
    width: "49%",
    height: 4,
    paddingHorizontal: 15,
  },

  statBar: {
    backgroundColor: globalStyles.typenormal,
    borderRadius: 2,
    height: 4,
  },

  statLow: {
    width: "12%",
    fontSize: 16,
    fontWeight: "400",
    color: globalStyles.textgrey,
    textAlign: "right",
  },

  statHigh: {
    width: "12%",
    fontSize: 16,
    fontWeight: "400",
    color: globalStyles.textgrey,
    textAlign: "right",
  },
});
