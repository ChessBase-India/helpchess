import { useEffect, useRef } from "react";
import styled from "styled-components";

import Button from "./Button";

const PAYMENT_BUTTON_ID = "pl_K6KMT68x4YSJYi";
const HOSTED_PAGE_URL = `https://pages.razorpay.com/${PAYMENT_BUTTON_ID}/view`;
const HOST_ID = "razorpay-payment-host";

// Razorpay's embeddable button renders its own (off-brand) UI and opens the
// checkout modal when clicked. We mount it once, visually hidden, and let every
// on-brand "Contribute Now" button forward clicks to it.
const Hidden = styled.form`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
`;

export function RazorpayHost() {
  const formRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form || form.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", PAYMENT_BUTTON_ID);
    script.async = true;
    form.appendChild(script);

    // keep the hidden Razorpay link out of the keyboard tab order
    const observer = new MutationObserver(() => {
      form
        .querySelectorAll("a, button")
        .forEach((el) => el.setAttribute("tabindex", "-1"));
    });
    observer.observe(form, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return <Hidden id={HOST_ID} ref={formRef} aria-hidden="true" />;
}

const openCheckout = () => {
  const trigger = document.querySelector(
    `#${HOST_ID} .razorpay-payment-button a, #${HOST_ID} .razorpay-payment-button button`,
  );
  if (trigger) {
    trigger.click();
  } else {
    // script blocked or not loaded yet — fall back to Razorpay's hosted page
    window.open(HOSTED_PAGE_URL, "_blank", "noopener,noreferrer");
  }
};

export default function RazorpayButton({ title = "Contribute Now", secondary }) {
  return (
    <Button
      title={title}
      subtitle="Secured by Razorpay"
      secondary={secondary}
      icon={secondary ? undefined : "/images/icons/heart.svg"}
      onClick={(e) => {
        e.preventDefault();
        openCheckout();
      }}
    />
  );
}
