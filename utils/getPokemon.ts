import { PokemonFull } from "@/interfaces";

export const getPokemonInfo = async (nameOrId: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}/`);
  const data: PokemonFull = await response.json();
  return {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
  };
};