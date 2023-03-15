import { MusicSuggestor, ManageUsers, EnhancedGPT } from "./containers";
import Root from "./routes/Root";
import { ErrorPage } from "./routes/ErrorPage";
import Callback from "./routes/Callback";
import SilentRenew from "./routes/SilentRenew";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrimeReact from "primereact/api";
import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import {
  AuthServiceProvider,
  AuthProvider,
  ApiErrorBoundaryProvider,
  useApiErrorBoundary,
} from "./contexts";
import { PendingElement } from "./components";
import Layout from "./Layout";

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

function App() {

  return (
    <ApiErrorBoundaryProvider>
      <AuthServiceProvider
        config={{
          getRedirectUri: () =>
            `${window.location.pathname}${window.location.search}`,
        }}
      >
       <Layout />
      </AuthServiceProvider>
    </ApiErrorBoundaryProvider>
  );
}

export default App;
