import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-brand-0);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;
