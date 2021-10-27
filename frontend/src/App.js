import { Route, Switch } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register/Register";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default App;
