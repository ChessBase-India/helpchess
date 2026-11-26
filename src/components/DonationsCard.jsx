import styled from "styled-components";

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const timeAgo = (date) => {
  if (!date) return null;
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (Number.isNaN(seconds)) return null;
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, size] of units) {
    const value = Math.floor(seconds / size);
    if (value >= 1) return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
  }
  return "just now";
};

const initials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "?";

// alternate between the two brand tints so the row has some rhythm
const AVATAR_TONES = [
  { bg: "#F1EDFF", fg: "#5B2EE8" },
  { bg: "#FFE9D4", fg: "#B4570F" },
];

const toneFor = (name = "") =>
  AVATAR_TONES[
    [...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) %
      AVATAR_TONES.length
  ];

const Wrapper = styled.div`
  flex: 0 0 auto;
  width: 17rem;
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1.125rem 1.25rem;
  border-radius: 1rem;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  scroll-snap-align: start;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(91, 46, 232, 0.3);
  }
`;

const Avatar = styled.span`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  font-family: var(--font-heading), sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  background: ${({ $tone }) => $tone.bg};
  color: ${({ $tone }) => $tone.fg};
`;

const Text = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  .name {
    font-family: var(--font-heading), sans-serif;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.ink};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.colors.light};
    white-space: nowrap;
  }

  .amount {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }

  .dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.5;
  }
`;

export default function DonationCard({ amount, name, date }) {
  const ago = timeAgo(date);
  return (
    <Wrapper>
      <Avatar $tone={toneFor(name)} aria-hidden="true">
        {initials(name)}
      </Avatar>
      <Text>
        <p className="name" title={name}>
          {name}
        </p>
        <p className="meta">
          <span className="amount">{formatINR(amount)}</span>
          {ago && (
            <>
              <span className="dot" />
              <span>{ago}</span>
            </>
          )}
        </p>
      </Text>
    </Wrapper>
  );
}
