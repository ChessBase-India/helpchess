import styled from "styled-components";

const StyledButton = styled.button`
  width: fit-content;
  border-radius: 6.25rem;
  background: #6000fc;
  padding: 0.75rem 1.15rem;
  color: #fff;
  text-align: center;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 110%; /* 0.9625rem */
  letter-spacing: 0.04375rem;
`;

const Button = ({ title, onClick }) => {
  return <StyledButton onClick={onClick}>{title}</StyledButton>;
};

export default Button;
