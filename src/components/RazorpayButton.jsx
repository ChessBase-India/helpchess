import { useEffect, useRef } from "react";

const RazorpayForm = () => {
  const formRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", "pl_K6KMT68x4YSJYi");
    script.async = true;
    if (formRef.current) {
      formRef.current.appendChild(script);
    }

    return () => {
      if (formRef.current) {
        formRef.current.removeChild(script);
      }
    };
  }, []);

  return <form ref={formRef}></form>;
};

export default RazorpayForm;
