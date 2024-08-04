import styled from "styled-components";
import Link from "next/link";

import Button from "./Button";

const SupportCard = styled.div`
  max-width: 782px;
  height: fit-content;
  box-shadow: 0px 2px 5px 0px #6562fe4d;
  background: #fffefe;
  border-radius: 10px;
  padding: 3.5rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  margin-top: 0;

  .title {
    font-family: Inter;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 30px;
    text-align: left;
    color: #6562fe;
  }
`;

export default function SupportOrgCard() {
  return (
    <SupportCard>
      <h1 className="title">Support as an organisation</h1>
      <p>
        If you are a brand and want to partner with us, please reach out to us
        at <strong>contact@chessbase.in</strong>
      </p>
      <Link href="mailto:contact@chessbase.in">
        <Button secondary title="Contact us" />
      </Link>
    </SupportCard>
  );
}
