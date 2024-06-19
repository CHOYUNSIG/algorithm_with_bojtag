import styled from "styled-components";
import Slugger from "github-slugger";
import { headerHeight } from "../constants";

const SidebarWrapper = styled.nav`
  min-width: 200px;
  height: fit-content;
  margin: 32px;
  padding: 16px;
  position: sticky;
  top: ${headerHeight + 32}px;
  border-radius: 16px;
  box-shadow: 2px 2px 10px #aaaaaa;
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

const Anker = styled.a`
  color: black;
  text-decoration: none;
  padding-left: ${(props) => props.$depth * 16}px;

  &:hover {
    text-decoration: underline black;
  }
`;

export default function Sidebar({ side }) {
  const slugger = new Slugger();

  return (
    <SidebarWrapper>
      <div style={{ padding: "8px", fontSize: "1.2em", fontWeight: "bold" }}>
        Index
      </div>
      {
        side.map(({ depth, header }) => {
          const slugForm = slugger.slug(header);
          return (
            <Anker
              key={slugForm}
              $depth={depth}
              href={"#" + slugForm}
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.getElementById(slugForm);
                window.scrollTo({
                  top: targetElement.offsetTop - 100,
                  behavior: "smooth",
                });
              }}
            >
              {header}
            </Anker>
          );
        })
      }
    </SidebarWrapper>
  );
}
