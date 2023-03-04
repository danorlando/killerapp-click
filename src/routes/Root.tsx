import { Outlet } from "react-router-dom";
import { Header } from "../components";

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
