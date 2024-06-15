import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import PostBanner from "../component/PostBanner";
import PostArticle from "../component/PostArticle";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { MathJax } from "better-react-mathjax";
import "highlight.js/styles/github-dark.css";

export default function Post() {
  const [markdown, setMarkdown] = useState("");
  const { tag } = useParams();

  useEffect(() => {
    fetch("/post/" + tag + ".md")
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, [tag]);

  return (
    <>
      <PostBanner
        title={tag}
        subtitle={tag}
        date="2024/02/01"
        tag_list={["tag1", "tag2"]}
      />
      <PostArticle
        content={
          <MathJax>
            <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>
              {markdown}
            </ReactMarkdown>
          </MathJax>
        }
      />
    </>
  );
}
