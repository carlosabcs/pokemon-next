import { Pokemon } from "@/interfaces"
import { Card, Grid, Row, Text } from "@nextui-org/react"
import { useRouter } from "next/router"
import { FC } from "react";

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {

  const router = useRouter();

  const redirectToPokemon = () => {
    router.push(`/pokemon/${pokemon.id}/`);
  };

  return (
    <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 }>
      <Card isHoverable isPressable onClick={ redirectToPokemon }>
        <Card.Body css={{ p: 1}}>
          <Card.Image
            src={ pokemon.img }
            width="100%"
            height={ 140 }
          />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{ pokemon.name }</Text>
            <Text>#{ pokemon.id }</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  )
}
