import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  height: fit-content;
  background: linear-gradient(104.89deg, #fff9c1 58.95%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: center;
  color: #1d1d1d;
  text-transform: uppercase;
`;

const FooterText = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: center;
  color: #666666;
`;

const SocialIconContainer = styled.div`
  display: flex;
  gap: 0.8rem;

  img {
    aspect-ratio: 1;
    width: 1rem;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Title>FOLLOW US</Title>
      <SocialIconContainer>
        <a href="">
          <img src="/images/icons/social/facebook.png" alt="facebook-icon" />
        </a>
        <a href="">
          <img src="/images/icons/social/instagram.png" alt="instagram-icon" />
        </a>
        <a href="">
          <img src="/images/icons/social/youtube.png" alt="youtube-icon" />
        </a>
        <a href="">
          <img src="/images/icons/social/twitter.png" alt="twitter-icon" />
        </a>
      </SocialIconContainer>
      <Title>CONTACT DETAILS</Title>
      <FooterText>contact@chessbase.in</FooterText>
      <Title>TRUST DETAILS</Title>
      <FooterText>
        <b>Account Holder Name :</b> HELPCHESS FOUNDATION
        <br />
        <b>Account Number :</b> 50200059926281
        <br />
        <b>Bank Name :</b> HDFC Bank
        <br />
        <b>IFSC Code :</b> HDFC0000118
        <br />
        <b>CSR Number :</b> CSR00016763
      </FooterText>
      <FooterText>
        Donations are eligible for deduction under Sec. 80-G of Income Tax Act.
        80G No. AACTH4426KF20213(12A Registration - AACTH4426KE20215 dated
        23/09/2021)
      </FooterText>
    </FooterContainer>
  );
}
