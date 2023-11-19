import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openWindowByName, setOpenWindowByName] = useState("");

  const close = () => setOpenWindowByName("");
  const open = (windowName) => setOpenWindowByName(windowName);

  return (
    <ModalContext.Provider value={{ open, close, openWindowByName }}>
      {children}
    </ModalContext.Provider>
  );
}

function ToOpen({ children, window }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(window),
  });
}

function Window({ children, name: windowName }) {
  const { openWindowByName, close } = useContext(ModalContext);

  if (windowName !== openWindowByName) return;

  if (React.Children.count(children) !== 1) {
    console.error("Error: Only one child is allowed");
    return <div style={{ color: "red" }}>Error: Only one child is allowed</div>;
  }

  return (
    <Overlay>
      <StyledModal>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { closeModal: close })}</div>
      </StyledModal>
    </Overlay>
  );
}

Modal.ToOpen = ToOpen;
Modal.Window = Window;

export default Modal;
