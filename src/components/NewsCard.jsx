import styled, { keyframes } from "styled-components";
import Image from "next/image";

const CardLink = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 1.25rem;
  overflow: hidden;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(91, 46, 232, 0.3);
  }

  &:hover .thumb img {
    transform: scale(1.04);
  }

  &:hover h3 {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover .cta span {
    transform: translateX(3px);
  }
`;

const Thumb = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};

  img {
    transition: transform 0.4s ease;
  }
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1.25rem 1.375rem 1.375rem;

  .meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .date {
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.colors.light};
    white-space: nowrap;
  }

  .amount {
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.8125rem;
    font-weight: 700;
    white-space: nowrap;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.35;
    color: ${({ theme }) => theme.colors.ink};
    transition: color 0.2s ease;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .description {
    flex: 1;
    font-size: 0.9375rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.light};
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .cta {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};

    span {
      display: inline-block;
      transition: transform 0.2s ease;
    }
  }
`;

// "₹1,08,000.00" -> "₹1,08,000"
const tidyAmount = (amount) =>
  typeof amount === "string" ? amount.replace(/\.00$/, "") : amount;

export default function NewsCard({
  title,
  subtitle,
  date,
  thumbnail,
  amount,
  description,
  month,
  link,
}) {
  const displayDescription = subtitle || description;
  const displayMonth = date
    ? new Date(date).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : month;

  return (
    <CardLink href={link || "#"} target="_blank" rel="noopener noreferrer">
      <Thumb className="thumb">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        )}
      </Thumb>
      <Body>
        {(amount || displayMonth) && (
          <div className="meta">
            {displayMonth && <span className="date">{displayMonth}</span>}
            {amount && <span className="amount">{tidyAmount(amount)}</span>}
          </div>
        )}
        <h3>{title}</h3>
        <p className="description">{displayDescription}</p>
        <p className="cta">
          Read story <span aria-hidden="true">→</span>
        </p>
      </Body>
    </CardLink>
  );
}

const shimmer = keyframes`
  from { background-position: -200% 0; }
  to { background-position: 200% 0; }
`;

const SkeletonCard = styled.div`
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;

  .block {
    background: linear-gradient(90deg, #f3f0fb 25%, #faf8ff 50%, #f3f0fb 75%);
    background-size: 200% 100%;
    animation: ${shimmer} 1.4s ease-in-out infinite;
    border-radius: 0.5rem;
  }

  .thumb {
    aspect-ratio: 16 / 9;
    border-radius: 0;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem 1.375rem 1.5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .block {
      animation: none;
    }
  }
`;

export function NewsCardSkeleton() {
  return (
    <SkeletonCard aria-hidden="true">
      <div className="block thumb" />
      <div className="body">
        <div className="block" style={{ width: "40%", height: "0.8rem" }} />
        <div className="block" style={{ width: "85%", height: "1.1rem" }} />
        <div className="block" style={{ width: "100%", height: "0.8rem" }} />
        <div className="block" style={{ width: "70%", height: "0.8rem" }} />
      </div>
    </SkeletonCard>
  );
}
