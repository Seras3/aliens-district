import { Route, Switch } from "react-router";

import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" render={() => <AuthPage isLogin />} />
      <Route exact path="/register" render={() => <AuthPage />} />

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default App;
