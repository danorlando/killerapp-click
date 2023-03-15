import { Outlet } from "react-router-dom";
import { Header, ApiErrorWatcher } from "../components";

export default function Root() {
  return (
    <ApiErrorWatcher>
      <Header />
      <Outlet />
    </ApiErrorWatcher>
  );
}
