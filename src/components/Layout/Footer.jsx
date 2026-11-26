import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/helpchessofficial",
    icon: "/images/icons/social/instagram.png",
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/helpchess",
    icon: "/images/icons/social/twitter.png",
  },
  {
    name: "GitHub",
    href: "https://github.com/ChessBase-India/helpchess",
    icon: "/images/icons/social/github-mark.png",
  },
];

const FooterContainer = styled.footer`
  width: 100%;
  background: linear-gradient(
    105deg,
    ${({ theme }) => theme.colors.surface} 40%,
    ${({ theme }) => theme.colors.surfaceEnd} 100%
  );
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  padding: clamp(2.5rem, 5vw, 4rem) 1.5rem 1.5rem;
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.4fr;
  gap: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
    justify-items: center;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 900px) {
    align-items: center;
  }
`;

const Logo = styled.img`
  width: 8rem;
  height: auto;
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.light};
  font-size: 0.9375rem;
  max-width: 20rem;
`;

const Title = styled.h4`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
`;

const FooterText = styled.p`
  font-size: 0.875rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.light};

  b {
    color: ${({ theme }) => theme.colors.ink};
    font-weight: 600;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    text-decoration: none;

    &:hover,
    &:focus-visible {
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }
  }
`;

const SocialIconContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: #fff;
    border: 1px solid ${({ theme }) => theme.colors.border};
    transition:
      background-color 0.2s ease,
      transform 0.2s ease;

    &:hover,
    &:focus-visible {
      background-color: ${({ theme }) => theme.colors.primarySoft};
      transform: translateY(-2px);
    }
  }

  img {
    aspect-ratio: 1;
    width: 1.125rem;
  }
`;

const TrustCard = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  width: 100%;
  max-width: 26rem;
  padding: 1rem 1.125rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  font-size: 0.875rem;
  text-align: left;

  dt {
    color: ${({ theme }) => theme.colors.light};
  }

  dd {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.375rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.ink};
    text-align: right;
    font-variant-numeric: tabular-nums;
    word-break: break-word;
  }
`;

const CopyButton = styled.button`
  flex-shrink: 0;
  padding: 0.15rem 0.45rem;
  border-radius: 0.375rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primarySoft};
  transition: background-color 0.2s ease;

  &:hover {
    background: #e4dcff;
  }
`;

const TRUST_DETAILS = [
  { label: "Account name", value: "HELPCHESS FOUNDATION" },
  { label: "Account no.", value: "50200059926281", copy: true },
  { label: "Bank", value: "HDFC Bank" },
  { label: "IFSC", value: "HDFC0000118", copy: true },
  { label: "CSR no.", value: "CSR00016763" },
];

function CopyValue({ value }) {
  const [copied, setCopied] = useState(false);
  return (
    <CopyButton
      type="button"
      aria-label={`Copy ${value}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // clipboard unavailable (e.g. insecure context) — nothing to do
        }
      }}
    >
      {copied ? "Copied" : "Copy"}
    </CopyButton>
  );
}

const Legal = styled.p`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 2.5rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(24, 18, 43, 0.08);
  font-size: 0.8125rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.light};
  text-align: center;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Inner>
        <Column>
          <Logo src="/images/logo.png" alt="HelpChess" />
          <Tagline>
            ChessBase India Foundation — supporting 1000 Indian chess players to
            reach their goals.
          </Tagline>
          <Title as="p" style={{ marginTop: "0.5rem" }}>
            Follow us
          </Title>
          <SocialIconContainer>
            {socialLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                title={name}
              >
                <Image src={icon} alt="" width={18} height={18} />
              </a>
            ))}
          </SocialIconContainer>
        </Column>
        <Column>
          <Title>Contact</Title>
          <FooterText>
            <a href="mailto:contact@chessbase.in">contact@chessbase.in</a>
          </FooterText>
        </Column>
        <Column>
          <Title>Trust details</Title>
          <TrustCard>
            {TRUST_DETAILS.map(({ label, value, copy }) => (
              <div key={label} style={{ display: "contents" }}>
                <dt>{label}</dt>
                <dd>
                  {value}
                  {copy && <CopyValue value={value} />}
                </dd>
              </div>
            ))}
          </TrustCard>
        </Column>
      </Inner>
      <Legal>
        Donations are eligible for deduction under Sec. 133 of the Income-tax
        Act, 2025 (formerly Sec. 80-G of the Income Tax Act, 1961). 80G No.
        AACTH4426KF20213(12A Registration - AACTH4426KE20215 dated 23/09/2021)
      </Legal>
    </FooterContainer>
  );
}
