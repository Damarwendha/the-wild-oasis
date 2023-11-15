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
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 100rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
