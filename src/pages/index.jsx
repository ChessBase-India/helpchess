import Head from "next/head";
import styled from "styled-components";
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
import NewsCard, { NewsCardSkeleton } from "@/components/NewsCard";
import Pagination from "@/components/Pagination";
import SupportOrgCard from "@/components/SupportOrgCard";
import { BREAK_POINTS } from "@/styles/responsive";
import { testimonials, donationCardContent } from "@/utils/constants";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100dvh;
  gap: clamp(3.5rem, 7vw, 6rem);
`;

const StatsSection = styled.section`
  display: flex;
  align-items: center;
  width: calc(100% - 2rem);
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  border-radius: 1.5rem;
  background: linear-gradient(
    105deg,
    ${({ theme }) => theme.colors.surface} 40%,
    ${({ theme }) => theme.colors.surfaceEnd} 100%
  );
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  gap: 1rem;
  overflow-x: auto;
  padding: 2rem 1.5rem;
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

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    padding: 1rem;
    overflow: visible;

    & > * {
      max-width: none;
    }
  }
`;

const SectionVideo = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

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
  position: relative;
  z-index: 2;
  width: calc(100% - 2rem);
  max-width: ${({ theme }) => theme.maxWidth};
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 1.75rem;
  padding: clamp(1.5rem, 4vw, 3.5rem);
  border-radius: 1.5rem;
  color: #fff;
  background: radial-gradient(
      circle at 85% 15%,
      rgba(124, 77, 255, 0.45),
      transparent 55%
    ),
    linear-gradient(135deg, #1c1245 0%, #2f1a8a 100%);
  overflow: hidden;

  @media (min-width: 900px) {
    grid-template-columns: 0.8fr 1.2fr;
    gap: 3rem;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .eyebrow {
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #c9b8ff;
  }

  .title {
    font-family: var(--font-heading), sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
  }

  .description {
    max-width: 24rem;
    font-size: 1.0625rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .watch {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    margin-top: 0.5rem;
    font-weight: 600;
    color: #fff;

    span {
      display: inline-block;
      transition: transform 0.2s ease;
    }

    &:hover span {
      transform: translateX(3px);
    }
  }
`;

const VideoThumb = styled.button`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
  overflow: hidden;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.12);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* the thumbnail has a thin black frame baked in — crop it off */
    transform: scale(1.06);
    transition: transform 0.5s ease;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(10, 6, 30, 0.25);
    transition: background-color 0.3s ease;
  }

  .play {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: clamp(3.5rem, 8vw, 4.75rem);
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #fff;
    color: ${({ theme }) => theme.colors.primary};
    transform: translate(-50%, -50%);
    transition: transform 0.25s ease;

    svg {
      width: 42%;
      height: 42%;
      margin-left: 8%;
    }
  }

  .duration {
    position: absolute;
    z-index: 1;
    right: 0.75rem;
    bottom: 0.75rem;
    padding: 0.2rem 0.5rem;
    border-radius: 0.375rem;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
  }

  &:hover img {
    transform: scale(1.09);
  }

  &:hover::after {
    background: rgba(10, 6, 30, 0.1);
  }

  &:hover .play,
  &:focus-visible .play {
    transform: translate(-50%, -50%) scale(1.08);
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fonts.size.heading};
  font-weight: ${({ theme }) => theme.fonts.weight.heading};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin: 0 1.5rem;
`;

const SectionDescription = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.0625rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: min(32rem, 100%);
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
  gap: 1.25rem;
  height: fit-content;
  padding: 1rem max(1rem, calc((100% - ${({ theme }) => theme.maxWidth}) / 2));
  scroll-padding-inline: max(
    1rem,
    calc((100% - ${({ theme }) => theme.maxWidth}) / 2)
  );
  overflow-x: scroll;
  scroll-snap-type: x proximity;
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
  gap: 1rem;

  .articles {
    width: calc(100% - 2rem);
    max-width: ${({ theme }) => theme.maxWidth};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
    transition: opacity 0.2s ease;
  }

  .articles[aria-busy="true"] {
    opacity: 0.5;
  }

  @media (max-width: 640px) {
    .articles {
      display: flex;
      width: 100%;
      gap: 0.875rem;
      padding: 0.25rem 1rem 0.75rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-padding-inline: 1rem;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }

      & > * {
        flex: 0 0 85%;
        scroll-snap-align: start;
      }
    }
  }
`;

const StatusText = styled.p`
  color: ${({ theme }) => theme.colors.light};
  text-align: center;
