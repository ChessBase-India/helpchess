import { useState } from "react";
import styled from "styled-components";

const CLAMP_LINES = 7;
// quotes shorter than this fit within the clamp, so they need no toggle
const LONG_QUOTE_CHARS = 300;

const Card = styled.figure`
  flex: 0 0 min(23rem, 85vw);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.75rem 1.75rem 1.5rem;
  border-radius: 1.25rem;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  scroll-snap-align: start;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(91, 46, 232, 0.3);
  }
`;

const QuoteMark = styled.svg`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const Quote = styled.blockquote`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  p {
    font-size: 0.9875rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.ink};
    /* reserve the same height on every collapsed card so the row lines up */
    min-height: calc(1.7em * ${CLAMP_LINES});

    ${({ $clamped }) =>
      $clamped &&
      `
      display: -webkit-box;
      -webkit-line-clamp: ${CLAMP_LINES};
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
  }

  button {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }
  }
`;

const Author = styled.figcaption`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  img {
    width: 3.25rem;
    height: 3.25rem;
    flex-shrink: 0;
    border-radius: 50%;
    object-fit: cover;
    background: ${({ theme }) => theme.colors.primarySoft};
  }

  .name {
    font-family: var(--font-heading), sans-serif;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.3;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.ink};
  }

  .title {
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.colors.light};
  }
`;

export default function TestimonialCard({ image, description, title, name }) {
  const isLong = description.length > LONG_QUOTE_CHARS;
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <QuoteMark viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9.5 6C6.46 6 4 8.46 4 11.5V18h6v-6H6.5c0-1.65 1.35-3 3-3V6zm10 0C16.46 6 14 8.46 14 11.5V18h6v-6h-3.5c0-1.65 1.35-3 3-3V6z" />
      </QuoteMark>
      <Quote $clamped={isLong && !expanded}>
        <p>{description}</p>
        {isLong && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </Quote>
      <Author>
        <img src={image} alt={name} loading="lazy" />
        <div>
          <p className="name">{name}</p>
          <p className="title">{title}</p>
        </div>
      </Author>
    </Card>
  );
}
