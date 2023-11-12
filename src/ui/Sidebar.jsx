import styled from "styled-components";

const StyledAside = styled.aside`
  background-color: var(--color-brand-0);
  position: fixed;
  left: 0;
  width: var(--aside-width);
  height: 100vh;
`;

function Sidebar() {
  return <StyledAside>Sidebar</StyledAside>;
}

export default Sidebar;
