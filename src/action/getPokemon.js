import axios from "axios";
import { useEffect, useState } from "react";

const getPokemon = async (url) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${url}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getPokemon;
