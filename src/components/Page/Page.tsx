import "./styles.module.css";

export default {
  Wrapper: ({ children }: { children: React.ReactNode }) => (
    <div className="wrapper">{children}</div>
  ),
  ContentWrapper: ({ children }: { children: React.ReactNode }) => (
    <div className="contentWrapper">{children}</div>
  ),
  MainContent: ({ children }: { children: React.ReactNode }) => (
    <main className="main">{children}</main>
  ),
};
