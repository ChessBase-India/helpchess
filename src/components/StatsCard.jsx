import styled from "styled-components";

const StyledStatsCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 9rem;
  max-width: 14rem;
  border-radius: 1rem;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  gap: 0.9rem;
  padding: 1.5rem 1rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

const IconWrap = styled.span`
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.875rem;
  background: ${({ theme }) => theme.colors.primarySoft};
`;

const Icon = styled.img`
  width: 1.5rem;
  aspect-ratio: 1/1;
`;

const Text = styled.p`
  font-family: var(--font-heading), sans-serif;
  color: ${({ theme }) => theme.colors.ink};
  text-align: center;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.light};
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 0.4rem;
`;

const StatsCard = ({ title, img, text }) => {
  return (
    <StyledStatsCard>
      <IconWrap>
        <Icon src={img} alt="" />
      </IconWrap>
      <TextContainer>
        <Text>{text}</Text>
        <Title>{title}</Title>
      </TextContainer>
    </StyledStatsCard>
  );
};

export default StatsCard;
