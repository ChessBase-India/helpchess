import { useEffect, useState } from "react";
import styled from "styled-components";

import RazorpayButton from "./RazorpayButton";
import Link from "next/link";

const routes = [
  { label: "about", id: "about" },
  { label: "testimonials", id: "testimonials" },
  { label: "stories", id: "stories" },
  { label: "links for Widgets/APIs", id: "widgets/APIs" },
];

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 2rem;
  height: 100%;

  position: relative;
  transition: box-shadow 0.3s ease-in-out;
  box-shadow: none;
  text-transform: capitalize;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Logo = styled.img`
  width: 6.303rem;
  height: 2rem;
`;

const Hamburger = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;

    position: absolute;
    left: 1rem;

    background: none;
    border: none;

    font-size: 2rem;
    cursor: pointer;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;

    top: 0;
    left: 0;

    width: 80%;
    height: 100vh;

    background: white;

    flex-direction: column;
    align-items: stretch;
    gap: 0;

    display: ${({ open }) => (open ? "flex" : "none")};

    z-index: 1000;
  }
`;

const MenuHeader = styled.div`
  display: none;

  @media (max-width: 768px) {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 80px;

    border-bottom: 0.5px solid #999999;
  }
`;

const CrossButton = styled.button`
  position: absolute;
  left: 1rem;

  background: none;
  border: none;

  font-size: 2rem;
  cursor: pointer;
`;

const MenuLink = styled.a`
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  transition:
    transform 0.2s ease,
    opacity 0.2s ease,
    text-decoration-color 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    opacity: 0.85;
  }

  @media (max-width: 768px) {
    padding: 1.25rem 2rem;
  }
`;

const ButtonWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NavContainer className={`${isScrolled ? "scrolled" : ""}`}>
      <Hamburger onClick={() => setMenuOpen(true)}>☰</Hamburger>

      <Link href="/">
        <Logo src="/images/logo.png" />
      </Link>

      <Menu open={menuOpen}>
        <MenuHeader>
          <CrossButton onClick={() => setMenuOpen(false)}>✕</CrossButton>

          <Logo src="/images/logo.png" />
        </MenuHeader>

        {routes.map((route) => (
          <MenuLink
            key={route.id}
            href={`#${route.id}`}
            onClick={() => setMenuOpen(false)}
          >
            {route.label}
          </MenuLink>
        ))}

        <ButtonWrapper>
          <RazorpayButton />
        </ButtonWrapper>
      </Menu>
    </NavContainer>
  );
}
