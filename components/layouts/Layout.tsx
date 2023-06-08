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

  const origin = (typeof window === 'undefined') ? '' : window.location.origin;

  return (
    <>
      <Head>
        <title>{ title || 'Pokemon App' }</title>
        <meta name="author" content="Carlos Córdova"/>
        <meta name="description" content="Información sobre el Pokemon"/>

        <meta property="og:title" content={ `Información sobre ${title}` }/>
        <meta property="og:description" content={ `Esta es la página sobre ${title}` }/>
        <meta property="og:image" content={ `${origin}/img/banner.webp` }/>
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
