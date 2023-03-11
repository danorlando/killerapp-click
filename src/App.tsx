import {
  Outlet,
  ReactLocation,
  Router,
  createBrowserHistory,
} from "@tanstack/react-location";
import PrimeReact from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthServiceProvider } from "./contexts";
import { subscribeToNewTokenReceived, setTokenHeader } from "./data-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import getRoutes from "./routes/Routes";
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
const history = createBrowserHistory();
const location = new ReactLocation({ history });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthServiceProvider
        config={{
          getRedirectUri: () =>
            `${window.location.pathname}${window.location.search}`,
        }}
      >
        <Router
          location={location}
          routes={getRoutes({ history, queryClient })}
        >
          <Outlet />
        </Router>
      </AuthServiceProvider>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </QueryClientProvider>
  );
}

export default App;
