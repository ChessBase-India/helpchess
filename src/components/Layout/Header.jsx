import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4rem;
`;

const Logo = styled.img`
  width: 6.303rem;
  height: 2rem;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src="/images/logo.png" />
    </HeaderContainer>
  );
};

export default Header;
