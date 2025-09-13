import styled from "styled-components";

const StyledButton = styled.button`
  width: fit-content;
  white-space: nowrap;
  border-radius: 0.1875rem;
  background: ${({ theme, $secondary }) =>
    $secondary
      ? theme.colors.background
      : `linear-gradient(
    121deg,
    rgb(96, 0, 252) 40%,
    rgb(126, 46, 253) 100%
  );`};
  padding: 0.75rem 1.15rem;
  color: ${({ theme, $secondary }) =>
    $secondary ? theme.colors.primary : theme.colors.background};
  border: ${({ theme, $secondary }) =>
    $secondary ? `0.5px solid ${theme.colors.primary}` : `none`};
  text-align: center;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 110%; /* 0.9625rem */
  letter-spacing: 0.04375rem;
  gap: 0.5rem;
  display: flex;
  align-items: center;
`;

const Button = ({ title, onClick, secondary, icon }) => {
  return (
    <StyledButton $secondary={secondary} onClick={onClick}>
      {icon && <img src={icon} alt="icon" width={16} height={16} />}
      {title}
    </StyledButton>
  );
};

export default Button;
