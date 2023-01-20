import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  //   console.log(rest);
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.isAuth ? (
          <Element {...props} />
        ) : (
          <Navigate
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
