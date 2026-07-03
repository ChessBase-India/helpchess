import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const THUMBNAIL_HEIGHT_RATIO = (184 / 385) * 100;

const ThumbnailWrapper = styled.div`
  width: 100%;
  flex: 0 0 ${THUMBNAIL_HEIGHT_RATIO}%;
  position: relative;
  z-index: 2;
`;

const CardLink = styled(Link)`
  display: block;
  width: min(22rem, 100%);
  margin: 1rem;
  text-decoration: none;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  aspect-ratio: 352 / 385;
  border-radius: 10px;
  box-shadow: 2px 2px 6px 0px #00000040;
  position: relative;
  overflow: hidden;
  z-index: 10;
  background: linear-gradient(180deg, #fff9c1 0%, #fafafa 100%);
  transition: all 300ms ease-out;

  * {
    z-index: 2;
  }

  .content {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    padding: 1rem 1rem 1.5rem;
    overflow: hidden;
  }

  .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.625rem;
    flex-shrink: 0;
  }

  .date {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 100%;
    color: #00000099;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .amount {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 100%;
    text-align: right;
    color: #6562fe;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .description {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4;
    color: #000000b2;
    flex-shrink: 0;
    /* fixed to exactly 3 lines so overflow: hidden always cuts right at the
       line-clamp boundary instead of mid-line when flex gave it an
       arbitrary leftover height that wasn't a multiple of line-height */
    height: calc(1.4em * 3);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h1 {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 100%;
    color: #2b2b2b;
    transition: color 300ms ease-out;
    flex-shrink: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    box-shadow: 4px 4px 6px 0px #00000040;
  }

  &:hover h1 {
    color: #6562fe;
  }
`;

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
    ? new Date(date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : month;

  return (
    <CardLink href={link || "#"} target="_blank" rel="noopener noreferrer">
      <Card>
        {thumbnail && (
          <ThumbnailWrapper>
            <Image src={thumbnail} alt={title} fill unoptimized style={{ objectFit: "cover" }} />
          </ThumbnailWrapper>
        )}
        <div className="content">
          {(amount || displayMonth) && (
            <div className="top-row">
              {displayMonth && <span className="date">{displayMonth}</span>}
              {amount && <span className="amount">{amount}</span>}
            </div>
          )}
          <h1>{title}</h1>
          <p className="description">{displayDescription}</p>
        </div>
      </Card>
    </CardLink>
  );
}
