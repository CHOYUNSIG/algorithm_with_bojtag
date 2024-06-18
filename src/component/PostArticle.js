import styled from "styled-components";
import Sidebar from "./Sidebar";
import useWindowSize from "../hook/useWindowSize";

const ArticleWrapper = styled.section`
  max-width: 100vw;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .mermaid {
    max-width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

const ArticleWidth = styled.div`
  width: 100%;
  height: auto;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const Main = styled.main`
  box-sizing: border-box;
  flex: 1;
  padding: 16px;
  text-align: justify;
  min-width: 0px;
`;

export default function PostArticle({ content }) {
  const { width } = useWindowSize();

  return (
    <ArticleWrapper>
      <ArticleWidth>
        <Main>{content}</Main>
        {width > 800 ? <Sidebar /> : null}
      </ArticleWidth>
    </ArticleWrapper>
  );
}
