import { useEffect, useState } from "react";
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
  border-bottom: 1px solid
    ${({ theme, $scrolled }) =>
      $scrolled ? theme.colors.border : "transparent"};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 6px 20px -12px rgba(24, 18, 43, 0.25)" : "none"};
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 5);
    onScroll(); // the browser may restore a scroll position on reload
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <HeaderContainer $scrolled={scrolled}>
      <Navbar />
    </HeaderContainer>
  );
}
