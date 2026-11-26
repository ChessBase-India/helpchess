import { useEffect, useRef } from "react";
import styled from "styled-components";

import Button from "./Button";

const PAYMENT_BUTTON_ID = "pl_K6KMT68x4YSJYi";
const HOSTED_PAGE_URL = `https://pages.razorpay.com/${PAYMENT_BUTTON_ID}/view`;
const SCRIPT_SRC = "https://checkout.razorpay.com/v1/payment-button.js";
const HOST_ID = "razorpay-payment-host";
const TRIGGER_SELECTOR = `#${HOST_ID} .razorpay-payment-button a, #${HOST_ID} .razorpay-payment-button button`;

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

const loadScript = () => {
  const form = document.getElementById(HOST_ID);
  if (!form || form.querySelector("script")) return;

  const script = document.createElement("script");
  script.src = SCRIPT_SRC;
  script.setAttribute("data-payment_button_id", PAYMENT_BUTTON_ID);
  script.async = true;
  form.appendChild(script);
};

export function RazorpayHost() {
  const formRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    // keep the hidden Razorpay link out of the keyboard tab order
    const observer = new MutationObserver(() => {
      form
        .querySelectorAll("a, button")
        .forEach((el) => el.setAttribute("tabindex", "-1"));
    });
    observer.observe(form, { childList: true, subtree: true });

    // the checkout isn't needed for first paint — load it once the page is idle
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1500));
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout;
    const handle = idle(loadScript);

    return () => {
      observer.disconnect();
      cancelIdle(handle);
    };
  }, []);

  return <Hidden id={HOST_ID} ref={formRef} aria-hidden="true" />;
}

const openCheckout = () => {
  const trigger = document.querySelector(TRIGGER_SELECTOR);
  if (trigger) {
    trigger.click();
    return;
  }

  // clicked before the idle load finished — load now and wait briefly,
  // falling back to Razorpay's hosted page if the script can't load
  loadScript();
  const started = Date.now();
  const timer = setInterval(() => {
    const ready = document.querySelector(TRIGGER_SELECTOR);
    if (ready) {
      clearInterval(timer);
      ready.click();
    } else if (Date.now() - started > 3000) {
      clearInterval(timer);
      // outside the click gesture a popup would be blocked, so navigate instead
      window.location.assign(HOSTED_PAGE_URL);
    }
  }, 100);
};

export default function RazorpayButton({ title = "Contribute Now" }) {
  return (
    <Button
      title={title}
      subtitle="Secured by Razorpay"
      icon="/images/icons/heart.svg"
      onClick={(e) => {
        e.preventDefault();
        openCheckout();
      }}
    />
  );
}
