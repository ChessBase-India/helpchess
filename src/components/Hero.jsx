import styled from "styled-components";
import Image from "next/image";

import CheckPattern from "@/components/CheckPattern";
import RazorPayButton from "@/components/RazorpayButton";
import { BREAK_POINTS } from "@/styles/responsive";
import Button from "@/components/Button";
import { SCHOLARSHIP_FORM_URL } from "@/utils/constants";

const HeroContainer = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 1.5rem 0 0;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: -4rem 0 auto auto;
    width: min(46rem, 100%);
    height: 36rem;
    background:
      radial-gradient(closest-side, rgba(91, 46, 232, 0.12), transparent 70%)
        70% 40% / 70% 70% no-repeat,
      radial-gradient(closest-side, rgba(255, 196, 140, 0.28), transparent 70%)
        20% 80% / 65% 65% no-repeat;
    pointer-events: none;
  }

  ${BREAK_POINTS.laptop`
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    padding: 3rem 0 1rem;
  `};
  ${BREAK_POINTS.desktop`
    grid-template-columns: 1.05fr 1fr;
    gap: 3.5rem;
    padding: 4rem 0 2rem;
  `};
`;

const Collage = styled.div`
  position: relative;
  margin: 0 1.5rem;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.75rem;
  height: clamp(19rem, 82vw, 26rem);

  ${BREAK_POINTS.laptop`
    height: 28rem;
  `};
  ${BREAK_POINTS.desktop`
    height: 32rem;
  `};

  .pattern {
    position: absolute;
    width: 11rem;
    height: 11rem;
    top: -1.75rem;
    left: -1.75rem;
    z-index: 0;
    pointer-events: none;
  }
`;

const Tile = styled.a`
  position: relative;
  z-index: 1;
  display: block;
  overflow: hidden;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.colors.surface};
  grid-row: ${({ $tall }) => ($tall ? "span 2" : "auto")};

  img {
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }

  /* soft fade so the caption is readable on any photo */
  &::after {
    content: "";
    position: absolute;
    inset: 45% 0 0 0;
    background: linear-gradient(to top, rgba(20, 12, 50, 0.7), transparent);
    pointer-events: none;
  }
`;

const Caption = styled.span`
  position: absolute;
  left: 0.875rem;
  right: 0.875rem;
  bottom: 0.75rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  color: #fff;
  line-height: 1.3;

  strong {
    font-family: var(--font-heading), sans-serif;
    font-size: 0.9375rem;
    font-weight: 700;
  }

  span {
    font-size: 0.75rem;
    opacity: 0.85;
  }

  @media (max-width: 480px) {
    left: 0.625rem;
    right: 0.625rem;
    bottom: 0.5rem;

    strong {
      font-size: 0.8125rem;
    }

    span {
      font-size: 0.6875rem;
    }
  }
`;

const RaisedBadge = styled.div`
  position: absolute;
  z-index: 2;
  left: -1.5rem;
  top: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem 0.75rem 0.75rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.md};

  .icon {
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.75rem;
    background: ${({ theme }) => theme.colors.primarySoft};

    img {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  strong {
    display: block;
    font-family: var(--font-heading), sans-serif;
    font-size: 1.25rem;
    font-weight: 800;
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.ink};
  }

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.light};
  }

  @media (max-width: 480px) {
    left: 50%;
    top: -1.25rem;
    transform: translateX(-50%);
    white-space: nowrap;
    padding: 0.5rem 0.875rem 0.5rem 0.5rem;

    .icon {
      width: 2rem;
      height: 2rem;
    }

    strong {
      font-size: 1rem;
    }
  }
`;

const Trust = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.light};

  .avatars {
    display: flex;
    flex-shrink: 0;
  }

  .avatars img {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
    background: ${({ theme }) => theme.colors.primarySoft};

    &:not(:first-child) {
      margin-left: -0.625rem;
    }
  }

  b {
    color: ${({ theme }) => theme.colors.ink};
    font-weight: 600;
  }
`;

const SUPPORTERS = [
  { src: "/images/arjun.jpeg", name: "Arjun Erigaisi" },
  { src: "/images/vidit.jpg", name: "Vidit Gujrathi" },
  { src: "/images/humpy.jpeg", name: "Humpy Koneru" },
  { src: "/images/samay.jpg", name: "Samay Raina" },
];

