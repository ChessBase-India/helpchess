import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import CheckPattern from "./CheckPattern";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin: 1rem;
  width: 22rem;
  aspect-ratio: 1;
  box-shadow: 0px 4px 4px 0px #00000021;
  border: 1px solid #99999999;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  justify-content: space-between;
  z-index: 10;

  * {
    z-index: 2;
  }

  .pattern {
    position: absolute;
    bottom: -10%;
    right: -10%;
    z-index: 1;
  }

  .description {
  }

  .date {
    font-weight: bold;
    color: #666666;
    font-size: 0.8rem;
  }

  .amount {
    color: #666666;
    font-size: 0.8rem;
    font-weight: bold;
  }

  h1 {
    color: #6562fe;
    font-size: 1.3rem;
  }
`;

const LoadMoreCard = styled(Card)`
  background: #6562fe;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: white;
    color: #6562fe;
  }
`;

const TopSpan = styled.span`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function NewsCard({
  title,
  amount,
  description,
  month,
  link,
  loadMore,
  onClick,
}) {
  if (loadMore) {
    return (
      <button onClick={onClick}>
        <LoadMoreCard>
          <p>Load all</p>
        </LoadMoreCard>
      </button>
    );
  }
  return (
    <Card>
      <TopSpan>
        <h1>{title}</h1>
        <span>
          <p className="amount">
            {`${amount.slice(0, 2).toLowerCase() === "rs" ? " " : "₹"}` +
              amount}{" "}
            | <span className="date">{month}</span>
          </p>
        </span>

        <p className="description">{description}</p>
      </TopSpan>
      <Link href={link} target="_blank">
        <Button secondary title="Read more" h></Button>
      </Link>

      <CheckPattern className="pattern" />
    </Card>
  );
}
