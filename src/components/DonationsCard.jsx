import styled from "styled-components";

const Wrapper = styled.div`
  min-width: 18rem;
  height: 12rem;
  border: 1px solid #6562fe80;
  padding: 1.5rem 1rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
`;

const Icon = styled.img`
  width: 6rem;
  aspect-ratio: 1;
`;

const TextContainer = styled.span`
  max-width: 50%;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  .thankYou {
    font-family: Roboto;
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 14.06px;
    text-align: right;
  }

  .name {
    color: #6562fe;
    font-family: Roboto;
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 30px;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .amount {
    color: #6562fe;
    font-family: Roboto;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 30px;
    text-align: right;
  }
`;

export default function DonationCard({ amount, name }) {
  return (
    <Wrapper>
      <Icon src="/images/icons/confetti.svg"></Icon>
      <TextContainer>
        <p className="thankYou">Thank you believers!</p>
        <span>
          <p className="name">{name}</p>
          <p className="amount">{`₹${amount}`}</p>
        </span>
      </TextContainer>
    </Wrapper>
  );
}
