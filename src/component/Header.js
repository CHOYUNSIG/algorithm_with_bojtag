import styled, { css } from "styled-components";
import useWindowSize from "../hook/useWindowSize";
import useScrollPosition from "../hook/useScrollPosition";
import { headerHeight, maxContent } from "../constants"

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
      box-shadow: 0px 0px 10px #aaaaaa;
    `}
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  gap: 30px;
`;

const NoLineAnker = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline black;
  }
`;

const Padding = styled.div`
  width: 100%;
  height: ${headerHeight}px;
`;

export default function Header() {
  const { y } = useScrollPosition();
  const { width } = useWindowSize();

  return (
    <>
      <HeaderWrapper $top={y === 0}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <NoLineAnker href="/">
            <img
              title="APSwBT"
              src="/img/icons/favicon.ico"
              width="50px"
              height="50px"
              alt="icon"
            />
          </NoLineAnker>
          <NoLineAnker href="/">APSwBT</NoLineAnker>
        </div>

        {width > 400 ? (
          <Nav>
            <NoLineAnker href="/">HOME</NoLineAnker>
            <NoLineAnker href="/">TAGS</NoLineAnker>
            <NoLineAnker href="/">POSTS</NoLineAnker>
          </Nav>
        ) : null}
      </HeaderWrapper>
      <Padding />
    </>
  );
}
