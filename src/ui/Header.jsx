import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  z-index: 100;
`;

function Header() {
  return <StyledHeader>HEADER</StyledHeader>;
}

export default Header;
