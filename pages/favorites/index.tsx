import { Layout } from "@/components/layouts";
import { FavoritePokemons } from "@/components/pokemons/FavoritePokemons";
import { NoFavorites } from "@/components/ui";
import { localFavorites } from "@/utils";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Favorites: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons);
  }, []);

  return (
    <Layout title="Favorite Pokémons">
      {
        favoritePokemons.length ? 
        <FavoritePokemons favoritePokemons={ favoritePokemons }/> :
        <NoFavorites/>
      }
    </Layout>
  )
}

export default Favorites;
