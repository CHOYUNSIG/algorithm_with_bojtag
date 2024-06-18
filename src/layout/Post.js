import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import csvLoader from "../util/csvLoader";
import PostBanner from "../component/PostBanner";
import PostArticle from "../component/PostArticle";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeMathjax from "rehype-mathjax";
import mermaid from "mermaid";
import "highlight.js/styles/github-dark.css";

export default function Post() {
  const [markdown, setMarkdown] = useState("");
  const [meta, setMeta] = useState({});
  const { tag } = useParams();

  useEffect(() => {
    mermaid.initialize({
      fontFamily: "math",
    });
    csvLoader("impl", (impl) => {
      const md = impl.get(tag)["md"];
      csvLoader("posts", (posts) => {
        setMeta(posts.get(md));
      });
      fetch("/post/" + md + ".md")
        .then((response) => response.text())
        .then((text) => setMarkdown(text));
    });
  }, [tag]);

  useEffect(() => {
    mermaid.contentLoaded();
  }, [markdown]);

  return (
    <>
      <PostBanner
        title={meta.title}
        subtitle={meta.subtitle}
        date={meta.date}
        writer={meta.writer}
        tag_list={["tag1", "tag2"]}
      />
      <PostArticle
        content={
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeMathjax]}
          >
            {markdown}
          </ReactMarkdown>
        }
      />
    </>
  );
}
