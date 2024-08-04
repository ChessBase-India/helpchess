import styled from "styled-components";

const StyledButton = styled.button`
  width: fit-content;
  border-radius: 6.25rem;
  background: ${({ theme, secondary }) =>
    secondary ? theme.colors.background : theme.colors.primary};
  padding: 0.75rem 1.15rem;
  color: ${({ theme, secondary }) =>
    secondary ? theme.colors.primary : theme.colors.background};
  border: ${({ theme, secondary }) =>
    secondary ? `0.5px solid ${theme.colors.primary}` : `none`};
  text-align: center;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 110%; /* 0.9625rem */
  letter-spacing: 0.04375rem;
  box-shadow: ${({ secondary }) =>
    secondary ? `none` : `0px 4px 4px 0px #6000FC40`};
`;

const Button = ({ title, onClick, secondary }) => {
  return (
    <StyledButton secondary={secondary} onClick={onClick}>
      {title}
    </StyledButton>
  );
};

export default Button;
