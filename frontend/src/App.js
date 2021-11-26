import { Route, Switch, Redirect } from "react-router";
import { BrowserRouter as Router } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { isUserAuthenticatedSelector } from './store/selectors/auth';

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" render={() => <AuthPage isLogin />} />
        <Route exact path="/register" render={() => <AuthPage />} />

        <Route exact path="/user" component={UserPage} />

        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}



const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(isUserAuthenticatedSelector);

  return (
    <Route {...rest} render={props => (
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    )} />
  );
};



export default App;
