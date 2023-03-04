import { MusicSuggestor } from "./containers";
import Root, { ErrorPage } from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import PrimeReact from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

PrimeReact.ripple = true;

const queryClient = new QueryClient();

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
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
