import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  width: 100%;
  height: 100%;
  color: var(--color-grey-400);
  transition: all 0.3s;

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active,
  &.active {
    color: var(--color-brand-600);
    background-color: var(--color-grey-100);
  }
`;

function MainNav() {
  return (
    <nav>
      <StyledUl>
        <li>
          <StyledNavLink to="dashboard">
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="bookings">
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="cabins">
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="users">
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="settings">
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </StyledUl>
    </nav>
  );
}

export default MainNav;
