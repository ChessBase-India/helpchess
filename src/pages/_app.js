import { ThemeProvider } from "styled-components";
import { Roboto } from "next/font/google";

import theme from "@/styles/theme";
import GlobalStyles from "@/styles/globalStyles";
import Layout from "@/components/Layout";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <main className={roboto.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </ThemeProvider>
  );
}
