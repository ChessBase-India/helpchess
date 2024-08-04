import { Component } from "react";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1em 0;
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
      </MainLayout>
    );
  }
}

export default Layout;
