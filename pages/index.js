import { styled } from "goober";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { getPostsForHome } from "../lib/api";
import { formatDate } from "../utils/functions";

export default function Home({ posts }) {
    return (
        <>
            <Main>
                <div>
                    <h1>
                        Blog example
                    </h1>
                    <p>Blogging about stuff, mostly tech.</p>
                </div>

                <div className="post-div">
                    <h2 style={{ marginBottom: "1rem" }}>Blog</h2>
                    <Grid>
                        {posts.map(({ node }) => {
                            return (
                                <div className="post-card" key={node.slug}>
                                    <h3>{node.title}</h3>
                                    <span>{formatDate(node.date)}</span>
                                    <Link href={`/blog/` + node.slug} passHref>
                                        <a aria-label={node.title}></a>
                                    </Link>
                                </div>
                            );
                        })}
                    </Grid>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "1rem",
                    }}
                >
                    <Link href="/blog">View all</Link>
                </div>
            </Main>
        </>
    );
}

export async function getStaticProps() {
    const posts = await getPostsForHome();

    return {
        props: { posts: posts.edges },
    };
}

const Main = styled("div")`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 15px;
    .post-div {
        margin-top: 4rem;
    }
`;

const Grid = styled("div")`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    @media (max-width: 768px) {
        grid-template-columns: 100%;
    }
    .post-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        padding: 20px;
        background-color: #fff;
        background-clip: padding-box;
        border: solid 5px transparent;
        border-radius: 10px;
        &:before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            margin: -5px;
            border-radius: inherit;
            background: linear-gradient(
                to bottom right,
                rgb(237, 34, 36),
                rgb(243, 91, 34),
                rgb(249, 150, 33),
                rgb(245, 193, 30),
                rgb(241, 235, 27) 27%,
                rgb(241, 235, 27),
                rgb(241, 235, 27) 33%,
                rgb(99, 199, 32),
                rgb(12, 155, 73),
                rgb(33, 135, 141),
                rgb(57, 84, 165),
                rgb(97, 55, 155),
                rgb(147, 40, 142)
            );
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
        h3 {
            margin-bottom: 20px;
        }
    }
`;
