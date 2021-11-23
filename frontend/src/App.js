import { Route, Switch } from "react-router";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" render={() => <AuthPage isLogin />} />
      <Route exact path="/register" render={() => <AuthPage />} />

      <Route exact path="/user" component={UserPage} />

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default App;
