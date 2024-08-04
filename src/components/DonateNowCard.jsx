import styled from "styled-components";

import RazorpayButton from "./RazorpayButton";

const Gradient = styled.div`
  width: 100%;
  height: 75%;
  background: linear-gradient(179.91deg, #ffffff 0.07%, #fff9c1 69.91%);
  box-shadow: 0px 1px 2px 0px #6000fc4d;
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

const Container = styled.div`
  position: relative;
  max-width: 782px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left !important;
  gap: 2rem;
  padding: 1rem;
  margin: 1rem;

  .text {
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 0.4rem;
    width: 90%;
    line-height: 1rem;
  }

  .title {
    font-family: Inter;
    font-size: 1.4rem !important;
    font-weight: 600;
    line-height: 30px;
    text-align: left;
    color: #6562fe;
  }

  .subtitle {
    font-family: Roboto;
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 30px;
    text-align: left;
    color: #666666;
  }

  img {
    width: 90%;
    border-radius: 10px;
    z-index: 2;
  }

  .buttonBox {
    display: flex;
    gap: 1rem;
    z-index: 2;
    width: 90%;
  }
`;

export default function DonateNowCard({ img, title, subtitle, description }) {
  return (
    <Container>
      <img src={img} alt={`${title}-image`} />
      <span className="text">
        <p className="title"> {title}</p>
        <p className="subtitle">{subtitle}</p>
        <p className="description">{description}</p>
      </span>
      <div className="buttonBox">
        <RazorpayButton />
      </div>
      <Gradient />
    </Container>
  );
}
