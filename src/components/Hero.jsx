import styled from "styled-components";

import CheckPattern from "@/components/CheckPattern";
import Button from "@/components/Button";

const HeroContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
`;

const HeroImage = styled.img`
  position: relative;
  width: 22.8125rem;
  height: 21.21563rem;
  flex-shrink: 0;
`;

const StyledCheckPattern = styled(CheckPattern)`
  width: 15.39206rem;
  height: 15.39206rem;
  position: absolute;
  top: 0;
  left: 3.5rem;
`;

const HeroImageContainer = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  margin: 0 1.5rem;
`;

const HeroTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 0 1.5rem;
`;

const HeroTitle = styled.h1`
  color: #6000fc;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 110%;
`;

const HeroDescription = styled.p`
  color: #1d1d1d;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 1.5rem */
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroImageContainer>
        <StyledCheckPattern />
        <HeroImage src="/images/hero.png" alt="Helpchess Hero Image" />
      </HeroImageContainer>
      <HeroTextContainer>
        <HeroTitle>You can power Indian Chess.</HeroTitle>
        <HeroDescription>
          Join India’s largest chess charity in our mission of supporting 1000
          chess players and be a part of Indian Chess history.{" "}
        </HeroDescription>
        <Button title="Support Now" />
      </HeroTextContainer>
    </HeroContainer>
  );
};

export default Hero;
