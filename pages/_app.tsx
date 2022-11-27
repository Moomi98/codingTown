import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/global";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ height: "100%" }}>
      <GlobalStyle />
      <Component {...pageProps} />
    </div>
  );
}
