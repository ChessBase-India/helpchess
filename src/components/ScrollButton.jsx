import styled from "styled-components";

const Button = styled.button`
  width: 3rem;
  aspect-ratio: 1;
  border: 1px solid rgba(91, 46, 232, 0.18);
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  img {
    width: 45%;
    aspect-ratio: 1;
  }
`;

export default function ScrollButton({ left = true, onClick, label }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      aria-label={label || (left ? "Scroll left" : "Scroll right")}
    >
      <img src={`/images/icons/slide-${left ? `left` : `right`}.svg`} alt="" />
    </Button>
  );
}
