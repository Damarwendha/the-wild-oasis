import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { BiBook, BiHome } from "react-icons/bi";
import { MdHomeWork, MdSettings } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  width: 100%;
  height: 100%;
  color: var(--color-grey-400);
  transition: all 0.3s;
  gap: 0.6rem;

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
            <BiHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="bookings">
            <BiBook />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="cabins">
            <MdHomeWork />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="users">
            <HiUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="settings">
            <MdSettings />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </StyledUl>
    </nav>
  );
}

export default MainNav;
