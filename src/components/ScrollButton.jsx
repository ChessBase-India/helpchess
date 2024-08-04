import styled from "styled-components";

const Button = styled.button`
  width: 4rem;
  aspect-ratio: 1;
  box-shadow: 0px 3.23px 6.46px 0px #00000040;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  img {
    width: 45%;
    aspect-ratio: 1;
  }
`;

export default function ScrollButton({ left = true, onClick }) {
  return (
    <Button onClick={onClick}>
      <img
        src={`/images/icons/slide-${left ? `left` : `right`}.svg`}
        alt={`donation-slide-${left ? `left` : `right`}`}
      />
    </Button>
  );
}
