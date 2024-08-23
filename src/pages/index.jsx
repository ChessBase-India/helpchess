import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

import Hero from "@/components/Hero";
import StatsCard from "@/components/StatsCard";
import TestimonialCard from "@/components/TestimonialCard";
import DonateNowCard from "@/components/DonateNowCard";
import CheckPattern from "@/components/CheckPattern";
import DonationCard from "@/components/DonationsCard";
import ScrollButton from "@/components/ScrollButton";
import VideoModal from "@/components/VideoModal";
import NewsCard from "@/components/NewsCard";
import SupportOrgCard from "@/components/SupportOrgCard";
import Button from "@/components/Button";
import { BREAK_POINTS } from "@/styles/responsive";

const initialArticleLoadLimit = 8;

const dummy = {
  range: "Sheet1!A1:E700",
  majorDimension: "ROWS",
  values: [
    ["Name", "Amount", "Description", "Month", "Link"],
    [
      "Funds raised for the year 2023-24",
      "Rs.54,70,052",
      "How were the funds raised by HelpChess Foundation in the year 2023-24 and who were the players that were supported.",
      "Jul 2024",
      "https://chessbase.in/news/HelpChess-Foundation-annual-report-for-2023-24",
    ],
    [
      "14 laptops for 14 youngsters",
      "14 laptops",
      "ChessBase India's YouTube membership amount was used to purchase 14 laptops which were then distributed to 14 talents.",
      "Jun 2024",
      "https://chessbase.in/news/14-laptops-from-ChessBase-India-YouTube-Memberships-",
    ],
    [
      "Shrenik and Purva Lad scholarship",
      "Rs.50,000",
      "Shrenik and Purva raised Rs.50,000 through crowd funding with their friends to support the career of talented youngster IM Mayank Chakraborty.",
      "Feb 2024",
      "https://twitter.com/ChessbaseIndia/status/1755309415375475032?t=8q5XvshNhHQHFlvFNra2xA&s=19",
    ],
    [
      "Tanay Johar Scholarship",
      "Rs 50,000",
      "Tushar Johar, who has been a chess fanatic for many years, unfortunately lost his brother Tanay to a rare type of cancer. In his memory, to spread positivity and awareness, Tushar instated a Rs. 50,000 scholarship .Shreya Hipparagi from Maharashtra received this scholarship",
      "Dec 2023",
      "https://chessbase.in/news/Helpchess-Shreya-Hipparagi-wins-the-Tanay-Johar-Scholarship-of-Rs-50-000",
    ],
    [
      "BijayRajani Scholarship",
      "Rs.1,00,000",
      "Neeraj Kumar a passionate chess lover and IRS officer supports Marium Fatima, an upcoming young talent from Bihar chess",
      "Dec 2023",
      "https://chessbase.in/news/Marium-Fatima-the-future-of-Bihar-chess",
    ],
    [
      "Big Chess Winter Camp scholarships",
      "Rs. 1,00,000",
      "Rs.50,000 was awarded to Narayani Marathe by Amit Mantri for becoming national under-7 champion and Rs.50,000 to ChessBoxer Sneha Waykar by Sagar Shah and Amruta Mokal for achieving silver medal at World Chess Boxing Championships 2023",
      "Nov 2023",
      "https://twitter.com/ChessbaseIndia/status/1729148283090796721",
    ],
    [
      "Sarada Scholarship",
      "10,00,000",
      "Sarada Scholarship is instituted by a donor in the memory of his mother and the amount of Rs.10 lakh is distributed among Sarayu Velpula (Rs.5 lakh), Sahithi Varshini (Rs.2.5 lakh) and Mrittika Mallick (Rs.2.5 lakh)",
      "Nov 2023",
      "https://chessbase.in/news/Sarada-Scholarship-to-Sarayu-Sahithi-and-Mrittika",
    ],
    [
      "S. Krishnan Scholarship ",
      "50,000",
      "Kartik Krishnan instituted the scholarship in the name of his father and it was given to the talent from North East India Arshiya Das",
      "Jul 2023",
      "https://chessbase.in/news/Kartik-Krishnan-Scholarship-winner-Arshiya-Das",
    ],
    [
      "Pursue Your Chess scholarship 4",
      "1,25,000",
      "The 4th edition of Pursue your chess scholarship by Ashwin Subramanian. Rs.1,00,000 goes to Kushagra Mohan and Rs.25,000 to Shriraj Bhosale",
      "Jun 2023",
      "https://chessbase.in/news/IM-Kushagra-Mohan-and-Shriraj-Bhosale-win-Pursue-Your-Chess-Scholarship-4",
    ],
    [
      "Summary of the work done by HelpChess in 2022-23",
      "25,97,626",
      "This is the summary of all the work that HelpChess did from 1st of April 2022 to 31st of March 2023",
      "Apr 2023",
      "https://chessbase.in/news/HelpChess-work-done-in-2022-23",
    ],
    [
      "Arjun Erigaisi Death Match 2.0 scholarship",
      "3,25,000",
      "This amount is donated by GM Arjun Erigaisi from his ChessBase India Originals Death match 2.0 prize money. It is given to the talented Sumer Arsh Shaikh from Telangana",
      "Feb 2023",
      "https://chessbase.in/news/Sumer-Arsh-wins-the-Arjun-Erigaisi-Death-Match-2-0-scholarship",
    ],
    [
      "Laptop for Shreya Hipparagi",
      "83,000",
      "ASUS Vivobook was donated by Vivek Gupta, a chess lover, to the talented Shreya Hipparagi ",
      "Jan 2023",
      "https://www.facebook.com/chessbaseindia/posts/pfbid038KbWn8iM8zyPi3S5cdHg3BKpUfJLBA2mD3QHCkghcq6rCCKVJg1EmpX8rmfL9Q65l",
    ],
    [
      "Shrenik Lad scholarship",
      "50,000",
      "This amount is given by chess lovers Shrenik Lad and his wife Purva Gaggar for the training camp of Mayank Chakraborty",
      "Jan 2023",
      "https://www.facebook.com/chessbaseindia/posts/pfbid0pANgUpx1NamHo1Y9QfT19gH1UY6U6xvRCuFuDzgoz2aiTaQUgBSZecizKKHrjGDkl",
    ],
    [
      "Suhani Shah Scholarship",
      "83,000",
      "Suhani Shah donated Rs.100,000 that she won from COB Gang War to HelpChess and this amount was used to buy a laptop for young talent Md.Imran.",
      "Nov 2022",
      "https://chessbase.in/news/The-story-of-Md-Imran",
    ],
    [
      "Anish Giri Death Match scholarship",
      "2,00,000",
      "This amount comes from Anish Giri's prize winnings at the ChessBase India Originals Death Match and is given to the recently crowned under-14 world champion Ilamparthi AR",
      "Sep 2022",
      "https://www.youtube.com/post/UgkxlDK5RS-Zsnv6hAwwNLLuChTpS1D5VHg8",
    ],
    [
      "Laptop for India's 75th GM Pranav",
      "1,00,000",
      "Given to India's 75th GM Pranav V. to buy laptop Lenovo Yoga 7. The amount was sponsored by Mr. Dharmen Shah.",
      "Aug 2022",
      "https://www.youtube.com/watch?v=QNmmhvIeTBA",
    ],
    [
      "1st Mystic Wealth Chess Scholarship 2022-23",
      "1,50,000",
      "Manish Dhawan, the founder partner of Mystic Wealth investment firm instituted the 1st Mystic Wealth Scholarship 2022-23 of Rs.1,50,000 and it was awarded to WIM Arpita Mukherjee",
      "May 2022",
      "https://chessbase.in/news/Arpita-Mukherjee-wins-the-Mystic-Wealth-Scholarship-of-Rs-1-50-000",
    ],
    [
      "Sadhana App Sponsorship",
      "4,50,000",
      "Given to Aronyak Ghosh, Pranav V. and Priyanka K. Rs.1,50,000 each for the mission grandmaster from Sadhana App supported by Vidit Gujrathi",
      "May 2022",
      "https://www.chessbase.in/news/Mission-Grandmaster-by-Sadhana-Sponsorship",
    ],
    [
      "YouTube Membership March Fund",
      "Rs.53,365",
      "Given to Sharvaanica AS, the girl who wins all her tournaments with a score of 100%",
      "Mar 2022",
      "https://chessbase.in/news/Sharvaanica-The-Girl-who-wins-all-her-games",
    ],
    [
      "King's Gambit Scholarship",
      "Rs.1,20,000",
      "Rs.10,000 per month and a total of Rs.1,20,000 scholarship offered by Prabodh Prakash, a software developer from Bangalore. This is won by WIM Mounika Akshaya from Andhra Pradesh",
      "Feb 2022",
      "https://www.chessbase.in/news/Akshaya-Mounika-wins-King-s-Gambit-Scholarship-2022",
    ],
    [
      "YouTube Membership February Fund",
      "Rs.1,02,526",
      "Given to Mrittika Mallick with the help of February YouTube memberships of Rs.55026 + Rs.35,000 by Harish Srinivasan + Rs.12,500 by Nandini Srikar",
      "Feb 2022",
      "https://chessbase.in/news/Mrittika-Mallick-gets-February-2022-YouTube-Memberships",
    ],
    [
      "YouTube Membership January Fund",
      "71,355",
      "Given to Sarayu Velpula with the help of January YouTube Memberships + Rs.12,500 by Nandini Srikar",
      "Jan 2022",
      "https://www.chessbase.in/news/Sarayu-Velpula-gets-January-2022-YouTube-membership-fund",
    ],
    [
      "YouTube Membership December Fund",
      "72,706",
      "Given to Daakshin Arun with the help of December YouTube Memberships.",
      "Dec 2021",
      "https://www.chessbase.in/news/YouTube-membership-fund-of-December-2021-goes-to-Daakshin-Arun",
    ],
    [
      "Murliedhor Jalan Foundation Scholarship",
      "7,50,000",
      "Given to Shahil Dey and Mayank Chakraborty from North East India.  Instituted by Mrityunjay Jalan.",
      "Dec 2021",
      "https://chessbase.in/news/Murleidhor-Jalan-Foundation-supports-North-East-India-Chess",
    ],
    [
      "YouTube Membership November Fund",
      "60,625",
      "Given to Shreya Hipparagi with the help of November YouTube Memberships.",
      "Nov 2021",
      "https://www.chessbase.in/news/November-2021-YouTube-Membership",
    ],
    [
      "Prakhar Gupta & YT October Fund",
      "1,07,194",
      "Given to M. Pranesh with the help of October YouTube Memberships & Prakhar Gupta's half COB prize money.",
      "Oct 2021",
      "https://www.chessbase.in/news/October-2021-YouTube-memberships-fund-for-Pranesh",
    ],
    [
      "YouTube Membership September Fund",
      "68,907",
      "Given to K. Marimuthu with the help of September YouTube Memberships.",
      "Sep 2021",
      "https://www.chessbase.in/news/Marimuthu-gets-September-ChessBase-India-YouTube-fund",
    ],
    [
      "Sanjay Sivakumar Fundraiser & YT August Fund",
      "6,18,603",
      "Given to Sanjay Sivakumar for his fight against Osteogenesis Imperfecta with the help of Indian Chess Community.",
      "Sep 2021",
      "https://www.chessbase.in/news/Rs-592669-raised-for-Sanjays-Osteogenesis-Imperfecta",
    ],
    [
      "Krunal Parmar & YT July Fund",
      "2,04,799",
      "Krunal Parmar sponsored Illamparthi's Laptop worth 85k and July Fund of was earmarked to be used for Ilamparthi's tournaments.",
      "Jul 2021",
      "https://chessbase.in/news/YouTube-memberships-Update-for-July-2021",
    ],
    [
      "Pursue your Chess Scholarship 3",
      "1,00,000",
      "Given to Harikrishnan A Ra and Neelash Saha. Instituted by Ashwin Subramanian.",
      "Jul 2021",
      "https://chessbase.in/news/3rd-Pursue-your-Chess-Scholarship",
    ],
    [
      "YouTube Membership June Fund",
      "77,383",
      "Given to Pranav V.  with the help of June YouTube Memberships.",
      "Jun 2021",
      "https://www.chessbase.in/news/ChessBase-India-YouTube-Memberships-June-2021",
    ],
    [
      "YouTube Membership May Fund",
      "74,931",
      "Given to winner Karthik Venkata Krishna with the help of May YT Memberships & contributions from Shikhar Saxena & Siddharth Bulia.",
      "May 2021",
      "https://chessbase.in/news/ChessBase-India-YouTube-Memberships-May-2021",
    ],
    [
      "Super Heroes Cup",
      "2,60,888",
      "Given to winners of the cup. Funds were raised during the Knighthood Blitz Tournament.",
      "May 2021",
      "https://chessbase.in/news/Super-Heroes-Cup-2021",
    ],
    [
      "YouTube Membership April Fund",
      "49,588",
      "Given to Savitha Shri with the help of April YouTube Memberships & contribution from an anonymous donor.",
      "Apr 2021",
      "https://chessbase.in/news/ChessBase-India-YouTube-Memberships-March-and-April-2021",
    ],
    [
      "Super-Chat Train Fundraiser",
      "1,26,898",
      "Raised spontaneously with the huge support of viewers. Amount to be used for Super Talents Cup.",
      "Feb 2021",
      "https://www.youtube.com/watch?v=Hy7JCFE78zs",
    ],
    [
      "Super Girls of India",
      "29,000",
      "Given to visually impaired Himanshi Rathi & Megha Chakraborty with the help of Tania Sachdev & YouTube Viewers.",
      "Jan 2021",
      "https://www.youtube.com/watch?v=whIIZ7H_8Jg",
    ],
    [
      "Soundarya Pradhan Fundraiser",
      "33,000",
      "Given to Soundarya Pradhan for building a website for Blind Chess Player. Contributions by Nihal Sarin, Ayushi Sharma & Sanjeevan.",
      "Jan 2021",
      "https://chessbase.in/news/Soundarya-Pradhan-website-for-blind-chess-players",
    ],
    [
      "Samay - Ambani OP Sponsorship",
      "2,00,000",
      "Given to Sreeshwan Maralakshikari with the help of Samay Raina's YouTube Members.",
      "Jan 2021",
      "https://chessbase.in/news/Sreeshwan-Maralakshikari-needs-your-help",
    ],
    [
      "Super Juniors Cup",
      "5,67,228",
      "Given to Top 32 Young Talents. Did an online blitz tournaments with contributions from YT viewers, Samay Raina & Tania Sachdev.",
      "Dec 2020",
      "https://chessbase.in/news/10-things-that-made-Super-Juniors-Cup-2020-special",
    ],
    [
      "Coach Durgesh Fundraiser",
      "11,46,873",
      "Given to Durgesh for his brain haemorrhage treatment. Contributions from Anish Giri, Samay Raina, Sushruta Reddy & Chess Community.",
      "Oct 2020",
      "https://chessbase.in/news/Chess-Community-raises-over-11-lacs-for-coach-Durgesh",
    ],
    [
      "Dare to Dream Scholarship",
      "28,570",
      "Given to Ilamparthi for training. Contributions by Devin Anand's YouTube viewers.",
      "Sep 2020",
      "https://www.youtube.com/watch?v=7mVCXS4kzNI",
    ],
    [
      "Amphan Cyclone Simul & Fundraiser",
      "58,193",
      "Given to CRY Children Fund. Did an Online Blitz Event on PlayChess in collaboration with CRY Organisation & West Bengal Chess Community.",
      "Jul 2020",
      "https://chessbase.in/news/Amphan-Cyclone-Fundraiser-Blitz-Simul-and-Live-Stream-raises-58193",
    ],
    [
      "Ilamparthi Training Camp ",
      "90,000",
      "Given to Ilamparthi for Chess Training. Contributions from YouTube viewers during a memorable live stream.",
      "Jul 2020",
      "https://chessbase.in/news/ChessBase-India-YouTube-stream-raises-Rs-462734",
    ],
    [
      "Pursue your Chess Scholarship 2",
      "50,000",
      "Given to Shahil Dey and Anirudh Potawad. Instituted by Ashwin Subramanian.",
      "May 2020",
      "https://chessbase.in/news/Shahil-Dey-and-Annirudh-Potawad-win-Pursue-your-chess-scholarship-2020-21",
    ],
    [
      "Let's fight Corona Fundraiser",
      "3,69,137",
      "Given to PM Cares Fund. Raised via YouTube stream superchats and an Online Blitz Event on PlayChess in collaboration with Indian Chess Community.",
      "Apr 2020",
      "https://fightcovid19.chessbase.in/",
    ],
    [
      "Rafiq Khan Memorial",
      "1,27,003",
      "Given to Zahida Khan (wife). Did an online blitz event in collaboration with Rafiq Khan's friends and admirers.",
      "Oct 2019",
      "https://chessbase.in/news/The-story-of-Rafiq-Khan",
    ],
    [
      "Let's rebuild Odisha Fundraiser",
      "33,121",
      "Given to Chief Minister Relief Fund. Did an Online Blitz Event for Cyclone Fani in collaboration with Indian Chess Community.",
      "May 2019",
      "https://chessbase.in/news/Indian-chess-players-raise-Rs-33121-in-Lets-Rebuild-Odisha-fundraiser-tournament",
    ],
    [
      "Pulwama Attack Martyrs fundraiser",
      "1,01,973",
      "Given to Bharat Ke Veer Fund. Did an Online Blitz Event in collaboration with Indian Chess Community.",
      "Feb 2019",
      "https://chessbase.in/news/Indian-Chess-players-raise-funds-for-Pulwama-Martyrs",
    ],
    [
      "Dennis Kow Scholarship",
      "51,000",
      "Given to differently abled Samarth Rao. Instituted by Jagadeesh Balakrishnan & Suhani Lohia.",
      "Dec 2018",
      "https://www.chessbase.in/news/Samarth-Rao-wins-Dennis-Kow-Scholarship",
    ],
    [
      "Pursue your Chess Scholarship 1",
      "50,000",
      "Given to Sammed Shete. Instituted by Ashwin Subramanian.",
      "Nov 2018",
      "https://chessbase.in/news/Sammed-Shete-wins-Pursue-your-Chess-scholarship",
    ],
    [
      "Kerala flood relief fundraiser",
      "1,74,463",
      "Given to Kerala CM Distress Relief Fund. Did a YouTube Show with Nihal Sarin in collaboration with Indian Chess Community.",
      "Aug 2018",
      "https://chessbase.in/news/Nihal_Sarin_raises_funds_for_Kerala",
    ],
    [
      "1st MKG Scholarship for Girls",
      "50,000",
      "Given to K Priyanka. Instituted by Jagadeesh Balakrishnan.",
      "Aug 2018",
      "https://www.chessbase.in/news/Priyanka_MKG_Scholarship",
    ],
  ],
};

