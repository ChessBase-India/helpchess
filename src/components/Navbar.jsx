import { useEffect, useState } from "react";
import styled from "styled-components";

import RazorpayButton from "./RazorpayButton";
import Link from "next/link";

const routes = [
  { label: "about", id: "about" },
  { label: "testimonials", id: "testimonials" },
  { label: "stories", id: "stories" },
];

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1.5rem;
  height: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;

  position: relative;
  text-transform: capitalize;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Logo = styled.img`
  display: block;
  width: 7.25rem;
  height: auto;
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
  gap: 0.25rem;

  @media (max-width: 768px) {
    position: fixed;
    box-shadow: 8px 0 30px rgba(24, 18, 43, 0.2);

    top: 0;
    left: 0;

    width: 80%;
    height: 100vh;

    background: white;

    flex-direction: column;
    align-items: stretch;
    gap: 0;

    display: ${({ $open }) => ($open ? "flex" : "none")};

    z-index: 1000;
  }
`;

const Backdrop = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
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

    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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
  display: inline-flex;
  align-items: center;
  height: 3.25rem;
  padding: 0 1rem;
  border-radius: 0.625rem;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.ink};
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primarySoft};
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 1.1rem 2rem;
    border-radius: 0;
    font-size: 1.0625rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const ButtonWrapper = styled.div`
  margin-left: 0.75rem;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 2rem;
  }
`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <NavContainer>
      <Hamburger
        type="button"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(true)}
      >
        ☰
      </Hamburger>

      <Link href="/" aria-label="HelpChess home">
        <Logo src="/images/logo.png" alt="HelpChess" width={126} height={40} />
      </Link>

      <Backdrop $open={menuOpen} onClick={() => setMenuOpen(false)} />

      <Menu $open={menuOpen}>
        <MenuHeader>
          <CrossButton
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </CrossButton>

          <Logo
            src="/images/logo.png"
            alt="HelpChess"
            width={126}
            height={40}
          />
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
