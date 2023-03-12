import PrimeReact from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PendingElement, Container, AuthenticationGuard } from "./components";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import { MusicSuggestor, ManageUsers } from "./containers";
import Callback from "./routes/Callback";
import { NotFound } from "./routes/NotFound";

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
  // const { isLoading } = useAuth0();

  // if (isLoading) {
  //   return (
  //     <Container>
  //       <PendingElement />
  //     </Container>
  //   );
  // }
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<MusicSuggestor />} />
        <Route
          path="/users"
          element={<AuthenticationGuard component={ManageUsers} />}
        />
        <Route
          path="/callback"
          element={<Callback pendingElement={<PendingElement />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
