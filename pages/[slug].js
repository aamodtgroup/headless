import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { getAllPageSlugs, getPage } from "../lib/api";
import { styled } from "goober";
import Html2react from "../components/html2react";

export default function Blog({ page }) {
    const router = useRouter();

    if (!router.isFallback && !page?.slug) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <>
            {router.isFallback ? (
                <span>Loading…</span>
            ) : (
                <>
                    <Head>
                        <title>{page.title} - Kasper Aamodt</title>
                        <meta content={page.excerpt} name="description" />
                    </Head>

                    <Main>
                        <Html2react html={page.content} />
                    </Main>
                </>
            )}
        </>
    );
}

export async function getStaticProps({ params }) {
    const data = await getPage(params.slug);

    return {
        props: {
            page: data,
        },
    };
}

export async function getStaticPaths() {
    const pages = await getAllPageSlugs();

    return {
        paths: pages.edges.map(({ node }) => `/${node.slug}`) || [],
        fallback: true,
    };
}

const Main = styled("div")`
    &
        > :not(.alignwide):not(.alignfull):not(.alignleft):not(.alignright):not(.wp-block-separator):not(.woocommerce),
    [class*="inner-container"]
        > :not(.entry-content):not(.alignwide):not(.alignfull):not(.alignleft):not(.alignright):not(.wp-block-separator):not(.woocommerce),
    .default-max-width {
        max-width: var(--responsive--aligndefault-width);
        margin-left: auto;
        margin-right: auto;
    }
    & > *,
    [class*="inner-container"] > *,
    .wp-block-template-part > *,
    .wp-block-post-template :where(li > *) {
        margin-top: var(--global--spacing-vertical);
        margin-bottom: var(--global--spacing-vertical);
    }
    .alignwide {
        max-width: var(--responsive--alignwide-width);
        margin-left: auto;
        margin-right: auto;
    }
`;
