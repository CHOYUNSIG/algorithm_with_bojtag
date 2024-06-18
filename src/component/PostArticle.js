import styled from "styled-components";
import Sidebar from "./Sidebar";
import useWindowSize from "../hook/useWindowSize";

const ArticleWrapper = styled.section`
  max-width: 100vw;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  display: flex;
  flex-direction: column;
  gap: 10px;

  h1, h2 {
    padding-top: 64px;
  }

  h3, h4 {
    padding-top: 32px;
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

  .mermaid > svg, pre > code, img {
    box-sizing: border-box;
    max-width: 100%;
    width: -webkit-fill-available;
    border-radius: 16px;
    margin: 0px 16px;
    padding: 16px;
    box-shadow: 2px 2px 10px #aaaaaa;
  }

  .mermaid {
    max-width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  table, td, th {
    border-width: 1px;
	  border-style: solid;
    border-collapse: collapse;
    margin: auto;
    padding: 8px;
    text-align: center;
  }

  table {
    margin: 32px auto;
  }
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
