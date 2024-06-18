import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useWindowSize from "../hook/useWindowSize";
import csvLoader from "../util/csvLoader";
import PostBanner from "../component/PostBanner";
import Sidebar from "../component/Sidebar";
import headerExtractor from "../util/headerExtractor";
import PostArticle from "../component/PostArticle";
import mermaid from "mermaid";

mermaid.initialize({
  fontFamily: "math",
});

const PostWrapper = styled.section`
  max-width: 100vw;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PostWidth = styled.div`
  width: 100%;
  height: auto;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export default function Post() {
  const [markdown, setMarkdown] = useState("");
  const [meta, setMeta] = useState({});
  const { tag } = useParams();
  const { width } = useWindowSize();

  useEffect(() => {
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
      <PostWrapper>
        <PostWidth>
          <PostArticle markdown={markdown} />
          {width > 800 ? <Sidebar side={headerExtractor(markdown)} /> : null}
        </PostWidth>
      </PostWrapper>
    </>
  );
}
