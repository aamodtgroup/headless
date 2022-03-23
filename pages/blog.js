import Head from "next/head";
import { styled } from "goober";
import { getAllPosts } from "../lib/api";
import Link from "next/link";
import { formatDate } from "../utils/functions";

export default function Blog({ posts }) {
    return (
        <>
            <Head>
                <title>Blog - Kasper Aamodt</title>
                <meta content="Read my latest blog posts" name="description" />
            </Head>

            <Main>
                {posts?.map(({ node }) => {
                    return (
                        <div className="post-card" key={node.slug}>
                            <h2> {node.title}</h2>
                            <span>{formatDate(node.date)}</span>
                            <Link href={`/blog/` + node.slug} passHref>
                                <a aria-label={node.title}></a>
                            </Link>
                        </div>
                    );
                })}
            </Main>

        </>
    );
}

export async function getStaticProps() {
    const posts = await getAllPosts();

    return {
        props: {
            posts
        }
    };
}

const Main = styled("div")`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 15px;
    .post-card {
        position: relative;
        border-bottom: 1px solid;
        padding: 24px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        &:last-of-type {
            border-bottom: none;
        }
        h2 {
            font-size: 1rem;
        }
        a {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
            opacity: 0;
            height: 100%;
            width: 100%;
            text-decoration: none;
        }
    }
`;
