import { useEffect, useState } from "react";
import styled from "styled-components";

import RazorpayButton from "./RazorpayButton";

// On phones the header has no room for "Contribute Now", so once the hero's
// button scrolls out of view we pin one to the bottom of the screen.
const Bar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 900;
    padding: 0.75rem 1rem calc(0.75rem + env(safe-area-inset-bottom));
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: saturate(180%) blur(12px);
    -webkit-backdrop-filter: saturate(180%) blur(12px);
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    transform: translateY(${({ $visible }) => ($visible ? "0" : "110%")});
    transition: transform 0.3s ease;

    button {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export default function MobileDonateBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40;
      setVisible(window.scrollY > 700 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Bar
      $visible={visible}
      aria-hidden={!visible}
      inert={visible ? undefined : ""}
    >
      <RazorpayButton />
    </Bar>
  );
}
