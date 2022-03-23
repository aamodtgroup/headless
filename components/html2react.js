import Link from "next/link";
import Image from "next/image";
import parse, { domToReact } from "html-react-parser";

export default function Html2react({html} = html) {
    const content = {
        replace: ({ name, attribs, children }) => {
            
            if (name === "a") {
                return (
                    <Link href={attribs.href} passHref>
                        <a>{domToReact(children)}</a>
                    </Link>
                );
            }
        }
    };

    return parse(html, content);
}