import { createElement } from "react";
import { setup } from "goober";
import { prefix } from "goober/prefixer";
import "../styles/global.css";
import "@aamodtgroup/gutenberg-styles/style.css";
import "@aamodtgroup/gutenberg-styles/theme.css";

setup(createElement, prefix);

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
