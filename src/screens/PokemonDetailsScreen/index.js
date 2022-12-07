import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";

import background from "../../../assets/pokemonsBackground.png";
import getPokemon from "../../action/getPokemon";

const DetailsPokemonScreen = () => {
  const route = useRoute();
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    getPokemon(route?.params?.url).then((data) =>
      setPokemon([
        {
          name: data?.name,
          type: data?.types.map((item, index) => (
            <Text key={item.type.name + index}>
              {item.type.name}
              {"\n"}
            </Text>
          )),
          experience: data?.base_experience,
          baseStat: data?.stats[0]?.base_stat,
          effort: data?.stats[0]?.effort,
          img: data?.sprites.other.home.front_default,
        },
      ])
    );
  }, []);

  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        {pokemon?.map((item, index) => (
          <View key={item?.experience + index}>
            <Text style={[styles.textStyle, { textAlign: "right" }]}>
              Experience:{item?.experience}
            </Text>
            <Text style={styles.titleText}>{item?.name}</Text>
            <View style={styles.img}>
              <Image
                source={{ uri: item?.img }}
                style={{ width: 200, height: 200 }}
              />
            </View>
            <View style={styles.card}>
              <Text style={styles.textStyle}>Type Pokemon: {item.type}</Text>
              <Text style={styles.textStyle}>Stat: {item?.baseStat}</Text>
              <Text style={styles.textStyle}>Effort: {item?.effort}</Text>
            </View>
          </View>
        ))}
      </View>
    </ImageBackground>
  );
};
export default DetailsPokemonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  card: {
    backgroundColor: "#488da6",
    borderRadius: 25,
    opacity: 1,
    padding: 15,
  },
  titleText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 25,
    fontWeight: "bold",
    color: "#f1eeef",
  },
  img: {
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 6.2,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 6.15,
    elevation: 5,
  },
  textStyle: {
    fontWeight: "bold",
    color: "#d3b8bc",
    fontSize: 23,
    shadowColor: "#000",
    shadowOffset: {
      width: 6.2,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6.15,
    elevation: 5,
  },
});
