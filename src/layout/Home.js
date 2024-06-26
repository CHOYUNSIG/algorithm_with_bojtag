import styled from "styled-components";
import { maxContent } from "../constants";

const HomeWrapper = styled.div`
  max-width: ${maxContent}px;
  box-sizing: border-box;
  padding: 16px;
  text-align: center;
`;

export default function Home() {
  return (
    <HomeWrapper>
      <img src="/img/icons/safari-pinned-tab.svg" style={{width: "200px"}}></img>
      <h1>APSwBT</h1>
      <div style={{ opacity: "0.8" }}>
        <u>A</u>lgorithm <u>P</u>roblem <u>S</u>olving <u>w</u>ith <u>B</u>OJ{" "}
        <u>T</u>ag
      </div>
      <p style={{wordBreak: "keep-all"}}>이 블로그는 문제 해결에 쓰이는 알고리즘을 백준 태그를 중심으로 정리한 블로그입니다.</p>
    </HomeWrapper>
  );
}
