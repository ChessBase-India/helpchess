import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

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
import {
  testimonials,
  donationCardContent,
  stats,
  VIDEO_ID,
} from "@/utils/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const REPORTS_PAGE_SIZE = 9;
const SCROLL_STEP = 500;

const ytThumb = (quality) =>
  `https://i.ytimg.com/vi/${VIDEO_ID}/${quality}.jpg`;

const fetchJson = async (path) => {
  if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not set");
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${path}`);
  const result = await response.json();
  if (!result.ok) throw new Error(result.msg || result.err || "API error");
  return result.data;
};

const fetchDonors = () =>
  fetchJson("/v1/hc/donors").then((data) => data.recentDonors ?? []);

const fetchReports = (page) =>
  fetchJson(`/v1/hc/reports?page=${page}&pageSize=${REPORTS_PAGE_SIZE}`).then(
    (data) => ({
      reports: data.reports ?? [],
      totalPages: data.totalPages || 1,
    }),
  );

// Pre-render donors and the first page of stories so they arrive with the HTML
// (no pop-in), and refresh them in the background every 5 minutes.
export async function getStaticProps() {
  const [donors, firstPage] = await Promise.all([
    fetchDonors().catch(() => []),
    fetchReports(1).catch(() => ({ reports: [], totalPages: 1 })),
  ]);
  return {
    props: {
      initialDonors: donors,
      initialReports: firstPage.reports,
      initialTotalPages: firstPage.totalPages,
    },
    revalidate: 300,
  };
}

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

const CardsSection = styled.section`
  width: 100%;
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
    max-width: ${({ $narrow }) => ($narrow ? "640px" : "1100px")};
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

const ImageBanner = styled.div`
  width: 100%;
  height: clamp(260px, 45vw, 620px);
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
    z-index: 10;
    object-fit: cover;
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

export default function Home({
  initialDonors,
  initialReports,
  initialTotalPages,
}) {
  const [donors, setDonors] = useState(initialDonors);
  const [reports, setReports] = useState(initialReports);
  const [reportsPage, setReportsPage] = useState(1);
  const [reportsTotalPages, setReportsTotalPages] = useState(initialTotalPages);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const donationsScrollRef = useRef(null);
  const testimonialsScrollRef = useRef(null);

  const scrollRow = (ref, direction) =>
    ref.current?.scrollBy({
      left: direction * SCROLL_STEP,
      behavior: "smooth",
    });

  const openVideoModal = () => setIsVideoModalOpen(true);

  // the pre-rendered donor list can be a few minutes old — refresh it quietly
  useEffect(() => {
    fetchDonors()
      .then((latest) => latest.length && setDonors(latest))
      .catch((error) => console.error("Error fetching donors:", error));
  }, []);

  // page 1 comes from getStaticProps; fetch the others on demand
  useEffect(() => {
    if (reportsPage === 1 && initialReports.length) {
      setReports(initialReports);
      return;
    }
    let cancelled = false;
    setReportsLoading(true);
    fetchReports(reportsPage)
      .then((result) => {
        if (cancelled) return;
        setReports(result.reports);
        setReportsTotalPages(result.totalPages);
      })
      .catch((error) => console.error("Error fetching reports:", error))
      .finally(() => !cancelled && setReportsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [reportsPage, initialReports]);

  return (
    <>
      <Head>
        <title>Helpchess - ChessBase India Foundation | NGO</title>
        <meta
          name="description"
          content="Helpchess is on a mission to support 1000 Indian chess players to reach their goals!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HomeContainer id="about">
        <VideoModal
          videoId={VIDEO_ID}
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
        />
        <Hero />
        <StatsSection>
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </StatsSection>
        {donors.length > 0 && (
          <>
            <SectionDonationsWrapper>
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG, nothing to optimise */}
              <img
                src="/images/icons/confetti.svg"
                width={56}
                height={56}
                alt=""
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
                onClick={() => scrollRow(donationsScrollRef, -1)}
              />
              <ScrollButton
                left={false}
                label="Next donors"
                onClick={() => scrollRow(donationsScrollRef, 1)}
              />
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
              {/* eslint-disable-next-line @next/next/no-img-element -- YouTube serves its own sized thumbnails via srcSet */}
              <img
                src={ytThumb("maxresdefault")}
                srcSet={`${ytThumb("hqdefault")} 480w, ${ytThumb("sddefault")} 640w, ${ytThumb("maxresdefault")} 1280w`}
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
                key={testimonial.name}
              />
            ))}
          </TestimonialCardsWrapper>
        </SectionTestimonials>
        <ScrollButtonBox>
          <ScrollButton
            label="Previous testimonials"
            onClick={() => scrollRow(testimonialsScrollRef, -1)}
          />
          <ScrollButton
            left={false}
            label="Next testimonials"
            onClick={() => scrollRow(testimonialsScrollRef, 1)}
          />
        </ScrollButtonBox>
        <SectionNews id="stories">
          <SectionTitle>Your support has changed lives</SectionTitle>
          <SectionDescription>
            See how your contributions are helping many chess players.
          </SectionDescription>
          {reportsLoading && !reports.length ? (
            <div className="articles" aria-busy="true">
              {Array.from({ length: 6 }, (_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          ) : !reports.length ? (
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
        <ImageBanner>
          <CheckPattern className="pattern-top" />
          <CheckPattern className="pattern-bottom" />
          <Image
            className="banner"
            src="/images/chess-players-banner.jpeg"
            alt="Chess players supported by HelpChess"
            fill
            sizes="100vw"
          />
        </ImageBanner>

        <CardsSection>
          <p className="title">Become a believer</p>
          <SectionDescription>
            Nurture chess talent to find the next great Indian chess player.
          </SectionDescription>
          <div className="cards">
            {donationCardContent.map((card) => (
              <DonateNowCard key={card.title} {...card} />
            ))}
          </div>
        </CardsSection>
        <SectionSupportOrg>
          <SupportOrgCard />
        </SectionSupportOrg>

        <ImageBanner>
          <CheckPattern className="pattern-top" />
          <CheckPattern className="pattern-bottom" />
          <Image
            className="banner"
            src="/images/banner-last.jpeg"
            alt="Young chess players at a tournament"
            fill
            sizes="100vw"
          />
        </ImageBanner>

        <CardsSection $narrow>
          <p className="title">Helpchess Scholarship</p>
          <SectionDescription>
            We support chess players from all over India.
          </SectionDescription>
          <div className="cards">
            <ApplyForScholarshipCard
              title="Apply for a scholarship"
              img="/images/scholarship.jpeg"
              subtitle="Are you a chess player in need of support?"
              description="We support chess players from all over India."
            />
          </div>
        </CardsSection>
      </HomeContainer>
    </>
  );
}
