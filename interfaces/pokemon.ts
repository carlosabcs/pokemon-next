export interface SimplePokemon {
  name: string;
  url: string;
}

export interface Pokemon extends SimplePokemon {
  img: string;
  id: number;
}