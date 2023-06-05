import { Layout } from "@/components/layouts";
import { PokemonCard } from "@/components/pokemons";
import { Pokemon, SimplePokemon } from "@/interfaces";
import { Grid } from "@nextui-org/react";
import { GetStaticProps, NextPage } from "next";

interface Props {
  pokemons: Pokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokemons">
      <Grid.Container gap={ 2 }>
        {
          pokemons.map(
            (pokemon) => (<PokemonCard pokemon={pokemon} key={pokemon.id} />)
          )
        }
      </Grid.Container>
    </Layout>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const { results }: {
    results: SimplePokemon[];
  } = await data.json();

  const pokemons: Pokemon[] = results.map((pokemon, idx) => ({
    ...pokemon,
    id: idx + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idx + 1}.svg`,
  }));

  return {
    props: {
      pokemons, 
    },
  };
};

export default HomePage;