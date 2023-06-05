import { Layout } from '@/components/layouts';
import { PokemonFull } from '@/interfaces';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

interface Props {
  pokemon: PokemonFull;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title="Algún pokémon">
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
              <Button color="gradient" ghost>
                Guardar en favoritos
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
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params as { id: string };

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data: PokemonFull = await response.json();

  return {
    props: {
      pokemon: data, 
    },
  };
};

export default PokemonPage;
