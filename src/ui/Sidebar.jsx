import styled from "styled-components";
import Logo from "@/ui/Logo";
import MainNav from "@/ui/MainNav";

const StyledAside = styled.aside`
  background-color: var(--color-brand-0);
  position: fixed;
  left: 0;
  width: var(--aside-width);
  height: 100vh;
`;

function Sidebar() {
  return (
    <StyledAside>
      <Logo />
      <MainNav />
    </StyledAside>
  );
}

export default Sidebar;
