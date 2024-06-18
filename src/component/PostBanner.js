import styled from "styled-components";

const BannerWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 16px;
  padding-top: 128px;
  padding-bottom: 32px;
`;

const BannerWidth = styled.div`
  width: 100%;
  max-width: 1000px;
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

const PostTag = styled(PostMeta)`
  padding: 10px 0px;
`;

export default function PostBanner({ title, subtitle, date, writer, tag_list }) {
  return (
    <BannerWrapper>
      <BannerWidth>
        <h1 style={{ fontSize: "40px", margin: "10px 0px" }}>{title}</h1>
        <h2 style={{ fontWeight: "lighter" }}>{subtitle}</h2>

        <PostMeta>
          <IconSpan>
            <i className="fa fa-calendar"></i>
            <span>{date}</span>
          </IconSpan>
          <IconSpan>
            <i className="fa fa-pen"></i>
            <span>{writer}</span>
          </IconSpan>
        </PostMeta>

        <PostTag>
          {tag_list.map((tag) => {
            return (
              <a key={tag} href="/">
                {"#" + tag}
              </a>
            );
          })}
        </PostTag>
      </BannerWidth>
    </BannerWrapper>
  );
}
