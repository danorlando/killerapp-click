import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Container, PendingElement } from "..";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <Container>
        <PendingElement />
      </Container>
    ),
  });

  return <Component />;
};
