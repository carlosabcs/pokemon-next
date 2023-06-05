import { Spacer, Text, useTheme, Link } from "@nextui-org/react"
import Image from "next/image";
import NextLink from "next/link";

export const Navbar = () => {

  const { theme } = useTheme();

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      padding: '0 20px',
      backgroundColor: theme?.colors.gray50.value,
    }}>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="Ícono de la App"
        width={70}
        height={70}
      />
      
      <Link as={ NextLink } href="/">
        <Text color="white" h2>P</Text>
        <Text color="white" h3>okémon</Text>
      </Link>

      <Spacer css={{ flex: 1 }}/>

      <Link as={ NextLink } href="/favorites/">
        <Text>Favoritos</Text>
      </Link>
      
    </div>
  )
}
