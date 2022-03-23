import Document, { Html, Head, Main, NextScript } from "next/document";
import { extractCss } from "goober";

export default class MyDocument extends Document {
    static async getInitialProps({ renderPage }) {
        const page = await renderPage();
        const css = extractCss();
        return { ...page, css };
    }
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/images/icon.png" />
                    <style
                        id={"_goober"}
                        dangerouslySetInnerHTML={{
                            __html: " " + this.props.css
                        }}
                    />
                    <script
                        async
                        defer
                        data-domain="aamodt.xyz"
                        src="https://analytics.brainify.no/js/plausible.js"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}