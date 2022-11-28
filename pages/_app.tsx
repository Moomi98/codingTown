import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/global";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ height: "100%" }}>
      <RecoilRoot>
        <GlobalStyle />
        <Component {...pageProps} />
      </RecoilRoot>
    </div>
  );
}
