import { History } from "history";
import { QueryClient } from "@tanstack/react-query";
import { PendingElement } from "../components";
import LogoutCallback from "./LogoutCallback";
import Logout from "./Logout";
import SilentRenew from "./SilentRenew";
import Callback from "./Callback";
import PrivateArea from "./PrivateArea";
import { Root } from "./Root";
import { ManageUsers, MusicSuggestor } from "../containers";
import { Outlet, Navigate } from "@tanstack/react-location";

export type TRouteProps = {
  history: History;
  queryClient?: QueryClient;
};

const getPublicRoutes = ({ history }: TRouteProps) => [
  {
    path: "callback",
    element: <Callback pendingElement={<PendingElement />} history={history} />,
  },
  {
    path: "logout",
    element: <Logout pendingElement={<PendingElement />} />,
  },
  {
    path: "logoutcallback",
    element: (
      <LogoutCallback
        pendingElement={<PendingElement />}
        redirectTo={"/"}
        history={history}
      />
    ),
  },
  {
    path: "silentrenew",
    element: <SilentRenew pendingElement={<PendingElement />} />,
  },
];

export const getPrivateRoutes = (props: TRouteProps) => [
  {
    element: (
      <PrivateArea pendingElement={<PendingElement />}>
        <Root />
      </PrivateArea>
    ),
    children: [
      {
        path: "/",
        element: <MusicSuggestor />,
      },
      {
        path: "/users",
        element: <ManageUsers />,
      },
    ],
  },
];

export const getRoutes = (props: TRouteProps) => [
  {
    path: "/",
    element: <Outlet />,
    children: [...getPublicRoutes(props), ...getPrivateRoutes(props)],
  },
  {
    element: <Navigate to={`/`} />,
  },
];

export default getRoutes;
