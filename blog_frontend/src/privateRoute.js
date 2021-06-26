import { Route,Redirect } from "react-router-dom";
import { IsAuthenticated } from "./auth/helper";

export const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      IsAuthenticated() ? (<Component />) : 
      (<Redirect  to="/login"  />)
    }
  />
);

export const NotAuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        !IsAuthenticated() ? (<Component/>) : 
        (<Redirect  to="/"  />)
      }
    />
);