import Head from "next/head";
import styled from "styled-components";

import Hero from "@/components/Hero";

const HomeContainer = styled.div`
  width: 100%;
  min-height: 100dvh;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Helpchess - ChessBase India Foundation | NGO</title>
        <meta
          name="description"
          content="Helpchess is on a mission to support 1000 Indian chess players to reach their goals!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContainer>
        <Hero />
      </HomeContainer>
    </>
  );
}
