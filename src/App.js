import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./components/pokemon";

const App = () => {
  return (
    <Router>
      <Suspense fallback={<p>loading...</p>}>
        <Switch>
          <Route exact path="/" name="Layout" render={() => <Layout />} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
