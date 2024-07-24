import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useWindowSize from "../hook/useWindowSize";
import PostBanner from "../component/PostBanner";
import Sidebar from "../component/Sidebar";
import headerExtractor from "../util/headerExtractor";
import PostArticle from "../component/PostArticle";
import { maxContent, onPhone } from "../constants";
import { fetchTable } from "../redux/action/csvAction";
import lookup from "../util/lookup";
import TagView from "../component/TagView";

const PostWrapper = styled.section`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  & > div {
    width: 100%;
    height: auto;
    max-width: ${maxContent}px;
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
`;

export default function Post() {
  const dispatch = useDispatch();
  const tables = useSelector((state) => state.csv);

  const [markdown, setMarkdown] = useState(null);
  const [meta, setMeta] = useState(null);
  const [header, setHeader] = useState(null);
  const [relatedTag, setRelatedTag] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { tag } = useParams();
  const { width } = useWindowSize();

  useEffect(() => {
    dispatch(fetchTable());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tag]);

  // 포스트의 메타 데이터와 내용 로드
  useEffect(() => {
    const { impl, posts, tags } = tables;
    if (!impl || !posts || !tags) return;
    try {
      const md = lookup(impl, "tag", tag, "md")[0].md;
      const meta = lookup(posts, "md", md, [
        "title",
        "subtitle",
        "date",
        "writer",
      ])[0];

      fetch("/post/" + md + ".md")
        .then((response) => response.text())
        .then((text) => {
          setMarkdown(text);
          setMeta(meta);
          setIsLoading(false);
        });
    } catch (e) {
      setIsLoading(false);
    }
  }, [tag, tables]);

  // 관련 태그 정보 로드
  useEffect(() => {
    const { related, tags } = tables;
    if (!related || !tags) return;
    try {
      const t = ["tag", "next"];

      const [prv, nxt] = [0, 1].map((i) => {
        return new Set(
          lookup(related, t[i ^ 1], tag, t[i]).map((row) => {
            return row[t[i]];
          })
        );
      });

      [prv, nxt].forEach((set, i) => {
        let size = 0;
        while (size !== set.size) {
          size = set.size;
          [...set].forEach((tag) => {
            lookup(related, t[i ^ 1], tag, t[i]).forEach((row) => {
              set.add(row[t[i]]);
            });
          });
        }
      })

      setRelatedTag(
        [...prv, tag, ...nxt].map(
          (tag) => lookup(tags, "tag", tag, ["tag", "exp", "tier"])[0]
        )
      );
    } catch (e) {}
  }, [tag, tables]);

  // 포스트의 내용이 로드되었을 때
  useEffect(() => {
    if (markdown) setHeader(headerExtractor(markdown));
  }, [markdown]);

  return markdown !== null ? (
    <div>
      {meta ? (
        <PostBanner
          title={meta.title}
          subtitle={meta.subtitle}
          date={meta.date}
          writer={meta.writer}
        />
      ) : null}
      {relatedTag && tables.related && tables.impl ? (
        <TagView
          title="관련 태그"
          root={tag}
          tags={relatedTag}
          related={tables.related}
          impl={tables.impl}
        />
      ) : null}
      {markdown ? (
        <PostWrapper>
          <div>
            <PostArticle markdown={markdown} />
            {width > onPhone && header?.length ? <Sidebar side={header} /> : null}
          </div>
        </PostWrapper>
      ) : null}
    </div>
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        padding: "32px 16px",
        textAlign: "center",
        fontSize: "2em",
        wordBreak: "keep-all",
        opacity: "0.8",
      }}
    >
      {isLoading ? (
        <>
          <i className="fa fa-spinner"></i>
          <p>로딩 중...</p>
        </>
      ) : (
        <>
          <i className="fa fa-times"></i>
          <p>포스트를 찾을 수 없습니다.</p>
        </>
      )}
    </div>
  );
}
