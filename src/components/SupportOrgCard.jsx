import { useState } from "react";
import styled from "styled-components";

import Button from "./Button";

const SupportCard = styled.div`
  width: calc(100% - 2rem);
  max-width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem 2.5rem;
  padding: clamp(1.75rem, 4vw, 2.75rem);
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.colors.primarySoft};
  border: 1px solid ${({ theme }) => theme.colors.border};

  .text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1 1 22rem;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.ink};
  }

  p {
    color: ${({ theme }) => theme.colors.light};
  }

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

const EMAIL = "contact@chessbase.in";

export default function SupportOrgCard() {
  const [copied, setCopied] = useState(false);

  return (
    <SupportCard>
      <div className="text">
        <h3 className="title">Support as an organisation</h3>
        <p>
          If you are a brand and want to partner with us, please reach out to us
          at <strong>contact@chessbase.in</strong>
        </p>
      </div>
      <Button
        secondary
        title={copied ? "Copied!" : "Copy email"}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            // clipboard unavailable — fall back to opening the mail app
            window.location.href = `mailto:${EMAIL}`;
          }
        }}
      />
    </SupportCard>
  );
}
