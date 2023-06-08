import { Layout } from "@/components/layouts";
import { PokemonFull, SimplePokemon } from "@/interfaces";
import { getPokemonInfo, localFavorites } from "@/utils";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useState } from "react";

interface Props {
  pokemon: PokemonFull;
}

const PokemonByName: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.pokemonExists(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);
    if (!isInFavorites) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      });
    }
  };

  return (
    <Layout title={ pokemon.name }>
      <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
        <Grid xs={ 12 } sm={ 4 }>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                alt={ pokemon.name }
                width="100"
                height={ 200 }
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={ 12 } sm={ 8 }>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{ pokemon.name }</Text>
              <Button color="gradient" ghost={ !isInFavorites } onPress={ onToggleFavorite }>
                {
                  !localFavorites.pokemonExists(pokemon.id) ? 
                  'Guardar en favoritos' :
                  'Borrar de favoritos'
                }
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={ 30 }>Sprites:</Text>
              <Container direction='row' display='flex' gap={ 0 }>
                <Image
                  src={ pokemon.sprites.front_default }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image
                  src={ pokemon.sprites.back_default }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image
                  src={ pokemon.sprites.front_shiny }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image
                  src={ pokemon.sprites.back_shiny }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout> 
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const { results }: {
    results: SimplePokemon[];
  } = await data.json();

  const paths: { params: { name: string; } }[] = [];
  results.forEach((pokemon) => {
    paths.push({
      params: {
        name: pokemon.name,
      }
    });
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { name } = ctx.params as { name: string };
  const pokemon = await getPokemonInfo(name);
  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      pokemon, 
    },
  };
};

export default PokemonByName;
