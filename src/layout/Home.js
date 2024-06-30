import styled from "styled-components";
import { appName, appNameKorean, maxContent } from "../constants";
import { Link } from "react-router-dom";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  & > div {
    max-width: ${maxContent}px;
    box-sizing: border-box;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      width: fit-content;
      padding: 5px 32px;
      border-radius: 100px;
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: center;
      gap: 10px;
      box-shadow: inset 2px 2px 10px #aaaaaa;
    }

    p {
      text-align: center;
      word-break: keep-all;
    }
  }
`;

const Button = styled.button`
  margin: 5px;
  height: fit-content;
  padding: 10px;
  background-color: transparent;
  border: none;
  border-radius: 16px;
  box-shadow: 2px 2px 10px #aaaaaa;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  * {
    font-size: 1.3em;
    transition: 0.2s;
  }

  &:hover {
    * {
      font-size: 1.6em;
    }
  }

  a {
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Home() {
  return (
    <HomeWrapper>
      <div>
        <img
          src="/img/icons/safari-pinned-tab.svg"
          style={{ width: "200px", userSelect: "none" }}
          alt="site-icon"
        ></img>
        <h1>
          {"#" + appNameKorean}
          <sub style={{ fontSize: "0.5em", opacity: "0.5" }}>
            {appName.toLowerCase()}
          </sub>
        </h1>
        <div style={{ opacity: "0.8" }}>
          Algorithm Problem Solving with BOJ Tag
        </div>
        <p>
          {appNameKorean}는 문제 해결에 쓰이는 알고리즘을 <a href="https://www.acmicpc.net/" target="blank">백준</a> 태그를 중심으로 정리한
          블로그입니다.
        </p>
        <div
          style={{
            padding: "16px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          <Button>
            <i className="fa fa-link"></i>
            <Link to="/tags">Tags</Link>
          </Button>
          <Button>
            <i className="fa fa-link"></i>
            <Link to="/post">Posts</Link>
          </Button>
        </div>
      </div>
    </HomeWrapper>
  );
}
