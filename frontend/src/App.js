import { Route, Switch, Redirect } from "react-router";
import { BrowserRouter as Router } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { isUserAuthenticatedSelector } from './store/selectors/auth';

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserPage from "./pages/UserPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import NotFoundPage from "./pages/NotFoundPage";

import TestPage from "./pages/TestPage";
import ModifyPostPage from "./pages/ModifyPostPage";
import { createBrowserHistory } from 'history';

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <RedirectMemberRoute exact path="/login" render={() => <AuthPage isLogin />} />
        <RedirectMemberRoute exact path="/register" render={() => <AuthPage />} />

        <Route exact path="/user/:id" component={UserPage} />

        <PrivateRoute exact path="/new-post" component={ModifyPostPage} />
        <PrivateRoute exact path="/post/:id" component={ModifyPostPage} />

        <Route exact path="/test" component={TestPage} />

        <Route exact path="/access-denied" component={AccessDeniedPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}


const RedirectMemberRoute = (props) => {
  const isAuthenticated = useSelector(isUserAuthenticatedSelector);

  return <Route {...props}
    render={() => !isAuthenticated ? props.render() : <Redirect to="/" />} />
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(isUserAuthenticatedSelector);
  return <Route {...rest}
    render={(pr) => {
      console.log({ pr });
      return isAuthenticated ?
        <Component {...pr} />
        : <Redirect to="/access-denied" />
    }} />
}

/*
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(isUserAuthenticatedSelector);

  return (
    <Route {...rest} render={props => (
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    )} />
  );
};
*/



export default App;
