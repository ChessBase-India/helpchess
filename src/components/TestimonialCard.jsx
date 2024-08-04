import styled from "styled-components";

const TestimonialCardBox = styled.div`
  max-width: 30rem;
  min-width: 20rem;
  height: 36rem;
  background: linear-gradient(148.09deg, #ffffff 16.47%, #fff9c1 108.21%);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 2rem 1.5rem;
  box-shadow: 0px 1.46px 2.93px 0px #6000fc4d;
  overflow: hidden;
  position: relative;

  .topSpan {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .bottomSpan {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
  }

  .photo {
    width: 10rem;
    aspect-ratio: 1;
    background-color: red;
    object-fit: cover;
    border-radius: 50%;
    z-index: 10;
  }

  .description {
    font-weight: 400;
    font-size: 0.9rem;
    text-align: center;
    margin: 0 0.4rem;
    color: #1d1d1d;
    z-index: 10;
  }

  .title {
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 23.44px;
    text-align: center;
    color: #666666;
    z-index: 10;
  }

  .name {
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 38.73px;
    letter-spacing: 0.1em;
    text-align: center;
    color: #6562fe;
    z-index: 10;
  }

  .quote {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
`;

export default function TestimonialCard({ image, description, title, name }) {
  return (
    <TestimonialCardBox>
      <img className="quote" src="/images/icons/quote.svg" alt="card-quote" />
      <span className="topSpan">
        <img className="photo" alt="Arjun" src={image}></img>
        <p className="description">{description}</p>
      </span>
      <span className="bottomSpan">
        <p className="title">{title}</p>
        <p className="name">{name}</p>
      </span>
    </TestimonialCardBox>
  );
}
