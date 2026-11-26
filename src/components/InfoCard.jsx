import Image from "next/image";
import styled from "styled-components";

// Shared card used by the "Become a believer" and "Scholarship" sections:
// cover photo, title, a highlighted subtitle, description and an action.
const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 1.25rem;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }

  .cover {
    position: relative;
    aspect-ratio: 16 / 10;
    background: ${({ theme }) => theme.colors.surface};
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    padding: 1.5rem 1.5rem 1.75rem;
  }

  .title {
    font-family: var(--font-heading), sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.primary};
  }

  .subtitle {
    display: inline-block;
    width: fit-content;
    padding: 0.25rem 0.65rem;
    border-radius: 0.5rem;
    line-height: 1.4;
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.8125rem;
    font-weight: 600;
  }

  .description {
    color: ${({ theme }) => theme.colors.light};
    font-size: 1rem;
    line-height: 1.6;
    flex: 1;
  }

  .action {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 640px) {
    .action button {
      width: 100%;
    }
  }
`;

export default function InfoCard({
  img,
  title,
  subtitle,
  description,
  action,
}) {
  return (
    <Card>
      <div className="cover">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 540px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="body">
        <h3 className="title">{title}</h3>
        <p className="subtitle">{subtitle}</p>
        <p className="description">{description}</p>
        <div className="action">{action}</div>
      </div>
    </Card>
  );
}
