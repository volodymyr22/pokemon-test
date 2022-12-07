import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Card = ({ pokemon, pokemonPressed, imgPokemon, pokedex }) => {
  return (
    <TouchableOpacity onPress={() => pokemonPressed(pokemon)}>
      <>
        <View style={styles.container}>
          <Text style={{ fontSize: 25,color:'white', textTransform: "uppercase", }}>{pokemon}</Text>
          <Image
            source={{ uri: imgPokemon }}
            style={{ width: 210, height: 210 }}
          />
          <Text style={styles.pokedex}>{pokedex}</Text>
        </View>
      </>
    </TouchableOpacity>
  );
};
export default Card;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#57f1f6",
    opacity: 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 7,
    padding: 12,
    paddingLeft: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 6.2,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6.15,
    elevation: 5,
    borderRadius: 25,
  },
  pokedex: {
    position: "absolute",
    bottom: 10,
    left: 50,
    fontSize: 25,
    color:'white'
  },
});