const testimonials = [
  {
    name: "arjun erigaisi",
    title: "Super Grand Master",
    description:
      "HelpChess is a great initiative. I personally have been involved with it a few times and it’s such a wonderful feeling that the help has reached the ones in need in a timely manner. If you are looking to help chess then do consider HelpChess.",
    image: "/images/arjun.jpeg",
  },
  {
    name: "Vidit Gujrathi",
    title: "Super Grand Master",
    description:
      "I have personally seen and felt how big of an impact help chess and Chessbase India have had on the people in the chess community. Their timely help gave many talents the required resources to change their lives. I take great pride in closely knowing the lovely human beings behind this initiative. Sagar and Amruta. And if there is anyone who can be trusted to take this huge responsibility, it's them. If people want to support the cause, I'd highly recommend helpchess.org.",
    image: "/images/vidit.jpg",
  },
  {
    name: "Samay Raina",
    title: "Chess Youtuber, Comedian",
    description:
      "When it comes to contributing to Indian chess, if there is anybody who comes to my mind after Vishy Anand, it is only and only ChessBase India. HelpChess OP!",
    image: "/images/samay.jpg",
  },
  {
    name: "Tanmay Bhat",
    title: "Youtuber, Comedian",
    description:
      "Sagar is singularly the most passionate man I know in the Indian chess community, loved not just by fans, but admired and respected by Indian and global chess players alike; so happy to know that all the compassionate work he has done over the years is getting formalized and turning into a true moment through this foundation—do take a moment and contribute to it; when the history of Indian chess is written, nobody will be prouder than Sagar.",
    image: "/images/tanmay.jpg",
  },
  {
    name: "Humpy Koneru",
    title: "Super Grandmaster",
    description:
      "HelpChess is a great initiative by ChessBase India, genuinely helping talented players across the country; most importantly, it is very transparent, and one can be assured that donated funds are used in the right way.",
    image: "/images/humpy.jpeg",
  },
];

