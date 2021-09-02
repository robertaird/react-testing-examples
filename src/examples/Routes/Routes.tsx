import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

const About = () => <div>You are on the about page</div>;
const Home = () => <div>You are home</div>;
const User = () => {
  const {
    params: { id },
  } = useRouteMatch<{ id: string }>();

  return <div>User page {id}</div>;
};
const NoMatch = () => <div>No match</div>;

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

export const Routes = () => (
  <div>
    <Link to="/">Home</Link>

    <Link to="/about">About</Link>

    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/user/:id(\d+)">
        <User />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route>
        <NoMatch />
      </Route>
    </Switch>

    <LocationDisplay />
  </div>
);
