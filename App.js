import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import PokemonsScreen from "./src/screens/PokemonsScreen";
import DetailsPokemonScreen from "./src/screens/PokemonDetailsScreen";
const Stack = createNativeStackNavigator();

const commonHeader = {
  headerStyle: {
    backgroundColor: "#f6577c",
  },
  headerTitleStyle: {
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    display: "flex",
    width: "100%",
    fontWeight: "400",
    paddingTop: 10,
    fontSize: 25,
  },
  headerTintColor: "black",
  headerLeft: () => <Text />,
  headerRight: () => <Text />,
};
const App = () => {
  const backButton = (navigation) => ({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: 30,
          height: 30,
          marginLeft: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",

        }}
      >
        <>
          <Text style={{color:'black'}}>Back</Text>
        </>
      </TouchableOpacity>
    ),
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Pokemons"
          component={PokemonsScreen}
          options={({ navigation }) => ({
            title: "Pokemons",
            ...commonHeader,
          })}
        />
        <Stack.Screen
          name="DetailsPokemonScreen"
          component={DetailsPokemonScreen}
          options={({ navigation }) => ({
            title: "Detail Pokemon",
            ...commonHeader,
            ...backButton(navigation),
            headerStyle: {
              backgroundColor: "#e8028c",
            },
            headerTintColor: "#57f6e3",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
