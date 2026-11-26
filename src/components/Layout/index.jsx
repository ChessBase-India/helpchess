import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import { RazorpayHost } from "@/components/RazorpayButton";
import MobileDonateBar from "@/components/MobileDonateBar";

const MainLayout = styled.div`
  background: ${({ theme }) => theme.colors.background};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0 clamp(3rem, 6vw, 5rem);
  min-height: 70vh;
`;

export default function Layout({ children }) {
  return (
    <MainLayout>
      <Header />
      <Content>{children}</Content>
      <Footer />
      <RazorpayHost />
      <MobileDonateBar />
    </MainLayout>
  );
}
