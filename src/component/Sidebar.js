import styled from "styled-components";
import Slugger from "github-slugger";
import { headerHeight, standardShadow } from "../constants";

const SidebarWrapper = styled.nav`
  min-width: 200px;
  height: fit-content;
  margin: 32px;
  padding: 16px;
  position: sticky;
  top: ${headerHeight + 32}px;
  border-radius: 16px;
  box-shadow: ${standardShadow};
  display: flex;
  flex-direction: column;
  justify-content: left;
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
            <a
              key={slugForm}
              style={{paddingLeft: `${16 * depth}px`}}
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
            </a>
          );
        })
      }
    </SidebarWrapper>
  );
}