const STORIES = [
  {
    src: "https://cbin.b-cdn.net/img/SH/Shreya%20Hipparagi_Y1XKJ_864x1152.jpeg",
    name: "Shreya Hipparagi",
    note: "Laptop for training",
    href: "https://www.facebook.com/chessbaseindia/posts/pfbid038KbWn8iM8zyPi3S5cdHg3BKpUfJLBA2mD3QHCkghcq6rCCKVJg1EmpX8rmfL9Q65l",
    position: "55% 40%",
    sizes: "(max-width: 800px) 60vw, 400px",
    tall: true,
    priority: true,
  },
  {
    src: "https://cbin.b-cdn.net/img/IL/Ilamparthi_10_09W0M_1272x884.jpeg",
    name: "Ilamparthi A R",
    note: "Tournament support",
    href: "https://chessbase.in/news/YouTube-memberships-Update-for-July-2021",
    position: "40% 25%",
    sizes: "(max-width: 800px) 50vw, 340px",
  },
  {
    src: "https://cbin.b-cdn.net/img/NA/Narayani%20Marathe_DDYWY_1200x900.jpeg",
    name: "Narayani Marathe",
    note: "₹50,000 scholarship",
    href: "https://twitter.com/ChessbaseIndia/status/1729148283090796721",
    position: "50% 55%",
    sizes: "(max-width: 800px) 50vw, 340px",
  },
];

const HeroTextContainer = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  margin: 0 1.5rem;
  max-width: 36rem;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.02em;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.colors.ink};
  font-size: ${({ theme }) => theme.fonts.size.title};
  font-weight: ${({ theme }) => theme.fonts.weight.title};
  line-height: 1.05;
  letter-spacing: -0.03em;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HeroDescription = styled.p`
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.125rem;
  line-height: 1.65;
  max-width: 32rem;
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  width: min(100%, 30rem);

  & > button {
    width: 100%;
    justify-content: flex-start;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroTextContainer>
        <Eyebrow>ChessBase India Foundation</Eyebrow>
        <HeroTitle>
          You can power <span>Indian Chess</span>
        </HeroTitle>
        <HeroDescription>
          Join India’s largest chess charity in our mission of supporting 1000
          chess players and be a part of Indian Chess history.{" "}
        </HeroDescription>
        <ButtonsContainer>
          <RazorPayButton />
          <Button
            secondary
            title="Apply for Scholarship"
            subtitle="For players in need"
            icon="/images/icons/plant-purple.svg"
            onClick={() =>
              window.open(SCHOLARSHIP_FORM_URL, "_blank", "noopener,noreferrer")
            }
          />
        </ButtonsContainer>
        <Trust>
          <div className="avatars">
            {SUPPORTERS.map((p) => (
              <Image
                key={p.name}
                src={p.src}
                alt={p.name}
                title={p.name}
                width={36}
                height={36}
              />
            ))}
          </div>
          <p>
            Backed by <b>Arjun, Vidit, Humpy</b> &amp; <b>4K+ believers</b>
          </p>
        </Trust>
      </HeroTextContainer>
      <Collage>
        <CheckPattern className="pattern" />
        {STORIES.map((story) => (
          <Tile
            key={story.name}
            href={story.href}
            target="_blank"
            rel="noopener noreferrer"
            $tall={story.tall}
            aria-label={`${story.name} — ${story.note}`}
          >
            <Image
              src={story.src}
              alt={story.name}
              fill
              sizes={story.sizes}
              priority={story.priority}
              quality={85}
              style={{ objectFit: "cover", objectPosition: story.position }}
            />
            <Caption>
              <strong>{story.name}</strong>
              <span>{story.note}</span>
            </Caption>
          </Tile>
        ))}
        <RaisedBadge aria-hidden="true">
          <span className="icon">
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG, nothing to optimise */}
            <img src="/images/icons/pawn.svg" alt="" />
          </span>
          <div>
            <strong>70+ players</strong>
            <span>supported so far</span>
          </div>
        </RaisedBadge>
      </Collage>
    </HeroContainer>
  );
};

export default Hero;
