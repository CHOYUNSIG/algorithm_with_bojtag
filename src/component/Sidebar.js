import styled from "styled-components";

const SidebarWrapper = styled.div`
  min-width: 200px;
  height: fit-content;
  padding: 16px;
  position: sticky;
  top: 128px;
`;

export default function Sidebar() {
  return <SidebarWrapper>this is side bar</SidebarWrapper>;
}
