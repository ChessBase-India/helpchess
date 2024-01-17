import Head from "next/head";
import styled from "styled-components";

import Hero from "@/components/Hero";
import StatsCard from "@/components/StatsCard";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100dvh;
  gap: 2.5rem;
`;

const StatsContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 13.5rem;
  width: 100%;
  border-radius: 0.9375rem;
  background: linear-gradient(105deg, #fff9c1 58.95%, #fff 100%);
  gap: 0.44rem;
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
        <StatsContainer>
          <StatsCard
            title="raised"
            text="₹6.7 M"
            img="/images/icons/gift.svg"
          ></StatsCard>
          <StatsCard
            title="believers"
            text="4K+"
            img="/images/icons/star.svg"
          ></StatsCard>
          <StatsCard
            title="players"
            text="50+"
            img="/images/icons/pawn.svg"
          ></StatsCard>
        </StatsContainer>
      </HomeContainer>
    </>
  );
}
