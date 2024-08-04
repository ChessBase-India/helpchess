import styled from "styled-components";

import CheckPattern from "@/components/CheckPattern";
import RazorPayButton from "@/components/RazorpayButton";
import { BREAK_POINTS } from "@/styles/responsive";

const HeroContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  ${BREAK_POINTS.mobile`
    flex-direction: column;
  `};
  ${BREAK_POINTS.tablet`
   flex-direction: column;
  `};
  ${BREAK_POINTS.laptop`
  flex-direction: row-reverse;
  `};
  ${BREAK_POINTS.desktop`
   flex-direction: row-reverse;

  `};
`;

const HeroImage = styled.img`
  position: relative;
  width: 22.8125rem;
  height: 21.21563rem;
  flex-shrink: 0;

  ${BREAK_POINTS.laptop`
    width: 100%;
    height: auto;

  `};
  ${BREAK_POINTS.desktop`
    width: 100%;
    height: auto;   
  `};
`;

const StyledCheckPattern = styled(CheckPattern)`
  width: 15.39206rem;
  height: 15.39206rem;
  position: absolute;
  top: 0;
  left: 3.5rem;

  ${BREAK_POINTS.laptop`
    width: 80%;
    height: auto;
  `};

  ${BREAK_POINTS.desktop`
    width: 80%;
    height: auto;
  `};
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

  ${BREAK_POINTS.laptop`
    font-size: 3rem;
    width: 25rem;
  `};

  ${BREAK_POINTS.desktop`
    font-size: 3.5rem; 
    width: 25rem;
  `};
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
        <RazorPayButton />
      </HeroTextContainer>
    </HeroContainer>
  );
};

export default Hero;
