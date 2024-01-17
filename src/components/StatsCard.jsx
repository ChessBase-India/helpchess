import styled from "styled-components";

const StyledStatsCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 7.3125rem;
  height: 8.4375rem;
  border-radius: 0.625rem;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(96, 0, 252, 0.3);
  gap: 1.2rem;
`;

const Title = styled.p`
  color: #1d1d1d;
  text-align: center;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Icon = styled.img`
  width: 2rem;
  flex-shrink: 0;
`;

const Text = styled.p`
  color: #1d1d1d;
  text-align: center;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 0.25rem;
`;

const StatsCard = ({ title, img, text }) => {
  return (
    <StyledStatsCard>
      <Icon src={img} alt="Stats card icon" />
      <TextContainer>
        <Title>{title}</Title>
        <Text>{text}</Text>
      </TextContainer>
    </StyledStatsCard>
  );
};

export default StatsCard;
