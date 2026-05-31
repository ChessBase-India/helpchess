import styled from "styled-components";

import Navbar from "@/components/Navbar";

const HeaderContainer = styled.header`
  width: 100%;
  height: 4rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  .scrolled {
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Navbar></Navbar>
    </HeaderContainer>
  );
};

export default Header;