`;

const SectionDonate = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 10;

  > .title {
    font-family: var(--font-heading), sans-serif;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fonts.size.heading};
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.15;
    text-align: center;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
    gap: 1.5rem;
    width: calc(100% - 2rem);
    max-width: 1100px;
    margin-top: 1rem;
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

  > .title {
    font-family: var(--font-heading), sans-serif;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fonts.size.heading};
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.15;
    text-align: center;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
    gap: 1.5rem;
    width: calc(100% - 2rem);
    max-width: 1100px;
    margin-top: 1rem;
  }
`;

const SectionDonationsWrapper = styled.section`
  max-width: 100vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  overflow: visible;
`;

const SectionDonations = styled.div`
  width: 100%;
  height: fit-content;
  overflow-x: scroll;
  scroll-snap-type: x proximity;
  display: flex;
  gap: 0.875rem;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    #000 3%,
    #000 97%,
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    #000 3%,
    #000 97%,
    transparent
  );
  padding: 1rem max(1rem, calc((100% - ${({ theme }) => theme.maxWidth}) / 2));
  scroll-padding-inline: max(
    1rem,
    calc((100% - ${({ theme }) => theme.maxWidth}) / 2)
  );

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
    display: block;
    width: 100%;
    height: clamp(260px, 45vw, 620px);
    object-fit: cover;
    z-index: 10;
    position: relative;
  }
`;

