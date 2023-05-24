import Head from "next/head";
import { ReactNode } from "react";
import { Navbar } from "../ui";

export const Layout = ({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) => {
  return (
    <>
      <Head>
        <title>{ title || 'Pokemon App' }</title>
        <meta name="author" content="Carlos Córdova"/>
        <meta name="description" content="Información sobre el Pokemon"/>
      </Head>

      <Navbar/>

      <main style={{
        padding: '0 20px',
      }}>
        { children }
      </main>
    </>
  )
}
