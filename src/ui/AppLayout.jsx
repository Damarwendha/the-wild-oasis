import { Outlet } from "react-router-dom";
import Header from "@/ui/Header";
import Sidebar from "@/ui/Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: flex;
`;

const Main = styled.main`
  background-color: var(--color-grey-100);
  flex: 1;
  height: 100vh;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
