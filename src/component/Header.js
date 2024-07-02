import styled, { css } from "styled-components";
import useWindowSize from "../hook/useWindowSize";
import useScrollPosition from "../hook/useScrollPosition";
import { headerHeight, maxContent, standardShadow } from "../constants";
import { Link } from "react-router-dom";
import { appName } from "../constants";

const HeaderWrapper = styled.header`
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  padding: 16px 64px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  z-index: 10;
  transition: 0.3s;

  @media (max-width: ${maxContent}px) {
    padding: 16px;
  }

  ${(props) =>
    !props.$top &&
    css`
      background-color: white;
      box-shadow: ${standardShadow};
    `}
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.gap || "30px"};

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export default function Header() {
  const { y } = useScrollPosition();
  const { width } = useWindowSize();

  return (
    <div>
      <HeaderWrapper $top={y === 0}>
        <Nav gap="20px">
          <Link to="/">
            <img
              title={appName}
              src="/img/icons/favicon.ico"
              width="50px"
              height="50px"
              alt="icon"
              style={{
                transition: "0.2s",
                borderRadius: "16px",
                boxShadow: y === 0 ? standardShadow : "none",
              }}
            />
          </Link>
          <Link to="/">{appName}</Link>
        </Nav>

        <Nav>
          {width > 400 ? <Link to="/">HOME</Link> : null}
          <Link to="/tags">TAGS</Link>
          <Link to="/post">POSTS</Link>
        </Nav>
      </HeaderWrapper>
      <div
        style={{
          width: "100%",
          height: headerHeight + "px",
        }}
      />
    </div>
  );
}
