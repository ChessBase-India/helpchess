import styled from "styled-components";

import Navbar from "@/components/Navbar";

const HeaderContainer = styled.header`
  width: 100%;
  height: 4.5rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid transparent;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:has(.scrolled) {
    border-bottom-color: ${({ theme }) => theme.colors.border};
    box-shadow: 0 6px 20px -12px rgba(24, 18, 43, 0.25);
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
