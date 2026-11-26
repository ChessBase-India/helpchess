import { ThemeProvider } from "styled-components";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import theme from "@/styles/theme";
import GlobalStyles from "@/styles/globalStyles";
import Layout from "@/components/Layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const jakarta = Plus_Jakarta_Sans({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <main className={`${inter.variable} ${jakarta.variable}`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </ThemeProvider>
  );
}
