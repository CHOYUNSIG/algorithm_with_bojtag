import styled from "styled-components";
import { maxContent } from "../constants";
import { Link } from "react-router-dom";
import { brandColor } from "../constants";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  & > div {
    max-width: ${maxContent}px;
    box-sizing: border-box;
    padding: 16px;
    text-align: center;
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
          style={{ width: "200px" }}
        ></img>
        <h1>APSwBT</h1>
        <div style={{ opacity: "0.8" }}>
          <u>A</u>lgorithm <u>P</u>roblem <u>S</u>olving <u>w</u>ith <u>B</u>OJ{" "}
          <u>T</u>ag
        </div>
        <p style={{ wordBreak: "keep-all" }}>
          이 블로그는 문제 해결에 쓰이는 알고리즘을 백준 태그를 중심으로 정리한
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
