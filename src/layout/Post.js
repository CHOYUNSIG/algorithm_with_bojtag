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
import { maxContent, onPhone } from "../constants";

mermaid.initialize({ fontFamily: "math" });

const PostWrapper = styled.section`
  max-width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PostWidth = styled.div`
  width: 100%;
  height: auto;
  max-width: ${maxContent}px;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export default function Post() {
  const [markdown, setMarkdown] = useState("");
  const [meta, setMeta] = useState(null);
  const [header, setHeader] = useState([]);
  const { tag } = useParams();
  const { width } = useWindowSize();

  useEffect(() => {
    csvLoader("impl", (impl) => {
      try {
        const md = impl.get(tag)["md"];
        csvLoader("posts", (posts) => {
          setMeta(posts.get(md));
        });
        fetch("/post/" + md + ".md")
          .then((response) => response.text())
          .then((text) => setMarkdown(text));
      } catch (e) {}
    });
  }, [tag]);

  useEffect(() => {
    mermaid.contentLoaded();
    setHeader(headerExtractor(markdown));
  }, [markdown]);

  return meta != null ? (
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
          {width > onPhone ? <Sidebar side={header} /> : null}
        </PostWidth>
      </PostWrapper>
    </>
  ) : <div style={{
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: "32px 16px",
    textAlign: "center",
    fontSize: "2em",
    wordBreak: "keep-all",
  }}>
    <i className="fa fa-times"></i>
    <p>포스트를 찾을 수 없습니다.</p>
  </div>;
}
