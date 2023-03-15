import { MusicSuggestor, ManageUsers, EnhancedGPT } from "./containers";
import Root from "./routes/Root";
import { ErrorPage } from "./routes/ErrorPage";
import Callback from "./routes/Callback";
import SilentRenew from "./routes/SilentRenew";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrimeReact from "primereact/api";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import {
  AuthServiceProvider,
  AuthProvider,
  ApiErrorBoundaryProvider,
  useApiErrorBoundary,
} from "./contexts";
import { PendingElement  } from "./components";

function Layout() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/gpt-playlist",
          element: <MusicSuggestor />,
        },
        {
          path: "/users",
          element: <ManageUsers />,
        },
        {
          path: "/gpt-plus",
          element: <EnhancedGPT />,
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

  const { setError } = useApiErrorBoundary();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: any) => {
        console.log("query error hit");
        if (error?.response?.status === 401) {
          setError(error);
        }
      },
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} fallbackElement={<PendingElement />} />
    </QueryClientProvider>
  );
}

export default Layout;