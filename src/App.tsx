import { MusicSuggestor, ManageUsers } from "./containers";
import Root from "./routes/Root";
import {ErrorPage} from "./routes/ErrorPage";
import Callback from "./routes/Callback";
import SilentRenew from "./routes/SilentRenew";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrimeReact from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthServiceProvider, AuthProvider } from "./contexts";
import { PendingElement } from "./components";
import { subscribeToNewTokenReceived, setTokenHeader } from "./data-provider";

subscribeToNewTokenReceived(setTokenHeader);

//theme
import "primereact/resources/themes/luna-blue/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
//primeflex
import "primeflex/primeflex.css";
//custom css
import "./App.css";

PrimeReact.ripple = true;

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <MusicSuggestor />,
        },
        {
          path: "/users",
          element: <ManageUsers />,
        },
        {
          path: "/callback",
          element: <Callback pendingElement={<PendingElement />} />,
        },
        {
          path: "/silent-renew",
          element: <SilentRenew pendingElement={<PendingElement />} />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthServiceProvider
        config={{
          getRedirectUri: () =>
            `${window.location.pathname}${window.location.search}`,
        }}
      >
        <RouterProvider router={router} fallbackElement={<PendingElement />} />
      </AuthServiceProvider>
    </QueryClientProvider>
  );
}

export default App;
