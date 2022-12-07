import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import background from "../../../assets/pokemonsBackground.png";
import Card from "../../components/Card";
import { BASE_URL } from "../../constant";

const PokemonsScreen = () => {
  const navigation = useNavigation();
  const [nextPage, setNextPage] = useState(BASE_URL);
  const [isSort, setIsSort] = useState(true);

  const [allPokemons, setAllPokemons] = useState([]);
  const pokemonPressed = (name, stats) => {
    navigation.navigate("DetailsPokemonScreen", {
      url: name,
      stats,
    });
  };
  useEffect(() => {
    getPokemons();
  }, [nextPage]);
  const getPokemons = async () => {
    const res = await axios.get(nextPage);
    setNextPage(res.data.next);
    getPokemonDetails(res.data.results);
  };
  const getPokemonDetails = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      if (allPokemons !== undefined) {
        setAllPokemons((pokeData) => [...pokeData, result.data]);
      } else {
        setAllPokemons([result.data]);
      }
    });
  };
  const renderItem = ({ item }) => {
    return (
      <Card
        pokedex={item.game_indices[0].game_index}
        pokemon={item?.name}
        imgPokemon={item?.sprites?.back_shiny}
        url={item?.url}
        pokemonPressed={(url) => pokemonPressed(url, item?.stats)}
      />
    );
  };
  const sortPokemon = () => {
    setIsSort(!isSort);
    if (isSort) {
      const sortAscending = []
        .concat(allPokemons)
        .sort(
          (a, b) => a.game_indices[0].game_index - b.game_indices[0].game_index
        );
      setAllPokemons([...sortAscending]);
    } else {
      const descending = []
        .concat(allPokemons)
        .sort(
          (a, b) => b.game_indices[0].game_index - a.game_indices[0].game_index
        );
      setAllPokemons([...descending]);
    }
  };
  return (
    <ImageBackground source={background} resizeMode="stretch">
      <SafeAreaView style={{ paddingHorizontal: 30 }}>
        <TouchableOpacity
          onPress={() => sortPokemon()}
          style={styles.sortStyle}
        >
          <Text style={{ color: "white" }}>Sort by Pokedex</Text>
        </TouchableOpacity>
        <FlatList
          data={allPokemons}
          renderItem={renderItem}
          keyExtractor={(item, index) => item?.name + index}
          initialNumToRender={5}
          onEndReachedThreshold={1}
          onEndReached={() => {
            if (allPokemons) {
              setNextPage(nextPage);
            }
          }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default PokemonsScreen;
const styles = StyleSheet.create({
  sortStyle: {
    marginTop: 10,
    padding: 7,
    backgroundColor: "#e0336f",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 10,
    color: "white",
  },
});
