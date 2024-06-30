import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeMathjax from "rehype-mathjax";
import rehypeSlug from "rehype-slug";
import styled from "styled-components";
import "highlight.js/styles/github-dark.css";
import { useEffect, useState } from "react";
import mermaid from "mermaid";
import { brandColor, onPhone } from "../constants";
import { Link } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import parse from "html-react-parser";

const Main = styled.main`
  box-sizing: border-box;
  line-height: 160%;
  flex: 1;
  text-align: justify;
  min-width: 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  h1,
  h2,
  h3,
  h4,
  p,
  ol,
  ul {
    padding: 0px 32px;
  }

  h1,
  h2 {
    padding-top: 64px;
  }

  h3,
  h4 {
    padding-top: 32px;
  }

  ol,
  ul {
    margin-left: 32px;
  }

  blockquote {
    border-left: solid 3px #aaaaaa;
    padding-left: 16px;
    color: #555555;
  }

  code {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.8em;
    line-height: 160%;
  }

  .mermaid > svg,
  pre > code,
  img {
    box-sizing: border-box;
    max-width: 100%;
    width: -webkit-fill-available;
    border-radius: 16px;
    margin: 0px 48px;
    padding: 32px;
    box-shadow: 2px 2px 10px #aaaaaa;

    @media (max-width: ${onPhone}px) {
      width: 100%;
      max-width: 100% !important;
      border-radius: 0px;
      margin: 0px;
      overflow-x: scroll;
    }
  }

  pre > code {
    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #555566;

      &:hover {
        background-color: #${brandColor};
      }
    }

    &::-webkit-scrollbar-button {
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
    }
  }

  .mermaid {
    max-width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;

    p, div, span {
      padding: 0px;
      margin: 0px;
    }

    & > svg {
      @media (max-width: ${onPhone}px) {
        max-height: 50vh;
      }
    }
  }

  & > mjx-container {
    padding: 16px;
    
    & > svg {
      max-width: 100%;
    }
  }

  table,
  td,
  th {
    border-width: 1px;
    border-style: solid;
    border-collapse: collapse;
    margin: auto;
    padding: 8px;
    text-align: center;
  }

  table {
    margin: 32px auto;
    overflow-x: scroll;
  }
`;

function decodeHTMLEntities(text) {
  const entities = {
    "&quot;": '"',
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&nbsp;": " ",
  };

  return text.replace(/&[^;]+;/g, (match) => entities[match] || match);
}

export default function PostArticle({ markdown }) {
  const [svgs, setSvgs] = useState(null);
  const [marked, setMarked] = useState(null);

  // 1차 (태그를 전부 확인해 SVG를 비동기 로드)
  useEffect(() => {
    const matches = markdown.match(/class="mermaid"/g).length;
    const total = matches ? matches.length : 0;
    const newSvgs = Array(total).fill(null);
    let i = 0;

    setMarked(
      <ReactMarkdown
        components={{
          a(props) {
            const { href, ...rest } = props;
            return <Link to={href} {...rest} />;
          },

          pre(props) {
            const { className, children } = props;
            if (className === "mermaid") {
              const index = i++;

              const text = decodeHTMLEntities(
                typeof children === "string"
                  ? children
                  : children
                      .map((a) => ReactDOMServer.renderToStaticMarkup(a))
                      .join("")
              );

              mermaid.render(`mermaid-render-${index}`, text).then(({ svg }) => {
                newSvgs[index] = svg;
                if (!newSvgs.includes(null)) setSvgs(newSvgs);
              });

              return (
                <pre
                  {...props}
                  children={<div>wait for diagram rendering...</div>}
                />
              );
            } else return <pre {...props} />;
          },
        }}
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeMathjax, rehypeSlug, rehypeRaw]}
      >
        {markdown}
      </ReactMarkdown>
    );
  }, [markdown]);

  // 2차 (로드된 SVG 태그를 반영)
  useEffect(() => {
    if (!svgs) return;

    let i = 0;

    setMarked(
      <ReactMarkdown
        components={{
          a(props) {
            const { href, ...rest } = props;
            return <Link to={href} {...rest} />;
          },

          pre(props) {
            const { className } = props;
            if (className === "mermaid") {
              const svg = svgs[i++];
              return <pre {...props}>{svg ? parse(svg) : <div>failed to render.</div>}</pre>;
            } else return <pre {...props} />;
          },
        }}
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeMathjax, rehypeSlug, rehypeRaw]}
      >
        {markdown}
      </ReactMarkdown>
    );

    setSvgs(null);
  }, [svgs, markdown]);

  return <Main>{marked}</Main>;
}
