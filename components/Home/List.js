import React from "react";
import Pokemon from "./Pokemon.js";
import globalStyles from "../../styles/globalStyles.js";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Text,
  Dimensions,
} from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = (props) => (
  <View style={{ flex: 1 }}>
    <Pokemon mon={props.item} setPokemonProfile={props.setPokemonProfile} />
  </View>
  // console.warn(item),
);

// the filter
const List = (props) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (props.searchPhrase === "") {
      return (
        <>
          <Item item={item} setPokemonProfile={props.setPokemonProfile} />
        </>
      );
    }
    // filter by name / first type / second type / id
    if (true) {
      return (
        <>
          <Item item={item} setPokemonProfile={props.setPokemonProfile} />
        </>
      );
    }
  };

  const keyExtractor = (item) => item.id;
  const getItemLayout = (data, index) => ({
    length: 145,
    offset: 145 * index,
    index,
  });
  return (
    <View
      style={styles.list__container}
      onStartShouldSetResponder={() => {
        props.setClicked(false);
      }}
    >
      {
        // props.loading ?
        // <View style={styles.warningBox}>
        //   <Text style={styles.warningText}>Loading...</Text>
        // </View>
        //   :
        props.filteredData && props.filteredData.length > 0 ? (
          <FlatList
            ref={props.pokemonListRef}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            style={{
              paddingBottom:
                Dimensions.get("window").height -
                globalStyles.LIST_HEIGHT_NEGATIVE,
            }}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            removeClippedSubviews={true}
            data={
              (props.sort == "numLow" &&
                props.filteredData.sort((a, b) => (a.id > b.id ? 1 : -1))) ||
              (props.sort == "numHigh" &&
                props.filteredData.sort((a, b) => (a.id > b.id ? -1 : 1))) ||
              (props.sort == "a-to-z" &&
                props.filteredData.sort((a, b) =>
                  a.name > b.name ? 1 : -1
                )) ||
              (props.sort == "z-to-a" &&
                props.filteredData.sort((a, b) => (a.name > b.name ? -1 : 1)))
            }
          />
        ) : (
          <>
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>Nothing found!</Text>
            </View>
          </>
        )
      }
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 0,
    width: "100%",
    height: "100%",
    flex: 1,
  },
  flatListContainer: {
    height: "100%",
    flex: 1,
  },
  warningBox: {
    padding: 20,
    backgroundColor: globalStyles.typenormal,
    borderRadius: 10,
    height: 24,
  },

  warningText: {
    fontSize: 16,
    color: globalStyles.textwhite,
  },
});