const donationCardContent = [
  {
    title: "Believer",
    subtitle: "Any amount of your choice.",
    description:
      "Support a player to buy a laptop and learn with chess engines for more expert challenges",
    img: "/images/believer.jpeg",
  },
  {
    title: "Big Believer",
    subtitle: "₹50K or above",
    description:
      "Support a player’s career long-term towards chess tournaments, travel.",
    img: "/images/big-believer.jpeg",
  },
];

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
  justify-content: center;
  height: 13.5rem;
  width: 100%;
  border-radius: 0.9375rem;
  background: linear-gradient(105deg, #fff9c1 58.95%, #fff 100%);
  gap: 0.44rem;
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
  width: 20rem;
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
    width: 30rem;
  }

  .description {
    width: 30rem;
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

  // Testing - Remove this
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1yo2GrCH9uD9DKmehh534IhS9NlR5FPlESjNZHvCadO0/values/Sheet1!A1:E700?key=AIzaSyDRpd7XCVIQsju4cmbb1GXXEoxV7mG1Nzw",
      );
      const data = await response.json();
      setWorkItems(data.values.slice(1)); // Skip the first item
    }

    fetchData();
  }, []);

  useEffect((workItems) => console.log(workItems), [workItems]);

  // Till here

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
        <link rel="icon" href="/favicon.ico" />
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
            text="₹1cr+"
            img="/images/icons/gift.svg"
          ></StatsCard>
          <StatsCard
            title="believers"
            text="4K+"
            img="/images/icons/star.svg"
          ></StatsCard>
          <StatsCard
            title="players"
            text="50+"
            img="/images/icons/pawn.svg"
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
              {dummy.values.slice(1, articleLoadLimit).map((news) => (
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
          {donationCardContent.map((card) => (
            <DonateNowCard
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
