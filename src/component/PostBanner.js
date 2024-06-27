import styled from "styled-components";
import { maxContent } from "../constants";

const BannerWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 32px 16px;
  word-break: keep-all;
`;

const BannerWidth = styled.div`
  width: 100%;
  max-width: ${maxContent}px;
  padding: 16px;
`;

const PostMeta = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const IconSpan = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export default function PostBanner({
  title,
  subtitle,
  date,
  writer,
}) {
  return (
    <BannerWrapper>
      <BannerWidth>
        <h1 style={{ fontSize: "40px", margin: "10px 0px" }}>{title}</h1>
        <h2 style={{ fontWeight: "lighter" }}>{subtitle}</h2>

        <PostMeta>
          {date ? (
            <IconSpan>
              <i className="fa fa-calendar"></i>
              <span>{date}</span>
            </IconSpan>
          ) : null}
          {writer ? (
            <IconSpan>
              <i className="fa fa-pen"></i>
              <span>{writer}</span>
            </IconSpan>
          ) : null}
        </PostMeta>
      </BannerWidth>
    </BannerWrapper>
  );
}
