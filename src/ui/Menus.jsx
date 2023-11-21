import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import { useOutsideClickListener } from "@/hooks/useOutsideClickListener";

import { HiEllipsisVertical } from "react-icons/hi2";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  left: ${(props) => props?.position?.x - 170}px;
  top: ${(props) => props?.position?.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext(null);

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [clickPosition, setClickPosition] = useState({});

  const close = useCallback(() => setOpenId(""), []);
  const open = (id) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{
        close,
        open,
        openId,
        clickPosition,
        setClickPosition,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, open, close, setClickPosition } = useContext(MenusContext);

  function handleToggle(e) {
    const isIdDiff = id !== openId || openId === "";

    if (isIdDiff) {
      setClickPosition({ x: e.nativeEvent.x, y: e.nativeEvent.y });
      open(id);
    } else close();
  }

  useEffect(
    function () {
      const onScroll = () => {
        close();
      };

      window.addEventListener("scroll", onScroll);

      return () => window.removeEventListener("scroll", onScroll);
    },
    [close]
  );

  return (
    <StyledToggle onClick={handleToggle}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, clickPosition, close } = useContext(MenusContext);

  const { insideRef } = useOutsideClickListener(close, true);

  if (openId !== id) return;
  return createPortal(
    <StyledList position={clickPosition} ref={insideRef} onClick={close}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, ...props }) {
  return (
    <li>
      <StyledButton {...props}>{children}</StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
