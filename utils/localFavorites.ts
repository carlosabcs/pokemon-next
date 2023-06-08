const toggleFavorite = (id: number) => {
  let favorites: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );
  if (favorites.includes(id)) {
    favorites = favorites.filter(favorite => favorite !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const pokemonExists = (id: number) => {
  if (typeof window === 'undefined') return false;
  
  return JSON.parse(
    localStorage.getItem('favorites') || '[]'
  ).includes(id);
}

const pokemons = (): number[] => {
  return JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );
}
 
export default {
  pokemonExists,
  toggleFavorite,
  pokemons,
};