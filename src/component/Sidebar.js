import styled from "styled-components";
import GithubSlugger from "github-slugger";

const slugger = new GithubSlugger();

const SidebarWrapper = styled.nav`
  min-width: 200px;
  height: fit-content;
  padding: 16px;
  position: sticky;
  top: 128px;
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
  return (
    <SidebarWrapper>
      {side.map(({ depth, header }) => {
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
      })}
    </SidebarWrapper>
  );
}
