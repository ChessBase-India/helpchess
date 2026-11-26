import { Component } from "react";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import { RazorpayHost } from "@/components/RazorpayButton";
import MobileDonateBar from "@/components/MobileDonateBar";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0 clamp(3rem, 6vw, 5rem);
  min-height: 70vh;
`;

const MainLayout = styled.div`
  background: ${({ theme }) => theme.colors.background};
`;

class Layout extends Component {
  render() {
    return (
      <MainLayout>
        <Header />
        <LayoutContainer>{this.props.children}</LayoutContainer>
        <Footer />
        <RazorpayHost />
        <MobileDonateBar />
      </MainLayout>
    );
  }
}

export default Layout;
