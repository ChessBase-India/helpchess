import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

import Hero from "@/components/Hero";
import StatsCard from "@/components/StatsCard";
import TestimonialCard from "@/components/TestimonialCard";
import DonateNowCard from "@/components/DonateNowCard";
import ApplyForScholarshipCard from "@/components/ApplyForScholarshipCard";
import CheckPattern from "@/components/CheckPattern";
import DonationCard from "@/components/DonationsCard";
import ScrollButton from "@/components/ScrollButton";
import VideoModal from "@/components/VideoModal";
import NewsCard from "@/components/NewsCard";
import SupportOrgCard from "@/components/SupportOrgCard";
import Button from "@/components/Button";
import { BREAK_POINTS } from "@/styles/responsive";
import { testimonials, donationCardContent } from "@/utils/constants";

const initialArticleLoadLimit = 8;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100dvh;
  gap: 2.5rem;
`;

const StatsSection = styled.section`
  display: flex;
  align-items: center;
  height: 13.5rem;
  width: 100%;
  border-radius: 0.9375rem;
  background: linear-gradient(105deg, #fff9c1 58.95%, #fff 100%);
  gap: 0.44rem;
  overflow-x: auto;
  padding: 0 1rem;
  justify-content: safe center;

  /* For browsers that don't support safe values */
  @supports not (justify-content: safe center) {
    justify-content: center;
  }

  & > :first-child {
    margin-left: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const SectionVideo = styled.section`0
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 3rem;
  margin-bottom: 3rem;

  .pattern-top {
    position: absolute;
    top: -15%;
    left: 0;
    z-index: 1;
  }
  .pattern-bottom {
    position: absolute;
    bottom: -15%;
    right: 0;
    z-index: 1;
  }
`;

const VideoContainer = styled.div`
  width: calc(100% - 2rem);
  height: 600px;
  background-image: url(/images/vishy.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: #ffffff;
  box-shadow: inset 0 0 0 1000px rgba(21, 19, 93, 0.5);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1rem;
  z-index: 2;
  position: relative;

  .play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 42px;
    aspect-ratio: 1;
    cursor: pointer;
  }

  .title {
    width: 15rem;
    font-weight: 700;
    font-size: 32px;
    line-height: 37.5px;
  }

  .description {
    width: 15rem;
  }
`;

const SectionTitle = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.heading};
  font-weight: ${({ theme }) => theme.fonts.weight.heading};
  color: #6562fe;
  text-align: center;
  margin: 0 32px;
`;

const SectionDescription = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.light};
  margin: 0 32px;
  width: min(20rem, 100%);
`;

const SectionTestimonials = styled.section`
  max-width: 100vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  overflow: visible;
`;

const TestimonialCardsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 1rem;
  height: fit-content;
  padding: 1rem;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SectionNews = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  overflow-x: hidden;
  .articles {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const SectionDonate = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 10;

  .title {
    color: #6000fc;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 110%;
    text-align: center;
  }
`;

const SectionScholarship = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 10;

  .title {
    color: #6000fc;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 110%;
    text-align: center;
  }
`;

const SectionDonations = styled.section`
  width: 100%;
  height: fit-content;
  overflow-x: scroll;
  display: flex;
  gap: 1rem;
  padding: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ImageBannerContainer = styled.span`
  width: 100%;
  max-height: 1000px;
  position: relative;
  margin-top: 2rem;

  .pattern-top {
    position: absolute;
    top: -15%;
    right: 0;
    z-index: 1;
  }

  .pattern-bottom {
    position: absolute;
    bottom: -15%;
    right: 0;
    z-index: 1;
  }

  .banner {
    width: 100%;
    max-height: 1000px;
    object-fit: cover;
    z-index: 10;
    position: relative;
  }
`;

const ScrollButtonBox = styled.span`
  display: flex;
  gap: 1rem;
  justify-content: end;
  padding: 0 1rem;

  ${BREAK_POINTS.mobile`
    display: none;
  `};
`;

const SectionSupportOrg = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SectionWidgets = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  gap: 2rem;
  margin-bottom: 5rem;

  .title {
    color: #6000fc;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 110%;
    text-align: center;
    width: min(30rem, 100%);
  }

  .description {
    width: min(30rem, 100%);
  }
`;

export default function Home() {
  const [donors, setDonors] = useState([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [articleLoadLimit, setArticleLoadLimit] = useState(
    initialArticleLoadLimit,
  );
  const [workItems, setWorkItems] = useState([]);

  const donationsScrollRef = useRef(null);
  const testimonialsScrollRef = useRef(null);

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const scrollRight = ({ type }) => {
    if (type === "donations") {
      if (donationsScrollRef.current) {
        donationsScrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
        return;
      }
      return;
    }
    if (testimonialsScrollRef.current) {
      testimonialsScrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  const scrollLeft = ({ type }) => {
    if (type === "donations") {
      if (donationsScrollRef.current) {
        donationsScrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
        return;
      }
      return;
    }
    if (testimonialsScrollRef.current) {
      testimonialsScrollRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1yo2GrCH9uD9DKmehh534IhS9NlR5FPlESjNZHvCadO0/values/Sheet1!A1:E700?key=AIzaSyDRpd7XCVIQsju4cmbb1GXXEoxV7mG1Nzw",
      );
      const data = await response.json();
      setWorkItems(data.values);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch(
          "https://api-v2.chessbase.in/v1/hc/donors",
        );
        const result = await response.json();
        if (result.ok) {
          setDonors(result.data.recentDonors);
        } else {
          console.error("Error fetching donors:", result.err);
        }
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchDonors();
  }, []);
  return (
    <>
      <Head>
        <title>Helpchess - ChessBase India Foundation | NGO</title>
        <meta
          name="description"
          content="Helpchess is on a mission to support 1000 Indian chess players to reach their goals!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/icons/favicon/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/icons/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/icons/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/images/icons/favicon/favicon-96x96.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/icons/favicon/apple-touch-icon.png"
        />
        <link
          rel="android-chrome"
          sizes="192x192"
          href="/images/icons/favicon/android-chrome-192x192.png"
        />
        <link
          rel="android-chrome"
          sizes="512x512"
          href="/images/icons/favicon/android-chrome-512x512.png"
        />
      </Head>
      <HomeContainer>
        <VideoModal
          videoId="_jPw8otX6Ts"
          isOpen={isVideoModalOpen}
          onClose={closeVideoModal}
        />
        <Hero />
        <StatsSection>
          <StatsCard
            title="raised"
            text="₹2cr+"
            img="/images/icons/gift.svg"
          ></StatsCard>
          <StatsCard
            title="believers"
            text="4K+"
            img="/images/icons/star.svg"
          ></StatsCard>
          <StatsCard
            title="players"
            text="55+"
            img="/images/icons/pawn.svg"
          ></StatsCard>
          <StatsCard
            title="big believers"
            text="50"
            img="/images/icons/star-big.svg"
          ></StatsCard>
        </StatsSection>
        <SectionDonations ref={donationsScrollRef}>
          {donors.map((donor) => (
            <DonationCard
              name={donor.name}
              amount={donor.amount}
              key={donor.id}
            />
          ))}
        </SectionDonations>
        <ScrollButtonBox>
          <ScrollButton
            onClick={() => scrollLeft({ type: "donations" })}
          ></ScrollButton>
          <ScrollButton
            left={false}
            onClick={() => scrollRight({ type: "donations" })}
          ></ScrollButton>
        </ScrollButtonBox>
        <SectionVideo>
          <CheckPattern className="pattern-top" />
          <CheckPattern className="pattern-bottom" />
          <VideoContainer>
            <p className="title">We are on a mission.</p>
            <p className="description">
              Join us in supporting 1000 Indian chess players to reach their
              goals.
            </p>
            <Image
              className="play"
              src="/images/icons/play-button.png"
              alt="play button"
              height={42}
              width={42}
              onClick={openVideoModal}
            />
          </VideoContainer>
        </SectionVideo>
        <SectionTestimonials>
          <SectionTitle className="title">
            We are backed by legends.
          </SectionTitle>
          <SectionDescription>
            Hear what some of our supporters have to say about us.
          </SectionDescription>
          <TestimonialCardsWrapper ref={testimonialsScrollRef}>
            {testimonials.map((testimonial) => (
              <TestimonialCard
                name={testimonial.name}
                description={testimonial.description}
                title={testimonial.title}
                image={testimonial.image}
                key={`testimonial ${testimonial.name}`}
              />
            ))}
          </TestimonialCardsWrapper>
        </SectionTestimonials>
        <ScrollButtonBox>
          <ScrollButton
            onClick={() => scrollLeft({ type: "testimonials" })}
          ></ScrollButton>
          <ScrollButton
            left={false}
            onClick={() => scrollRight({ type: "testimonials" })}
          ></ScrollButton>
        </ScrollButtonBox>
        <SectionNews>
          <SectionTitle>Your support has changed lives.</SectionTitle>
          <SectionDescription>
            See how your contributions are helping many chess players.
          </SectionDescription>
          {/* ["Name", "Amount", "Description", "Month", "Link"] */}
          {articleLoadLimit && (
            <span className="articles">
              {workItems?.slice(1, articleLoadLimit).map((news) => (
                <NewsCard
                  title={news[0]}
                  amount={news[1]}
                  description={news[2]}
                  month={news[3]}
                  link={news[4]}
                ></NewsCard>
              ))}
              {articleLoadLimit === initialArticleLoadLimit && (
                <NewsCard loadMore onClick={() => setArticleLoadLimit(1000)} />
              )}
            </span>
          )}
        </SectionNews>
        <ImageBannerContainer>
          <CheckPattern className="pattern-top" />
          <CheckPattern className="pattern-bottom" />
          <img className="banner" src="/images/chess-players-banner.jpeg"></img>
        </ImageBannerContainer>

        <SectionDonate>
          <p className="title">Become a believer.</p>
          <SectionDescription>
            Nurture chess talent to find the next great Indian chess player.
          </SectionDescription>
          {donationCardContent.map((card, index) => (
            <DonateNowCard
              key={index}
              title={card.title}
              img={card.img}
              subtitle={card.subtitle}
              description={card.description}
            />
          ))}
        </SectionDonate>
        <SectionSupportOrg>
          <SupportOrgCard />
        </SectionSupportOrg>

        <ImageBannerContainer>
          <CheckPattern className="pattern-top" />
          <CheckPattern className="pattern-bottom" />
          <img className="banner" src="/images/banner-last.jpeg"></img>
        </ImageBannerContainer>

        <SectionScholarship>
          <p className="title">Helpchess Scholarship.</p>
          <SectionDescription>
            We support chess players from all over India.
          </SectionDescription>
          <ApplyForScholarshipCard
            title="Apply for a scholarship"
            img="/images/scholarship.jpeg"
            subtitle="Are you a chess player in need of support?"
            description="We support chess players from all over India."
          />
        </SectionScholarship>

        <SectionWidgets>
          <p className="title">Raise funds on your livestream.</p>
          <SectionDescription>
            Simply add our widgets on your livestream and help us reach out to
            others.
          </SectionDescription>
          <Button title="Coming soon" secondary></Button>
        </SectionWidgets>
      </HomeContainer>
    </>
  );
}
