import { Layout } from '@/components/layouts';
import { PokemonFull } from '@/interfaces';
import { getPokemonInfo, localFavorites } from '@/utils';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import confetti from 'canvas-confetti';

interface Props {
  pokemon: PokemonFull;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

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
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  for (let i = 1; i <= 151; i++) {
    paths.push({
      params: {
        id: `${i}`,
      }
    })
  }
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params as { id: string };
  const pokemon = await getPokemonInfo(id);
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
    revalidate: 86400,
  };
};

export default PokemonPage;
