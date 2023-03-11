import { Header, Page, ErrorBoundary } from "../components";
import { Outlet } from "@tanstack/react-location";

export function Root() {
  return (
    <ErrorBoundary>
      <Page.Wrapper>
        <Page.ContentWrapper>
          <Header />
          <Page.MainContent>
            <Outlet />
          </Page.MainContent>
        </Page.ContentWrapper>
      </Page.Wrapper>
    </ErrorBoundary>
  );
}