const ScrollButtonBox = styled.span`
  display: flex;
  gap: 1rem;
  justify-content: end;
  width: 100%;
  max-width: calc(${({ theme }) => theme.maxWidth} + 2rem);
  margin: calc(-1 * clamp(3.5rem, 7vw, 6rem) + 0.75rem) auto 0;
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

export default function Home() {
  const [donors, setDonors] = useState([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [allReports, setAllReports] = useState([]);
  const [reportsPage, setReportsPage] = useState(1);
  const [reportsTotalPages, setReportsTotalPages] = useState(1);
  const [reportsLoading, setReportsLoading] = useState(true);
  const REPORTS_PAGE_SIZE = 9;

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
    async function fetchReports() {
      setReportsLoading(true);
      try {
        if (!baseUrl) {
          throw new Error("NEXT_PUBLIC_API_URL is not set");
        }
        const response = await fetch(
          `${baseUrl}/v1/hc/reports?page=${reportsPage}&pageSize=${REPORTS_PAGE_SIZE}`,
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch reports (HTTP ${response.status})`);
        }
        const result = await response.json();
        if (result.ok) {
          setAllReports(result.data.reports);
          setReportsTotalPages(result.data.totalPages || 1);
        } else {
          console.error("Error fetching reports:", result.msg);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setReportsLoading(false);
      }
    }

    fetchReports();
  }, [reportsPage]);

  const reports = allReports;

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch(`${baseUrl}/v1/hc/donors`);
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
      <HomeContainer id="about">
        <VideoModal
          videoId="_jPw8otX6Ts"
          isOpen={isVideoModalOpen}
          onClose={closeVideoModal}
        />
        <Hero />
        <StatsSection>
          <StatsCard
            title="raised"
            text="₹3cr+"
            img="/images/icons/gift.svg"
          ></StatsCard>
          <StatsCard
            title="believers"
            text="4K+"
            img="/images/icons/star.svg"
          ></StatsCard>
          <StatsCard
            title="players"
            text="70+"
            img="/images/icons/pawn.svg"
          ></StatsCard>
          <StatsCard
            title="big believers"
            text="50"
            img="/images/icons/star-big.svg"
          ></StatsCard>
        </StatsSection>
        {donors.length > 0 && (
          <>
            <SectionDonationsWrapper>
              <img
                src="/images/icons/confetti.svg"
                style={{ width: "3.5rem", aspectRatio: "1" }}
                alt="confetti"
              />
              <SectionTitle>Latest donors</SectionTitle>
              <SectionDescription>
                Thank you for your contribution.
              </SectionDescription>
              <SectionDonations ref={donationsScrollRef}>
                {donors.map((donor) => (
                  <DonationCard
                    name={donor.name}
                    amount={donor.amount}
                    date={donor.date}
                    key={donor.id}
                  />
                ))}
              </SectionDonations>
            </SectionDonationsWrapper>
            <ScrollButtonBox>
              <ScrollButton
                label="Previous donors"
                onClick={() => scrollLeft({ type: "donations" })}
              ></ScrollButton>
              <ScrollButton
                left={false}
                label="Next donors"
                onClick={() => scrollRight({ type: "donations" })}
              ></ScrollButton>
            </ScrollButtonBox>
          </>
        )}
        <SectionVideo>
          <CheckPattern className="pattern-top" />
          <CheckPattern className="pattern-bottom" />
          <VideoContainer>
            <div className="text">
              <p className="eyebrow">Watch our story</p>
              <p className="title">We are on a mission</p>
              <p className="description">
                Join us in supporting 1000 Indian chess players to reach their
                goals.
              </p>
              <button type="button" className="watch" onClick={openVideoModal}>
                Watch the video <span aria-hidden="true">→</span>
              </button>
            </div>
            <VideoThumb
              type="button"
              aria-label="Play video: HelpChess, ChessBase India Foundation"
              onClick={openVideoModal}
            >
              <img
                src="https://i.ytimg.com/vi/_jPw8otX6Ts/maxresdefault.jpg"
                srcSet="https://i.ytimg.com/vi/_jPw8otX6Ts/hqdefault.jpg 480w, https://i.ytimg.com/vi/_jPw8otX6Ts/sddefault.jpg 640w, https://i.ytimg.com/vi/_jPw8otX6Ts/maxresdefault.jpg 1280w"
                sizes="(min-width: 900px) 620px, 92vw"
                alt="HelpChess — ChessBase India Foundation video"
                loading="lazy"
              />
              <span className="play" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
                </svg>
              </span>
              <span className="duration">2:13</span>
            </VideoThumb>
          </VideoContainer>
        </SectionVideo>
        <SectionTestimonials id="testimonials">
          <SectionTitle className="title">
            We are backed by legends
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
            label="Previous testimonials"
            onClick={() => scrollLeft({ type: "testimonials" })}
          ></ScrollButton>
          <ScrollButton
            left={false}
            label="Next testimonials"
            onClick={() => scrollRight({ type: "testimonials" })}
          ></ScrollButton>
        </ScrollButtonBox>
        <SectionNews id="stories">
          <SectionTitle>Your support has changed lives</SectionTitle>
          <SectionDescription>
            See how your contributions are helping many chess players.
          </SectionDescription>
          {reportsLoading && reports.length === 0 ? (
            <div className="articles" aria-busy="true">
              {Array.from({ length: 6 }, (_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          ) : reports.length === 0 ? (
            <StatusText>No stories yet.</StatusText>
          ) : (
            <div
              className="articles"
              key={reportsPage}
              aria-busy={reportsLoading}
            >
              {reports.map((report) => (
                <NewsCard
                  key={report._id}
                  title={report.title}
                  amount={report.amount}
                  description={report.subtitle}
                  thumbnail={report.thumbnail}
                  date={report.date}
                  link={report.link}
                />
              ))}
            </div>
          )}
          <Pagination
            page={reportsPage}
            totalPages={reportsTotalPages}
            disabled={reportsLoading}
            onChange={(page) => {
              setReportsPage(page);
              document
                .getElementById("stories")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </SectionNews>
        <ImageBannerContainer>
          <CheckPattern className="pattern-top" />
          <CheckPattern className="pattern-bottom" />
          <img
            className="banner"
            src="/images/chess-players-banner.jpeg"
            alt="Chess players supported by HelpChess"
            loading="lazy"
          />
        </ImageBannerContainer>

        <SectionDonate>
          <p className="title">Become a believer</p>
          <SectionDescription>
            Nurture chess talent to find the next great Indian chess player.
          </SectionDescription>
          <div className="cards">
            {donationCardContent.map((card, index) => (
              <DonateNowCard
                key={index}
                title={card.title}
                img={card.img}
                subtitle={card.subtitle}
                description={card.description}
              />
            ))}
          </div>
        </SectionDonate>
        <SectionSupportOrg>
          <SupportOrgCard />
        </SectionSupportOrg>

        <ImageBannerContainer>
          <CheckPattern className="pattern-top" />
          <CheckPattern className="pattern-bottom" />
          <img
            className="banner"
            src="/images/banner-last.jpeg"
            alt="Young chess players at a tournament"
            loading="lazy"
          />
        </ImageBannerContainer>

        <SectionScholarship>
          <p className="title">Helpchess Scholarship</p>
          <SectionDescription>
            We support chess players from all over India.
          </SectionDescription>
          <div className="cards" style={{ maxWidth: "640px" }}>
            <ApplyForScholarshipCard
              title="Apply for a scholarship"
              img="/images/scholarship.jpeg"
              subtitle="Are you a chess player in need of support?"
              description="We support chess players from all over India."
            />
          </div>
        </SectionScholarship>
      </HomeContainer>
    </>
  );
}
