import styled from "styled-components";

import Navbar from "@/components/Navbar";

const HeaderContainer = styled.header`
  width: 100%;
  height: 4rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
`;


const Header = () => {
  return (
    <HeaderContainer>
      <Navbar></Navbar>
    </HeaderContainer>
  );
};

export default Header;
